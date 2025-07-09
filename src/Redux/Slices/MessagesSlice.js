// src/Redux/Slices/Messages.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../Supabase/supabaseClient";

// Async thunk لإرسال رسالة
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ senderId, receiverIds, message }, thunkAPI) => {
    try {
      const inserts = receiverIds.map((receiverId) => ({
        sender: senderId,
        receiver: receiverId,
        Message: message,
      }));

      const { data, error } = await supabase
        .from("UsersMessage")
        .insert(inserts);

      if (error) throw error;
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetStatus } = messagesSlice.actions;
export default messagesSlice;
