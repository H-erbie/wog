import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const { name,
    slug,
    sku,
    image, categories,
    _id,
    price,
    description, } = body;

  try {
    const document = await client.create({
        _type: "product",
        name,
        slug,
        sku,
        images: [image],
        price,
        description,
        categories: [categories],
        homepageCategories: ["new"],
      netRates: 0,
      Stars1: 0,
      Stars2: 0,
      Stars3: 0,
      Stars4: 0,
      Stars5: 0,
    });
    const updatedOrder = await client
    .delete(_id)
    // .commit();
    // console.log(document);

    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};