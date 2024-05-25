import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const { _id} =
    body;

  try {
    const updatedOrder = await client
      .delete(_id)
      .commit();

    // console.log(id, isCancelled, isShipped, isProcessing, isDelivered, isConfirmed)
    return NextResponse.json({
      success: true,
      updatedOrder: updatedOrder.data,
    }); // Adjust response content as needed
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
