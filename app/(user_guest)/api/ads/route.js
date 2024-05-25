import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { createReadStream } from "fs";

import { writeFile, mkdir } from "fs/promises";

import { basename } from "path";

import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
//   const body = await req.json();
//   const {  name, price, url, desc} =
//     body;
    const data = await req.formData();
    const url = data.get("url");
    const name = data.get("name");
    const price = data.get("price");
    const desc = data.get("desc");
    const file = data.get("thumbnail");
  console.log(url, name, price, desc, file)
    if (!file) {
      return NextResponse.json({ success: false, message: "No image uploaded" });
    }
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);
  
    const filename = `${basename(file.name)}-${uuidv4()}`;
  
    const path = `public/uploads/${filename}`;
  
    await writeFile(path, buffer);
  
    const uploadedImage = await uploadImageToSanity(file); // Call the new upload function
  
  try {
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

    // console.log(id, isCancelled, isShipped, isProcessing, isDelivered, isConfirmed)
    return NextResponse.json({
      success: true,
      ads: ads.data,
    }); // Adjust response content as needed
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};


async function uploadImageToSanity(imageFile) {
  if (!imageFile) {
    // Handle case where no file is uploaded
    throw new Error("No image file selected");
  }

  const data = await client.assets.upload("image", imageFile, {
    filename: imageFile.name,
    contentType: imageFile.type,
  });

  return { ...data, _key: uuidv4() };
}