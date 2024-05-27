"use client";
import React, { Suspense, useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Trash,
  Coins,
  Clock,
  Calendar,
  WalletCards,
  Loader2,
  X,
  ArrowRight,
  MessageSquare,
  Undo,
  ThumbsDown,
  Undo2,
} from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";
import { LuHelpingHand } from "react-icons/lu";
import { PiHandCoinsLight } from "react-icons/pi";
import { FaRegHandshake } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { FcProcess } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { DateTime } from "luxon";
import Link from "next/link";
import { client, sanityFetch } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useToast } from "@/components/ui/use-toast";
import { addDays, isWeekend } from "date-fns"; // Assuming you have date-fns installed

const OrderTab = ({ userOrders, order }) => {
  function calculateBusinessDay(updatedAt) {
    if (!updatedAt) {
      // Handle missing or invalid updatedAt (optional)
      return null; // Or throw an error, provide a default value, etc.
    }

    const startDate = new Date(updatedAt);

    // Handle weekends and holidays (replace with your specific logic)
    let currentDate = startDate;
    let businessDaysAdded = 0;
    for (let i = 0; i < 5; i++) {
      currentDate = addDays(currentDate, 2);
      if (!isWeekend(currentDate)) {
        businessDaysAdded++;
      }
      return currentDate;
    }
  }
  // console.log()
  const user = auth.currentUser;
  const [userOrder, setUserOrder] = useState(userOrders);
  const [cancelling, setCancelling] = useState(false);
  const [returning, setReturning] = useState(false);
  // const userId = user?.uid;
  const router = useRouter();
  // console.log(userOrders, order);

  const parsedDateTime = userOrder[0] && DateTime.fromISO(userOrder[0]._createdAt);
  // console.log(userOrder);
  const formattedDate = parsedDateTime.toFormat("yyyy-LL-dd"); // 2024-04-11

  // const revTrial = async () => {
  //   const orders = await sanityFetch({
  //     query: groq`*[_type == "orders"]`,
  //     tags: ["orders"],
  //   });
  //   const rev = orders.filter((userOrder) => userOrder.name === order);
  //   console.log(rev);
  // };
  const sendWelcomeMessage = async (userId, adminId, orderId) => {
    try {
      await setDoc(doc(db, "rooms", roomId), {
        userIds: [userId, adminId],
      });
      const messageRef = collection(db, `rooms/${roomId}/messages`);
      const timestamp = Date.now();
      const message = {
        content: `Hello, ${user.displayName}!
           Your request to cancel you order of ID ${orderId} has been recieved and approved.
           We will contact you via voice call and carry on from there`,
        timestamp: timestamp,
        user: "Andamo Team",
        roomId: roomId,
        userId: adminId,
        id: uuidv4(),
        orderId,
      };

      await addDoc(messageRef, message);
    } catch (error) {
      console.error("Error sending welcome message:", error);
    }
  };
  const { toast } = useToast();
// console.log(
//   userOrder[0].currentStat)
  const cancelOrder = async () => {
    try {
      setCancelling(true);

      const req = await fetch("/api/update-order", {
        method: "POST",
        body: JSON.stringify({
          isCancelled: true,
          isShipped: userOrder[0].isShipped,
          isDelivered: userOrder[0].isDelivered,
          isProcessing: userOrder[0].isProcessing,
          isConfirmed: userOrder[0].isConfirmed,
          currentStat: "cancel-request",
          id: userOrder[0]._id,
        }),
      });
      if (req) {
        const updatedOrder = {
          ...userOrder[0],
          isCancelled: true,
        };
        setUserOrder(updatedOrder);
        toast({
          title: `Order ${userOrder[0].name} is cancelled`,
          description: `Cancelled orders are moved to the  orders history section`,
          variant: "destructive",
        });
        // sendWelcomeMessage(user.uid,'ezvRP6tcppZlzzR8D9Cy4qRSh0U2', orderId)
        setCancelling(false);
      }

      // setTimeout(() => {
      // router.replace('/orders');
      // }, 5000);
    } catch (error) {
      console.error(error);
      setCancelling(false);
    }
    // console.log(await req.json())
  };

  const returnOrder = async () => {
    try {
      setReturning(true);

      const req = await fetch("/api/update-order", {
        method: "POST",
        body: JSON.stringify({
          isCancelled: true,
          isShipped: userOrder[0].isShipped,
          isDelivered: userOrder[0].isDelivered,
          isProcessing: userOrder[0].isProcessing,
          isConfirmed: userOrder[0].isConfirmed,
          currentStat: "return-request",
          id: userOrder[0]._id,
        }),
      });
      if (req) {
        const updatedOrder = {
          ...userOrder[0],
          isCancelled: true,
        };
        setUserOrder(updatedOrder);
        toast({
          title: `Order ${userOrder[0].name}'s return request is sent`,
          // description: `Cancelled orders are moved to the  orders history section`,
          // variant: "destructive",
        });
        // sendWelcomeMessage(user.uid,'ezvRP6tcppZlzzR8D9Cy4qRSh0U2', orderId)
        setReturning(false);
      }
    } catch (error) {
      console.error(error);
      setReturning(false);
    }
    // console.log(await req.json())
  };

  useEffect(() => {
    setUserOrder(userOrders)
  }, [userOrders]);
  return (
    <div className="">
      <h2 className="my-5 text-center text-yellow-500 font-semibold  text-3xl">
        Track Order
      </h2>
      {/* <button onClick={revTrial}>check</button> */}
      {!userOrder[0].isCancelled && (
        <p className="mt-5 sm:w-3/4 w-[80%] mx-auto ">
          <b className="text-xl sm:text-2xl ">Note:</b> Cancel anytime{" "}
          <b> before it ships</b>. Return requests are only approved within{" "}
          <b> 2 business</b> days of delivery if the state product you received
          is in the same condition as it was shipped.
        </p>
      )}
      {!userOrder[0].isCancelled &&
        userOrder[0].isDelivered &&
        calculateBusinessDay(userOrders[0]._updatedAt) < new Date() && (
          <Button
            variant="outline"
            type="button"
            disabled={returning}
            className=" w-max mx-auto flex gap-x-1 mt-3 mb-4 "
            onClick={returnOrder}
          >
            {returning ? (
              <>
                sending return request... <Loader2 className="animate-spin" />
              </>
            ) : (
              <>
                send return request <Undo />
              </>
            )}
          </Button>
        )}
      <div className="flex mt-8 flex-col gap-y-2" key={order.name}>
        <div className="sm:w-3/4 w-full mx-auto justify-center flex flex-wrap items-center gap-3">
          <div
            className="my-3 hover:bg-gray-50 dark:hover:bg-zinc-600 dark:shadow-none  shadow-md rounded-lg text-zinc-400 
border-gray-400 dark:border dark:border-zinc-600  w-[35%] sm:w-1/2 md:w-[35%] mx-auto
py-4 justify-center font-semibold flex flex-col sm:flex-row items-center gap-x-3 text-xl"
          >
            <WalletCards className="w-8 h-8" />
            <div className="flex flex-col items-center">
              <h2 className="text-sm dark:text-yellow-500 text-black font-semibold sm:text-lg ">
                {" "}
                Order ID
              </h2>
              <span className=" text-sm ">{userOrder[0].name}</span>
            </div>
          </div>

          <div
            className="my-3 hover:bg-gray-50 dark:hover:bg-zinc-600 dark:shadow-none  shadow-md rounded-lg text-zinc-400 
border-gray-400 dark:border dark:border-zinc-600 w-[35%] sm:w-1/2 md:w-[35%] mx-auto
py-4 justify-center font-semibold flex flex-col sm:flex-row  items-center gap-x-3 text-xl"
          >
            <Calendar className="w-8 h-8" />
            <div className="flex flex-col gap-y-2 items-center">
              <h2 className=" text-sm text-black dark:text-yellow-500 font-semibold  sm:text-lg ">
                Date
              </h2>{" "}
              <span className=" text-sm">{formattedDate} </span>
            </div>
          </div>
          {!userOrder[0].isCancelled && (
            <>
              <div
                className="my-3 hover:bg-gray-50 dark:hover:bg-zinc-600 dark:shadow-none  shadow-md rounded-lg text-zinc-400 
border-gray-400 dark:border dark:border-zinc-600 w-[35%] sm:w-1/2 md:w-[35%] mx-auto
py-4 justify-center font-semibold flex flex-col sm:flex-row items-center gap-x-3 text-xl"
              >
                <FaHome className="text-3xl" />{" "}
                <div className="flex gap-y-2 flex-col">
                  <span className="text-black text-sm sm:text-lg dark:text-yellow-500">
                    Delivery Address
                  </span>{" "}
                  <p className="text-sm capitalize">
                    {userOrder[0].shippingAddress}
                    {/* obuasi, Kumasi, Ashanti, Ghana */}
                  </p>{" "}
                </div>{" "}
              </div>
              <Link
                href="/chats"
                className="my-3 hover:bg-gray-50 dark:hover:bg-zinc-600 dark:shadow-none  shadow-md rounded-lg text-zinc-400 
              border-gray-400 dark:border dark:border-zinc-600 w-[35%] sm:w-1/2 md:w-[35%] mx-auto
              py-4 justify-center font-semibold flex flex-col sm:flex-row items-center gap-x-3 sm:text-xl"
              >
                <MessageSquare className="w-8 h-8" />
                {/* <div className="flex flex-col items-center"> */}
                <p className="text-black text-sm sm:text-lg dark:text-yellow-500">
                  Text us here
                </p>
                <ArrowRight />
                {/* </div> */}
              </Link>
            </>
          )}
        </div>

        <>
          <div className=   "flex justify-evenly px-4 ">
            {!userOrder[0].isCancelled ||
              (!userOrder[0].isCancelled && !userOrder[0].isDelivered && (
                <h2 className="my-3 flex flex-col sm:flex-row items-center gap-x-2 mt-8 text-zinc-400  font-semibold text-center  ">
                  <Clock className="w-5 h-5" />{" "}
                  <span className="text-black dark:text-yellow-500">
                    ETA: 3 - 5 days
                  </span>
                </h2>
              ))}
            <h2 className="my-3 flex flex-col sm:flex-row items-center gap-x-2 mt-8 text-zinc-400  font-semibold text-center ">
              <Coins className="w-5 h-5" />
              <span className="text-black dark:text-yellow-500">
                {" "}
                Total: GHS {userOrder[0].total}{" "}
              </span>
            </h2>
          </div>

          <div className="flex gap-x-8 mt-8 sm:px-0 items-center justify-center ">
            <div className="flex items-center flex-col">
              {userOrder[0].isConfirmed && (
                <p className="text-center lg:text-lg text-sm md:text-base">
                  {userOrder[0].isConfirmed ? "✅" : "❌"}
                </p>
              )}
              {userOrder[0].isConfirmed && (
                <>
                  <div className="h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>{" "}
                  <p className="text-center lg:text-lg text-sm md:text-base">
                    {userOrder[0].isConfirmed ? "✅" : "❌"}
                  </p>
                </>
              )}
              {userOrder[0].isProcessing && (
                <>
                  <div className="h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>{" "}
                  <p className="text-center text-lg">
                    {userOrder[0].isProcessing ? "✅" : "❌"}
                  </p>
                </>
              )}
              {userOrder[0].isShipped && (
                <>
                  <div className="h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>
                  <p className="text-center text-lg">
                    {userOrder[0].isShipped ? "✅" : "❌"}
                  </p>
                </>
              )}
              {userOrder[0].isDelivered && (
                <>
                  <div className="h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>
                  <p className="text-center text-lg">
                    {userOrder[0].isDelivered ? "✅" : "❌"}
                  </p>
                </>
              )}
              {userOrder[0].isCancelled && userOrder[0].isDelivered && (
                <>
                  <div className="h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>
                  <p className="text-center text-lg">
                    {userOrder[0].isCancelled && userOrder[0].isDelivered
                      ? "✅"
                      : "❌"}
                  </p>
                </>
              )}
               {userOrder[0].isCancelled && !userOrder[0].isDelivered && (
                <>
                  <div className="h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>
                  <p className="text-center text-lg">
                    {userOrder[0].isCancelled && !userOrder[0].isDelivered
                      ? "✅"
                      : "❌"}
                  </p>
                </>
              )}
              {userOrder[0].isCancelled &&
                userOrder[0].isDelivered &&
                (userOrder[0].currentStat === "approve-return" ||
                  userOrder[0].currentStat === "decline-return") && (
                  <>
                    <div className="h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>
                    <p className="text-center text-lg">
                      {userOrder[0].isCancelled &&
                      userOrder[0].isDelivered &&
                      userOrder[0].currentStat === "approve-return"
                        ? "✅"
                        : "❌"}
                    </p>
                  </>
                )}
              {userOrder[0].isCancelled &&
                !userOrder[0].isDelivered &&
                (userOrder[0].currentStat === "approve-cancel" ||
                  userOrder[0].currentStat === "decline-cancel") && (
                  <>
                    <div className="h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>
                    <p className="text-center text-lg">
                      {userOrder[0].isCancelled &&
                      !userOrder[0].isDelivered &&
                      userOrder[0].currentStat === "approve-cancel"
                        ? "✅"
                        : "❌"}
                    </p>
                  </>
                )}
            </div>

            <div className="flex flex-col gap-y-[3.5rem]">
              {userOrder[0].isConfirmed && (
                <div className="flex gap-x-2 items-center">
                  <LuHelpingHand className="text-4xl" />
                  <div className="flex flex-col gap-y-2">
                    <p className="capitalize font-bold">order confirmed</p>
                    <p className="text-sm text-gray-400 dark:text-zinc-400">
                      We have recieved your order
                    </p>
                  </div>
                </div>
              )}
              {userOrder[0].isConfirmed && (
                <div className="flex gap-x-2 items-center">
                  <PiHandCoinsLight className="text-4xl" />
                  <div className="flex flex-col gap-y-2">
                    <p className="capitalize font-bold">payment confirmed</p>
                    <p className="text-sm text-gray-400 dark:text-zinc-400">
                      We have recieved your payment
                    </p>
                  </div>
                </div>
              )}
              {userOrder[0].isProcessing && (
                <div className="flex gap-x-2 items-center">
                  <FcProcess className="text-4xl" />
                  <div className="flex flex-col gap-y-2">
                    <p className="capitalize font-bold">order processed</p>
                    <p className="text-sm text-gray-400 dark:text-zinc-400">
                      We are preparing your order
                    </p>
                  </div>
                </div>
              )}{" "}
              {userOrder[0].isShipped && (
                <div className="flex gap-x-2 items-center">
                  <GrDeliver className="text-4xl" />
                  <div className="flex flex-col gap-y-2">
                    <p className="capitalize font-bold">order shipped</p>
                    <p className="text-sm text-gray-400 dark:text-zinc-400">
                      Your order is on the way
                    </p>
                  </div>
                </div>
              )}{" "}
              {userOrder[0].isDelivered && (
                <div className="flex gap-x-2 items-center">
                  <FaRegHandshake className="text-4xl" />
                  <div className="flex flex-col gap-y-2">
                    <p className="capitalize font-bold">order delivered</p>
                    <p className="text-sm text-gray-400 dark:text-zinc-400">
                      We have delivered your order
                    </p>
                  </div>
                </div>
              )}
              {userOrder[0].isCancelled && !userOrder[0].isDelivered && (
                <div className="flex gap-x-2 items-center">
                  <X className="text-4xl" />
                  <div className="flex flex-col gap-y-2">
                    <p className="capitalize text-red-500 font-bold">
                      cancel order request
                    </p>
                    <p className="text-sm  text-gray-400 dark:text-zinc-400">
                      You sent Cancel Request.
                    </p>
                  </div>
                </div>
              )}
              {userOrder[0].isCancelled && userOrder[0].isDelivered && (
                <div className="flex gap-x-2 items-center">
                  <Undo2 className="text-4xl" />
                  <div className="flex flex-col gap-y-2">
                    <p className="capitalize font-bold">return order request</p>
                    <p className="text-sm  text-gray-400 dark:text-zinc-400">
                      You sent return Request.
                    </p>
                  </div>
                </div>
              )}
              {userOrder[0].isCancelled &&
                userOrder[0].isDelivered &&
                (userOrder[0].currentStat === "approve-return" ||
                  userOrder[0].currentStat === "decline-return") && (
                  <div className="flex gap-x-2 items-center">
                    <div className="text-3xl flex flex-col items-center">
                      {" "}
                      <Undo2 className="text-4xl" />{" "}
                      {userOrder[0].currentStat === "approve-return"
                        ? "👍"
                        : "👎"}
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <p className="capitalize font-bold">
                        {userOrder[0].currentStat === "approve-return"
                          ? "Request approved"
                          : "Request denied"}
                      </p>
                      <p className="text-sm w-[250px] text-gray-400 dark:text-zinc-400">
                        {userOrder[0].currentStat === "approve-return"
                          ? "Return request was approvd"
                          : "Return request was denied"}
                      </p>
                    </div>
                  </div>
                )}
              {(userOrder[0].isCancelled &&
                !userOrder[0].isDelivered &&
                (userOrder[0].currentStat === "approve-cancel" ||
                  userOrder[0].currentStat === "decline-cancel")) && (
                  <div className="flex gap-x-2 items-center">
                    <div className="text-3xl flex flex-col items-center">
                      {" "}
                      <X className="text-4xl" />{" "}
                      {userOrder[0].currentStat === "approve-cancel"
                        ? "👍"
                        : "👎"}
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <p className="capitalize text-red-500 font-bold">
                        {userOrder[0].currentStat === "approve-cancel"
                          ? "Request approved"
                          : "Request denied"}
                      </p>
                      <p className="text-sm w-[250px] text-gray-400 dark:text-zinc-400">
                        {userOrder[0].currentStat === "approve-cancel"
                          ? "Cancel request was approvd"
                          : "Cancel request was denied"}
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </>

        {!userOrder[0].isShipped && !userOrder[0].isCancelled && (
          <div className="mx-auto my-2 w-max">
            <Button
              variant="outline"
              type="button"
              disabled={userOrder[0].isShipped || cancelling}
              className=" w-max flex gap-x-1 mt-3 mb-4 "
              onClick={() => cancelOrder(userOrder[0].name)}
            >
              {cancelling ? (
                <>
                  cancelling order... <Loader2 className="animate-spin" />
                </>
              ) : (
                <>
                  Cancel order {userOrder[0].name} <Trash />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
      {/* {userOrder[0].isCancelled && !userOrder[0].isDelivered && (
        <p className="text-3xl my-5 text-center text-red-500">
          You cancelled this order
        </p>
      )} */}

      <h2 className="my-5  font-semibold text-center text-xl">
        Ordered Items:
      </h2>

      <div
        // opts={{
        //   align: "start",
        // }}
        className="w-3/4 flex flex-wrap items-center gap-8 justify-center my-5  mx-auto relative"
      >
        {userOrder[0].orderProducts.map((orderProduct) => (
          <Suspense
            key={orderProduct.name}
            fallback={
              <div className="h-24 w-24 bg-gray-400 dark:bg-[#292e36]  animate-pulse rounded-lg"></div>
            }
          >
            <div className="">
              <Image
                src={urlForImage(orderProduct?.image)}
                alt={orderProduct.name}
                width={200}
                height={200}
                className="mx-auto object-cover bg-gray-200 dark:bg-zinc-600 rounded-lg p-1 my-2 h-[180px] w-[200px]"
              />
              <p className="mx-auto my-2 w-max">Name: {orderProduct.name}</p>
              <div className="flex  mx-auto gap-x-2">
                {" "}
                <p className="mx-auto my-2 w-max">
                  Quantity: {orderProduct.quantity}
                </p>
                <p className="mx-auto my-2 w-max">
                  Price: {orderProduct.price}
                </p>
              </div>
            </div>{" "}
            {/* <div className="mx-auto my-2 w-max">
                  <Button
                    variant="outline"
                    type="button"
                    className=" w-max"
                    disabled={userOrders[0].isShipped}
                  >
                    cancel order item <Trash />
                  </Button>
                </div> */}
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default OrderTab;
