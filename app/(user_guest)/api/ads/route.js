import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
  const data = await req.formData();
  const url = data.get("url");
  const name = data.get("name");
  const price = data.get("price");
  const desc = data.get("desc");
  const file = data.get("thumbnail");

  if (!file) {
    return NextResponse.json({ success: false, message: "No image uploaded" });
  }

  try {
    const uploadedImage = await uploadImageToSanity(file);

    const ads = await client
      .create({
        _type: "ads",
        name,
        price,
        thumbnail: uploadedImage,
        url,
        desc,
      })
      .commit();

    return NextResponse.json({ success: true, ads: ads.data });
  } catch (error) {
    console.error("Error creating ad:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
};

async function uploadImageToSanity(imageFile) {
  if (!imageFile) {
    throw new Error("No image file selected");
  }

  const data = await client.assets.upload("image", imageFile, {
    filename: imageFile.name,
    contentType: imageFile.type,
  });

  return { ...data, _key: uuidv4() };
}
