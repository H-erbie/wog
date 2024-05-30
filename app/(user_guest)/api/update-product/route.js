import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";

import { basename } from "path";

import { v4 as uuidv4 } from "uuid";

import { slugify } from "@/sanity/lib/slugify"; // Assuming slugify function is in a separate file

export const POST = async (request) => {
    const data = await request.formData();
    // const file = data.get("imgs");
    const name = data.get("name");
    const price = data.get("price");
    const id = data.get("id");
    const description = data.get("description");
    const homepageCategories = data.get("homepageCategories");
    const categories = data.get("categories");
    const sku = data.get("sku");
    // if (!file) {
    //     return NextResponse.json({ success: false, message: "No image uploaded" });
    //   }
    
    //   const bytes = await file.arrayBuffer();
    //   const buffer = Buffer.from(bytes);
    
    //   const filename = `${basename(file.name)}-${uuidv4()}`;
    //   const path = `public/uploads/${filename}`;
    
      // try {
      // await mkdir(path, { recursive: true }); // Create directory if it doesn't exist
      // await writeFile(path, buffer);
      // } catch (error) {
      //   console.error("Error writing file:", error);
      //   return NextResponse.json({ success: false, message: "Failed to save image" });
      // }
      //   // Process each image file here (e.g., upload to Sanity)
    
      // const uploadedImage = await uploadImageToSanity(file); // Call the new upload function
    
      // images.push(uploadedImage);
      // }
      const generatedSlugString = await slugify(name);
      const generatedSkuString = await slugify(sku);
      // console.log(file);
  try {
    const updatedProduct= await client
      .patch(id, {
        set: {
          name,
          // images: [uploadedImage],
          description,
          slug:generatedSlugString,
          sku:generatedSkuString,
          price,
          homepageCategories: [homepageCategories],
          categories:[categories]
        },
      })
      .commit();

    // console.log(id, isCancelled, isShipped, isProcessing, isDelivered, isConfirmed)
    return NextResponse.json({
      success: true,
      updatedProduct: updatedProduct.data,
    }); // Adjust response content as needed
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
// async function uploadImageToSanity(imageFile) {
//     if (!imageFile) {
//       // Handle case where no file is uploaded
//       throw new Error("No image file selected");
//     }
  
//     const data = await client.assets.upload("image", imageFile, {
//       filename: imageFile.name,
//       contentType: imageFile.type,
//     });
  
//     return { ...data, _key: uuidv4() };
//   }
  