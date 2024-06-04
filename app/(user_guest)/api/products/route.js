import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import { slugify } from "@/sanity/lib/slugify"; // Assuming slugify function is in a separate file
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("imgs");
  const name = data.get("name");
  const price = data.get("price");
  const description = data.get("description");
  const homepageCategories = data.get("homepageCategories");
  const categories = data.get("categories");
  // const sku = data.get("sku");

  if (!file) {
    return NextResponse.json({ success: false, message: "No image uploaded" });
  }

  try {
    const uploadedImage = await uploadImageToSanity(file);

    const generatedSlugString = await slugify(name);
    const generatedSkuString = await slugify('andamo');

    const document = await client.create({
      _type: "product", // Adjust to your actual document type
      name,
      slug: generatedSlugString,
      sku: generatedSkuString,
      images: [uploadedImage],
      price,
      description,
      categories: [categories],
      homepageCategories: [homepageCategories],
      netRates: 0,
      Stars1: 0,
      Stars2: 0,
      Stars3: 0,
      Stars4: 0,
      Stars5: 0,
    });

    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ success: false, message: "Failed to upload image" });
  }
}

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
