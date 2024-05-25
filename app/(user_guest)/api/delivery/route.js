import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const {
    name,
    driverId,
    driverName,
    driverPhone,
    driverEmail,
    buyerId,
    buyerName,
    buyerPhone,
    buyerEmail,
    isStarted,
    isDelivered,
    isCancelled,
  } = body;

  try {
    const delivery = await client
      .create({
        _type: "delivery",
        name,
        driver: {
          id: driverId,
          name: driverName,
          phone: driverPhone,
          email: driverEmail,
        },
        purchaser: {
          id: buyerId,
          name: buyerName,
          phone: buyerPhone,
          email: buyerEmail,
        },
        isStarted,
        isDelivered,
        isCancelled,
      })
      .commit();

    // console.log(id, isCancelled, isShipped, isProcessing, isDelivered, isConfirmed)
    return NextResponse.json({
      success: true,
      delivery: delivery.data,
    }); // Adjust response content as needed
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
