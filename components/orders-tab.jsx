"use client";
import React, { useEffect } from "react";
// import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { Button } from "./ui/button";
import { Trash, X } from "lucide-react";
import NoOrders from "./no-orders";
import { Swiper, SwiperSlide } from "swiper/react";
import { client, sanityFetch } from "@/sanity/lib/client";

import { groq } from "next-sanity";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DateTime } from "luxon";

import { useAuthState } from "react-firebase-hooks/auth";

// export const storedUser = JSON.parse(sessionStorage.getItem("andamo-user"))

const OrdersTab = ({sanityOrders}) => {
  // const { data } = useSession();
  const [user] = useAuthState(auth);
  // console.log(orders.length );
  const [orders, setOrders] = useState(sanityOrders)

  // const getAllOrders = async () => {
  //   const orders = await sanityFetch({
  //     query: groq`*[_type == "orders"]`,
  //     // omit `tags` or use a new tag here to differentiate
  //   });
  //   console.log(orders);
  // };
  // const fullname = user?.displayName;
  //   const username = fullname.split(' ')
  //   const userPhone = fullname?.phoneNumber;
  //   const userEmail = fullname?.email;
  // const avatar = fullname && fullname?.split("");
  const userId = user?.uid;

  const userOrders = orders.filter(
    (order) =>
      order.purchaser.id === userId && !order.isDelivered && !order.isCancelled
  );
  const sortedUserOrders = userOrders.slice().sort((a, b) => {
    return new Date(b._createdAt) - new Date(a._createdAt);
  });
  // console.log(userOrders)

  const userOrdersHistory = orders.filter(
    (order) =>
      (order.purchaser.id === userId && order.isDelivered) || order.isCancelled
  );
  const sortedUserOrdersHistory = userOrdersHistory.slice().sort((a, b) => {
    return new Date(b._createdAt) - new Date(a._createdAt);
  });

  // console.log(orders, userOrders);
  // console.log(userOrders);
  const router = useRouter();
  useEffect(() => {
    setOrders(sanityOrders)
  }, [sanityOrders]);

  return (
    <div>
      <Tabs defaultValue="track" className="flex flex-col justify-center">
        <TabsList className="lg:text-lg mx-auto dark:bg-[#3c3d3f] text-sm md:text-base">
          <TabsTrigger
            value="track"
            // onClick={console.log(orders, userOrders)}
          >
            Track Order
          </TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
        </TabsList>
        <TabsContent value="track">
          {userOrders.length > 0 && (
            <>
              <h2 className="my-9 text-center text-yellow-500 font-semibold  text-3xl">
                Current Orders
              </h2>
              {/* <button onClick={getAllOrders}>rev</button> */}
            </>
          )}

          {userOrders.length === 0 ? (
            <NoOrders text="You have no order at the moment" />
          ) : (
            sortedUserOrders.map((order) => {
              let currentStat;
              if (
                order.isConfirmed &&
                !order.isProcessing &&
                !order.isShipped &&
                !order.isDelivered &&
                !order.isCancelled
              ) {
                currentStat = "confirmed";
              }
              if (
                order.isConfirmed &&
                order.isProcessing &&
                !order.isShipped &&
                !order.isDelivered &&
                !order.isCancelled
              ) {
                currentStat = "processing";
              }
              if (
                order.isConfirmed &&
                order.isProcessing &&
                order.isShipped &&
                !order.isDelivered &&
                !order.isCancelled
              ) {
                currentStat = "shipped";
              }
              if (
                order.isConfirmed &&
                order.isProcessing &&
                order.isShipped &&
                order.isDelivered &&
                !order.isCancelled
              ) {
                currentStat = "delivered";
              }
              if (order.isCancelled) {
                currentStat = "cancelled";
              }
              const parsedDateTime = DateTime.fromISO(order._createdAt);

              const formattedDate = parsedDateTime.toFormat("yyyy-LL-dd"); // 2024-04-11

              return (
                <div className="w-full" key={order.name}>
                  <Link href={`/orders/${order.name}`} className="">
                    <div className="p-4 rounded-lg w-[85%] md:w-3/4 mx-auto my-3 bg-gray-200 hover:bg-gray-100 dark:bg-[#444446] transition-all hover:dark:bg-[#3c3d3f]">
                      <div className="flex items-center justify-between">
                        <p className="font-bold">{order.name}</p>
                        <Link
                          href={`/orders/${order.name}`}
                          className="hover:underline text-yellow-500 dark:text-yellow-200 text-sm"
                        >
                          more info
                        </Link>
                      </div>
                      <div className="flex mt-2 items-center justify-between">
                        <p className="text-sm capitalize dark:text-yellow-500">
                          {currentStat}
                        </p>
                        <p className="text-sm text-gray-400 dark:text-zinc-400 ">
                          {formattedDate}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </TabsContent>
        <TabsContent value="history">
          {sortedUserOrdersHistory.length > 0 && (
            <h2 className="my-9 text-center text-yellow-500 font-semibold  text-3xl">
              Orders History
            </h2>
          )}
          {sortedUserOrdersHistory.length > 0 ? (
            sortedUserOrdersHistory.map((order) => {
              let currentStat;

              if (
                order.isConfirmed &&
                !order.isProcessing &&
                !order.isShipped &&
                !order.isDelivered &&
                !order.isCancelled
              ) {
                currentStat = "confirmed";
              }
              if (
                order.isConfirmed &&
                order.isProcessing &&
                !order.isShipped &&
                !order.isDelivered &&
                !order.isCancelled
              ) {
                currentStat = "processing";
              }
              if (
                order.isConfirmed &&
                order.isProcessing &&
                order.isShipped &&
                !order.isDelivered &&
                !order.isCancelled
              ) {
                currentStat = "shipped";
              }
              if (
                order.isConfirmed &&
                order.isProcessing &&
                order.isShipped &&
                order.isDelivered &&
                !order.isCancelled
              ) {
                currentStat = "delivered";
              }
              if (order.isCancelled) {
                currentStat = `cancelled ${order.currentStat === 'cancel-request' ? "✋" : order.currentStat === 'approve-cancel' ? "✅" : "❌"}`;
              }
              if (order.isCancelled && order.isDelivered) {
                currentStat = "return";
              }
              const parsedDateTime = DateTime.fromISO(order._createdAt);

              const formattedDate = parsedDateTime.toFormat("yyyy-LL-dd"); // 2024-04-11

              // console.log(order.orderProducts);
              return (
                <div className="w-full" key={order.name}>
                  <Link href={`/orders/${order.name}`} className="">
                    <div
                      className={`p-4 rounded-lg w-[85%] md:w-3/4 mx-auto my-3 ${
                        order.isCancelled && !order.isDelivered
                          ? "dark:hover:bg-red-300 hover:bg-red-50 bg-red-100 dark:bg-red-400"
                          : order.isCancelled && order.isDelivered ? "dark:hover:bg-blue-300 hover:bg-blue-50 bg-blue-100 dark:bg-blue-400": "bg-green-100 dark:bg-green-400 dark:hover:bg-green-300 hover:bg-green-50"
                      }   transition-all `}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-bold">{order.name}</p>
                        <Link
                          href={`/orders/${order.name}`}
                          className="hover:underline text-yellow-500 dark:text-black text-sm"
                        >
                          more info
                        </Link>
                      </div>
                      <div className="flex mt-2 items-center justify-between">
                        <p className="text-sm capitalize dark:text-zinc-600">
                          {currentStat}
                        </p>
                        <p className="text-sm text-gray-400 dark:text-zinc-600 ">
                          {formattedDate}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <NoOrders text="You have no order history at the moment" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersTab;
