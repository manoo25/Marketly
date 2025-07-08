import { supabase } from "../Supabase/supabaseClient";

export const uploadImagesToSupabase = async (files,store) => {
  const uploadedUrls = [];
  for (const file of files) {
    const fileName = `${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from(store)
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from(store)
      .getPublicUrl(fileName);

    uploadedUrls.push(publicUrlData.publicUrl);
  }
  console.log(uploadedUrls);
  
  return uploadedUrls;
};