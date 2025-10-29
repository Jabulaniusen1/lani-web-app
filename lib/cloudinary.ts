import axios from "axios";

const cloudName = "dkwtlbksi"; //  my Cloudinary name
const uploadPreset = "user_profile_upload"; //  must match unsigned preset name
const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`; 

export const uploadToCloudinary = async (file: File): Promise<string> => {
  // Always create new FormData for each upload
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  // Add a unique public_id so Cloudinary treats each upload as fresh
  formData.append("public_id", `upload_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);

  try {
    const response = await axios.post(`${endpoint}?timestamp=${Date.now()}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Cloudinary upload success:", response.data);

    const { secure_url, url } = response.data;
    return secure_url || url;
  } catch (err: any) {
    console.error("Cloudinary upload failed:", err.response?.data || err.message || err);
    throw new Error(err.response?.data?.error?.message || "Cloudinary upload failed");
  }
};
