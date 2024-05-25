import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const { orderId, shippingAddress, totalAmount, cartItems,  isProcessing,
    isShipped,
    isDelivered,
    isCancelled,
    isConfirmed, } = body;

  try {
    const document = await client.create({
      _type: "orders",
      name: orderId,
      shippingAddress,
      total: totalAmount,
      orderProducts: cartItems,
      isProcessing,
      isShipped,
      isDelivered,
      isConfirmed,
      isCancelled,
      purchaser: {
        name: body.name, // Access directly from body
        phone: body.phone,
        id: body.id,
        email: body.email,
      },
    });

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