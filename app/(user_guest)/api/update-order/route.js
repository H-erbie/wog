import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const { id, driverName, driverContact, isCancelled, isShipped, currentStat, isProcessing, isDelivered, isConfirmed } =
    body;
  
  try {
    const updatedOrder = await client
      .patch(id, {
        set: {
          isCancelled,
          isShipped,
          isDelivered,
          isProcessing,
          isConfirmed,
          currentStat,
          driverName,
          driverPhone: driverContact
        },
      })
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
