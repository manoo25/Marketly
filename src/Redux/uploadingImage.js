import { supabase } from "../Supabase/supabaseClient";

export const uploadImagesToSupabase = async (files,store) => {
  const uploadedUrls = [];
  for (const file of files) {
    const fileName = `${Date.now()}_${file.name}`;
    console.log("📦 Uploading file:", fileName);

    const { error } = await supabase.storage
      .from(store)
      .upload(fileName, file);

    if (error) {
      console.error("❌ Upload error:", error.message);
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from(store)
      .getPublicUrl(fileName);

    console.log("✅ File uploaded to:", publicUrlData.publicUrl);
    uploadedUrls.push(publicUrlData.publicUrl);
  }
  return uploadedUrls;
};