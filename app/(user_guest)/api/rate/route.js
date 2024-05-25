import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const { id, rate, userFirstName, userId, subject, review, date } = body;
  try {
    // const { id } = req.body;
    const ine = await client
      .patch(id, {
        setIfMissing: {
          netRates: 0,
          [`Stars${rate}`]: 0,
          ratesReviews: [], // Optional: Ensure the array exists if it's not already present
        },
        inc: {
          netRates: 1,
          [`Stars${rate}`]: 1,
        },
        insert: {
          before: "ratesReviews[0]",
          items: [
            {
              firstName: userFirstName,
              subject,
              review,
              rate,
              _key: `${id}${userId}`,
              date,
              userId,
            },
          ],
        },
      })
      .commit();

    // console.log(ine);
    console.log({ ine });
    return NextResponse.json({ ine });
  } catch (error) {
    console.log(error);
  }
};

// import { client } from "@/sanity/lib/client";
// import { NextResponse } from "next/server";

// export const POST = async (req) => {
//   const body = await req.json();
//   const { id,rate, userFirstName, userId, subject, review, date} =
//     body;

//   try {
//     const updatedOrder = await client
//       .patch(id, {
//         set: {
//           isCancelled,
//           isShipped,
//           isDelivered,
//           isProcessing,
//           isConfirmed,
//         },
//       })
//       .commit();

//     return NextResponse.json({
//       success: true,
//       updatedOrder: updatedOrder.data,
//     }); // Adjust response content as needed
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message });
//   }
// };
