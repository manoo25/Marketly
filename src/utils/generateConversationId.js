// utils/generateConversationId.js
import { v5 as uuidv5 } from "uuid";

const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // ثابت ما يتغيرش

export function generateConversationId(userId1, userId2) {
  const sorted = [userId1, userId2].sort(); // لضمان الترتيب
  return uuidv5(`${sorted[0]}-${sorted[1]}`, NAMESPACE); // ✅ بيرجع UUID حقيقي
}
