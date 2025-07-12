// src/Redux/Slices/Messages.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../Supabase/supabaseClient";
import { v5 as uuidv5 } from "uuid";

const TEMP_ADMIN_ID = "28fe037d-a829-4ecf-8f9d-2c1e4f492bba";
// فضاء أسماء ثابت لأي UUID v5 تولده (اختَر أي UUID ثابت)
const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

// هوية الأدمن الموحَّدة عند الحساب (ثابتة)
const ADMIN_LOGICAL_ID = "admin";

/** يرجّع UUID الأدمن الحقيقي أو الوهمي */
const getCurrentAdminId = () => {
  // بعد تفعيل Auth استبدل السطر الآتي:
  // return supabase.auth.user()?.id;
  return TEMP_ADMIN_ID;
};

/** احسب conversation_id ثابت بين طرفين (بغضّ النظر عن الاتجاه) */
const buildConversationId = (senderLogical, receiverLogical) => {
  const [a, b] = [senderLogical, receiverLogical].sort(); // ترتيب أبجدي
  return uuidv5(`${a}-${b}`, NAMESPACE);
};

/** Thunk: إرسال رسالة نصيّة لعدّة مستقبلين */
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ receiverIds, content }, thunkAPI) => {
    try {
      const adminUuid = getCurrentAdminId();
      if (!adminUuid) throw new Error("❌ لا يوجد أدمن مسجَّل دخول");

      const { users } = thunkAPI.getState().Users;

      const inserts = receiverIds.map((rid) => {
        const receiver = users.find((u) => u.id === rid);
        const receiverRole = receiver?.role || "user";

        // نحول الهوية لتمثيل منطقي ثابت
        const senderLogical = ADMIN_LOGICAL_ID;
        const receiverLogical =
          receiverRole === "admin" ? ADMIN_LOGICAL_ID : rid;

        const conversation_id = buildConversationId(
          senderLogical,
          receiverLogical
        );

        return {
          conversation_id,
          sender_id: adminUuid, // UUID (حقيقي أو وهمي)
          receiver_id: rid,
          content,
          sender_role: "admin",
          receiver_role: receiverRole,
          actual_sender_id: adminUuid,
        };
      });

      const { error } = await supabase.from("UsersMessage").insert(inserts);
      if (error) throw error;

      return inserts.length;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: { loading: false, error: null, success: false },
  reducers: {
    resetStatus: (s) => {
      s.loading = s.success = false;
      s.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(sendMessage.pending, (s) => {
      s.loading = true;
      s.error = null;
      s.success = false;
    });
    b.addCase(sendMessage.fulfilled, (s) => {
      s.loading = false;
      s.success = true;
    });
    b.addCase(sendMessage.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload;
      s.success = false;
    });
  },
});

export const { resetStatus } = messagesSlice.actions;
export default messagesSlice;
