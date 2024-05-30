"use client";
import React, { useState, useEffect } from "react";
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
import { ThumbsDown, Undo2, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "./ui/button";
import Link from "next/link";
import NoOrders from "./no-orders";
import { useRouter } from "next/navigation";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { LuHelpingHand } from "react-icons/lu";
import { Truck } from "lucide-react";
import { FaRegHandshake } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { FcProcess } from "react-icons/fc";
import { DateTime } from "luxon";

const AdminTabs = ({ adminOrders, siteInfos }) => {
  // const [isConfirmed, setIsConfirmed] = useState(false);
  // const [isProcessing, setIsProcessing] = useState(false);
  // const [isShipped, setIsShipped] = useState(false);
  // const [isDelivered, setIsDelivered] = useState(false);
  // const [isCancelled, setIsCancelled] = useState(false);
  const [orders, setOrders] = useState(adminOrders)
  const newOrders = orders.filter(
    (order) => !order.isDelivered && !order.isCancelled
  );
  const sortedNewOrders = newOrders.slice().sort((a, b) => {
    return new Date(b._createdAt) - new Date(a._createdAt);
  });

  const deliveries = orders.filter(
    (order) => !order.isCancelled && order.isDelivered
  );

  const sortedDeliveries = deliveries.slice().sort((a, b) => {
    return new Date(b._updatedAt) - new Date(a._updatedAt);
  });

  const cancels = orders.filter(
    (order) => order.isCancelled && !order.isDelivered
  );
  const sortedCancels = cancels.slice().sort((a, b) => {
    return new Date(b._updatedAt) - new Date(a._updatedAt);
  });

  const returns = orders.filter(
    (order) => order.isCancelled && order.isDelivered
  );
  const requests = orders.filter(
    (order) =>
      order.currentStat === "return-request" ||
      order.currentStat === "cancel-request"
  );
  const approves = orders.filter(
    (order) =>
      order.currentStat === "approve-return" ||
      order.currentStat === "approve-cancel"
  );
  const declines = orders.filter(
    (order) =>
      order.currentStat === "decline-return" ||
      order.currentStat === "decline-cancel"
  );
  const sortedReturns = returns.slice().sort((a, b) => {
    return new Date(b._updatedAt) - new Date(a._updatedAt);
  });
  const sortedRequests = requests.slice().sort((a, b) => {
    return new Date(b._updatedAt) - new Date(a._updatedAt);
  });
  const sortedApproves = approves.slice().sort((a, b) => {
    return new Date(b._updatedAt) - new Date(a._updatedAt);
  });
  const sortedDeclines = declines.slice().sort((a, b) => {
    return new Date(b._updatedAt) - new Date(a._updatedAt);
  });
  const router = useRouter();

  useEffect(() => {
    setOrders(adminOrders)
    router.refresh()
  }, [adminOrders]);
  useEffect(()=>{
    router.refresh()

  },[])
  return (
    <>
      <div>
        <Tabs defaultValue="track" className="">
          <TabsList classname="lg:text-lg mx-auto mt-4 text-sm md:text-base">
            <TabsTrigger value="track">
              Active{" "}
              <span className="text-yellow-500"> ({newOrders.length})</span>
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            {/* <TabsTrigger value="returns">Returns</TabsTrigger> */}
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
            <TabsTrigger value="cancels">Cancels</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="requests">
              Requests{" "}
              <span className="text-yellow-500"> ({requests.length})</span>{" "}
            </TabsTrigger>
            <TabsTrigger value="approves">Approves</TabsTrigger>
            <TabsTrigger value="declines">Declines</TabsTrigger>
          </TabsList>

          <TabsContent value="track">
            {sortedNewOrders.length === 0 ? (
              <NoOrders text="No Active Orders" />
            ) : (
              <>
                <p className="pl-4 my-3 w-[90%] mx-auto sm:w-3/4 text-lg font-semibold capitazlize">
                  ({sortedNewOrders.length}){" "}
                  {sortedNewOrders.length > 1
                    ? "Current Orders"
                    : "Current Order"}
                </p>
                <Table className="w-full ">
                  <TableBody className="w-full flex flex-col gap-4">
                    {sortedNewOrders.map((order) => {
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
                      let dateObj = new Date(order._createdAt);
                      let normalDate = dateObj.toLocaleDateString();
                      const parsedDateTime = DateTime.fromISO(order._createdAt);
                      const formattedDate = parsedDateTime.toFormat(
                        "yyyy.MM.dd 'at' HH:mm a"
                      );
                      return (
                        <Link
                          key={order.name}
                          href={`/admin-dashboard/orders/${order._id}`}
                          className="w-[90%] relative mx-auto p-3 rounded-lg sm:w-3/4  dark:bg-[#3c3d3f] hover:opacity-80 bg-yellow-100"
                        >
                          <p className="absolute top-3 right-3">
                            {currentStat === "confirmed" ? (
                              <FaRegHandshake className="text-2xl text-yellow-500" />
                            ) : currentStat === "processing" ? (
                              <FcProcess className="text-2xl text-yellow-500" />
                            ) : currentStat === "shipped" ? (
                              <Truck className="text-2xl text-yellow-500" />
                            ) : currentStat == "cancelled" ? (
                              <ThumbsDown className="text-red-500" />
                            ) : (
                              <GrDeliver className="text-2xl text-yellow-500" />
                            )}
                          </p>
                          {/* <TableRow className="w-full "> */}
                          {/* <form onSubmit={handleUpdate}> */}{" "}
                          {/* <TableCell classname="text-lg w-full"> */}
                          {/* <Image/> */}
                          <p>
                            <span className="text-black font-semibold">
                              Order ID:
                            </span>{" "}
                            {order.name}
                          </p>
                          <p>
                            <span className="text-black  font-semibold">
                              Order Total:
                            </span>{" "}
                            GHS{order.total}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Current Status:
                            </span>{" "}
                            {currentStat}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Date ordered:
                            </span>{" "}
                            {formattedDate}
                          </p>
                          {/* </TableCell> */}
                          {/* </form> */}
                          {/* </TableRow>{" "} */}
                        </Link>
                      );
                    })}
                  </TableBody>
                </Table>
              </>
            )}
          </TabsContent>
          <TabsContent value="history">
            {orders.length === 0 ? (
              <NoOrders text="No Orders" />
            ) : (
              <>
                {" "}
                <p className="pl-4 my-3 w-[90%] mx-auto sm:w-3/4 text-lg font-semibold capitazlize">
                  ({orders.length}){" "}
                  {orders.length > 1 ? "Orders History" : "Order History"}
                </p>
                <Table className="w-full ">
                  <TableBody className="w-full flex flex-col gap-4">
                    {orders
                      .slice()
                      .sort((a, b) => {
                        return new Date(b._updatedAt) - new Date(a._updatedAt);
                      })
                      .map((order) => {
                        let currentStat;
                        let bgColor;
                        if (
                          order.isConfirmed &&
                          !order.isProcessing &&
                          !order.isShipped &&
                          !order.isDelivered &&
                          !order.isCancelled
                        ) {
                          currentStat = "confirmed";
                          bgColor = "bg-yellow-100 dark:bg-[#3c3d3f]";
                        }
                        if (
                          order.isConfirmed &&
                          order.isProcessing &&
                          !order.isShipped &&
                          !order.isDelivered &&
                          !order.isCancelled
                        ) {
                          currentStat = "processing";
                          bgColor = "bg-yellow-100 dark:bg-[#3c3d3f]";
                        }
                        if (
                          order.isConfirmed &&
                          order.isProcessing &&
                          order.isShipped &&
                          !order.isDelivered &&
                          !order.isCancelled
                        ) {
                          currentStat = "shipped";
                          bgColor = "bg-yellow-100 dark:bg-[#3c3d3f] ";
                        }
                        if (
                          order.isConfirmed &&
                          order.isProcessing &&
                          order.isShipped &&
                          order.isDelivered &&
                          !order.isCancelled
                        ) {
                          currentStat = "delivered";
                          bgColor = "bg-green-100 dark:bg-green-400";
                        }
                        if (order.isCancelled && !order.isDelivered) {
                          currentStat = "cancelled";
                          bgColor = "bg-red-100 dark:bg-red-400";
                        }
                        if (order.isCancelled && order.isDelivered) {
                          currentStat = "return";
                          bgColor = "bg-blue-100 dark:bg-blue-400";
                        }
                        let dateObj = new Date(order._createdAt);
                        let normalDate = dateObj.toLocaleDateString();
                        const parsedDateTime = DateTime.fromISO(
                          order._createdAt
                        );
                        const formattedDate = parsedDateTime.toFormat(
                          "yyyy.MM.dd 'at' HH:mm a"
                        );
                        return (
                          <Link
                            key={order.name}
                            href={`/admin-dashboard/orders/${order._id}`}
                            className={`w-[90%] relative mx-auto p-3 rounded-lg sm:w-3/4  hover:opacity-80 ${bgColor}`}
                          >
                            <p className="absolute top-3 right-3">
                              {currentStat === "confirmed" ? (
                                <FaRegHandshake className="text-2xl text-yellow-500" />
                              ) : currentStat === "processing" ? (
                                <FcProcess className="text-2xl text-yellow-500" />
                              ) : currentStat === "shipped" ? (
                                <GrDeliver className="text-2xl text-yellow-500" />
                              ) : currentStat == "cancelled" ? (
                                <ThumbsDown className="text-red-500" />
                              ) : currentStat == "return" ? (
                                <Undo2 className="text-blue-500 dark:text-blue-200" />
                              ) : (
                                <LuHelpingHand className="text-2xl text-green-500" />
                              )}
                            </p>
                            {/* <TableRow className="w-full"> */}
                            {/* <form onSubmit={handleUpdate}> */}{" "}
                            {/* <TableCell classname="text-lg w-full"> */}
                            {/* <Image/> */}
                            <p>
                              <span className="text-black font-semibold">
                                Order ID:
                              </span>{" "}
                              {order.name}
                            </p>
                            <p>
                              <span className="text-black font-semibold">
                                Order Total:
                              </span>{" "}
                              GHS{order.total}
                            </p>
                            <p>
                              <span className="text-black font-semibold">
                                Current Status:
                              </span>{" "}
                              {currentStat}
                            </p>
                            <p>
                              <span className="dark:text-black font-semibold">
                                Date ordered:
                              </span>{" "}
                              {formattedDate}
                            </p>
                            {/* </TableCell> */}
                            {/* </form> */}
                            {/* </TableRow> */}
                          </Link>
                        );
                      })}
                  </TableBody>
                </Table>
              </>
            )}
          </TabsContent>
          <TabsContent value="deliveries">
            {sortedDeliveries.length === 0 ? (
              <NoOrders text="No Delivered Orders" />
            ) : (
              <>
                <p className="pl-4 my-3 w-[90%] mx-auto sm:w-3/4 text-lg font-semibold capitazlize">
                  ({sortedDeliveries.length}){" "}
                  {sortedDeliveries.length > 1
                    ? "successful deliveries"
                    : "successful delivery"}
                </p>
                <Table className="w-full ">
                  <TableBody className="w-full flex flex-col gap-4">
                    {sortedDeliveries.map((order) => {
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
                      if (order.isCancelled && !order.isDelivered) {
                        currentStat = "cancelled";
                      }
                      let dateObj = new Date(order._createdAt);
                      let normalDate = dateObj.toLocaleDateString();
                      const parsedDateTime = DateTime.fromISO(order._createdAt);
                      const formattedDate = parsedDateTime.toFormat(
                        "yyyy.MM.dd 'at' HH:mm a"
                      );
                      return (
                        <Link
                          key={order.name}
                          href={`/admin-dashboard/orders/${order._id}`}
                          className=" w-[90%] relative mx-auto p-3 rounded-lg sm:w-3/4  dark:bg-green-400 hover:opacity-80  bg-green-100"
                        >
                          <p className="absolute top-3 right-3">
                            {currentStat === "confirmed" ? (
                              <FaRegHandshake className="text-2xl text-yellow-500" />
                            ) : currentStat === "processing" ? (
                              <FcProcess className="text-2xl text-yellow-500" />
                            ) : currentStat === "shipping" ? (
                              <GrDeliver className="text-2xl text-yellow-500" />
                            ) : currentStat == "cancelled" ? (
                              <ThumbsDown className="text-red-500" />
                            ) : (
                              <LuHelpingHand className="text-2xl text-green-500" />
                            )}
                          </p>
                          {/* <TableRow className="w-full"> */}
                          {/* <form onSubmit={handleUpdate}> */}{" "}
                          {/* <TableCell classname="text-lg w-full"> */}
                          {/* <Image/> */}
                          <p>
                            <span className=" text-black font-semibold">
                              Order ID:
                            </span>{" "}
                            {order.name}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Order Total:
                            </span>{" "}
                            GHS{order.total}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Current Status:
                            </span>{" "}
                            {currentStat}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Date ordered:
                            </span>{" "}
                            {formattedDate}
                          </p>
                          {/* </TableCell> */}
                          {/* </form> */}
                          {/* </TableRow> */}
                        </Link>
                      );
                    })}
                  </TableBody>
                </Table>
              </>
            )}
          </TabsContent>
          <TabsContent value="cancels">
            {sortedCancels.length === 0 ? (
              <NoOrders text="No Cancelled Orders" />
            ) : (
              <>
                <p className="pl-4 my-3 w-[90%] mx-auto sm:w-3/4 text-lg font-semibold capitazlize">
                  ({sortedCancels.length}){" "}
                  {sortedCancels.length > 1
                    ? "Cancelled Orders"
                    : "Cancelled Order"}
                </p>
                <Table className="w-full ">
                  <TableBody className="w-full flex flex-col gap-4">
                    {sortedCancels.map((order) => {
                      let currentStat = "cancelled";

                      let dateObj = new Date(order._createdAt);
                      let normalDate = dateObj.toLocaleDateString();
                      const parsedDateTime = DateTime.fromISO(order._createdAt);
                      const formattedDate = parsedDateTime.toFormat(
                        "yyyy.MM.dd 'at' HH:mm a"
                      );
                      return (
                        <Link
                          key={order.name}
                          href={`/admin-dashboard/orders/${order._id}`}
                          className="w-[90%] relative mx-auto p-3 rounded-lg sm:w-3/4  dark:bg-red-400 hover:opacity-80  bg-red-100"
                        >
                          <p className="absolute top-3 right-3">
                            {currentStat === "confirmed" ? (
                              <FaRegHandshake className="text-2xl text-yellow-500" />
                            ) : currentStat === "processing" ? (
                              <FcProcess className="text-2xl text-yellow-500" />
                            ) : currentStat === "shipping" ? (
                              <GrDeliver className="text-2xl text-yellow-500" />
                            ) : currentStat == "cancelled" ? (
                              <ThumbsDown className="text-red-500" />
                            ) : (
                              <LuHelpingHand className="text-2xl text-yellow-500" />
                            )}
                          </p>
                          {/* <TableRow className="w-full"> */}
                          {/* <form onSubmit={handleUpdate}> */}{" "}
                          {/* <TableCell classname="text-lg w-full"> */}
                          {/* <Image/> */}
                          <p>
                            <span className="text-black font-semibold">
                              Order ID:
                            </span>{" "}
                            {order.name}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Order Total:
                            </span>{" "}
                            GHS{order.total}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Current Status:
                            </span>{" "}
                            {currentStat}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Date ordered:
                            </span>{" "}
                            {formattedDate}
                          </p>
                          {/* </TableCell> */}
                          {/* </form> */}
                          {/* </TableRow> */}
                        </Link>
                      );
                    })}
                  </TableBody>
                </Table>
              </>
            )}
          </TabsContent>
          <TabsContent value="returns">
            {sortedReturns.length === 0 ? (
              <NoOrders text="No Returned Orders" />
            ) : (
              <>
                <p className="pl-4 my-3 w-[90%] mx-auto sm:w-3/4 text-lg font-semibold capitazlize">
                  ({sortedReturns.length}){" "}
                  {sortedReturns.length > 1
                    ? "Returned Orders"
                    : "Returned Order"}
                </p>
                <Table className="w-full ">
                  <TableBody className="w-full flex flex-col gap-4">
                    {sortedReturns.map((order) => {
                      let currentStat = "returned";

                      let dateObj = new Date(order._createdAt);
                      let normalDate = dateObj.toLocaleDateString();
                      const parsedDateTime = DateTime.fromISO(order._createdAt);
                      const formattedDate = parsedDateTime.toFormat(
                        "yyyy.MM.dd 'at' HH:mm a"
                      );
                      return (
                        <Link
                          key={order.name}
                          href={`/admin-dashboard/orders/${order._id}`}
                          className="w-[90%] relative mx-auto p-3 rounded-lg sm:w-3/4  dark:bg-blue-400 hover:opacity-80  bg-blue-100"
                        >
                          <p className="absolute flex items-center text-2xl top-3 right-3">
                            {order.currentStat === "approve-return"
                              ? "👍"
                              : order.currentStat === "decline-return"
                              ? "👎"
                              : "❗"}
                            <Undo2 className="h-16 w16 text-blue-500  dark:text-blue-200" />
                          </p>
                          {/* <TableRow className="w-full"> */}
                          {/* <form onSubmit={handleUpdate}> */}{" "}
                          {/* <TableCell classname="text-lg w-full"> */}
                          {/* <Image/> */}
                          <p>
                            <span className="text-black font-semibold">
                              Order ID:
                            </span>{" "}
                            {order.name}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Order Total:
                            </span>{" "}
                            GHS{order.total}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Current Status:
                            </span>{" "}
                            {currentStat}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Date ordered:
                            </span>{" "}
                            {formattedDate}
                          </p>
                          {/* </TableCell> */}
                          {/* </form> */}
                          {/* </TableRow> */}
                        </Link>
                      );
                    })}
                  </TableBody>
                </Table>
              </>
            )}
          </TabsContent>
          <TabsContent value="requests">
            {sortedRequests.length === 0 ? (
              <NoOrders text="No Requests" />
            ) : (
              <>
                <p className="pl-4 my-3 w-[90%] mx-auto sm:w-3/4 text-lg font-semibold capitazlize">
                  ({sortedRequests.length}){" "}
                  {sortedRequests.length > 1 ? "Requests" : "Request"}
                </p>
                <Table className="w-full ">
                  <TableBody className="w-full flex flex-col gap-4">
                    {sortedRequests.map((order) => {
                      let currentStat =
                        order.isDelivered && order.isCancelled
                          ? "return"
                          : "cancelled";

                      let dateObj = new Date(order._createdAt);
                      let normalDate = dateObj.toLocaleDateString();
                      const parsedDateTime = DateTime.fromISO(order._createdAt);
                      const formattedDate = parsedDateTime.toFormat(
                        "yyyy.MM.dd 'at' HH:mm a"
                      );
                      return (
                        <Link
                          key={order.name}
                          href={`/admin-dashboard/orders/${order._id}`}
                          className={`w-[90%] flex gap-x-3 items-center relative mx-auto p-3 rounded-lg sm:w-3/4 dark:bg-gray-500 bg-gray-200 hover:opacity-80  `}
                        >
                          <p className=" flex items-center text-2xl">
                            <AlertCircle className="w-16 h-16 text-white" />
                          </p>
                          {/* <TableRow className="w-full"> */}
                          {/* <form onSubmit={handleUpdate}> */}{" "}
                          {/* <TableCell classname="text-lg w-full"> */}
                          {/* <Image/> */}
                          <div className="">
                            <p>
                              <span className="text-black font-semibold">
                                Order ID:
                              </span>{" "}
                              {order.name}
                            </p>
                            <p>
                              <span className="text-black font-semibold">
                                Order Total:
                              </span>{" "}
                              GHS{order.total}
                            </p>
                            <p>
                              <span className="text-black font-semibold">
                                Current Status:
                              </span>{" "}
                              {currentStat}
                            </p>
                            <p>
                              <span className="text-black font-semibold">
                                Date ordered:
                              </span>{" "}
                              {formattedDate}
                            </p>
                          </div>
                          {/* </TableCell> */}
                          {/* </form> */}
                          {/* </TableRow> */}
                        </Link>
                      );
                    })}
                  </TableBody>
                </Table>
              </>
            )}
          </TabsContent>
          <TabsContent value="approves">
            {sortedApproves.length === 0 ? (
              <NoOrders text="No Approved Requests" />
            ) : (
              <>
                <p className="pl-4 my-3 w-[90%] mx-auto sm:w-3/4 text-lg font-semibold capitazlize">
                  ({sortedApproves.length}){" "}
                  {sortedApproves.length > 1
                    ? "Approved Requests"
                    : "Approved Request"}
                </p>
                <Table className="w-full ">
                  <TableBody className="w-full flex flex-col gap-4">
                    {sortedApproves.map((order) => {
                      let currentStat =
                        order.isCancelled && order.isDelivered
                          ? "returned"
                          : "cancelled";

                      let dateObj = new Date(order._createdAt);
                      let normalDate = dateObj.toLocaleDateString();
                      const parsedDateTime = DateTime.fromISO(order._createdAt);
                      const formattedDate = parsedDateTime.toFormat(
                        "yyyy.MM.dd 'at' HH:mm a"
                      );
                      return (
                        <Link
                          key={order.name}
                          href={`/admin-dashboard/orders/${order._id}`}
                          className="w-[90%] relative mx-auto p-3 rounded-lg sm:w-3/4  dark:bg-blue-400 hover:opacity-80  bg-blue-100"
                        >
                          <p className="absolute flex items-center text-2xl top-3 right-3">
                            {order.currentStat === "approve-return" ||
                            order.currentStat === "approve-cancel"
                              ? "👍"
                              : order.currentStat === "decline-return" ||
                                order.currentStat === "decline-cancel"
                              ? "👎"
                              : "❗"}
                            <Undo2 className="h-16 w16 text-blue-500  dark:text-blue-200" />
                          </p>
                          {/* <TableRow className="w-full"> */}
                          {/* <form onSubmit={handleUpdate}> */}{" "}
                          {/* <TableCell classname="text-lg w-full"> */}
                          {/* <Image/> */}
                          <p>
                            <span className="text-black font-semibold">
                              Order ID:
                            </span>{" "}
                            {order.name}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Order Total:
                            </span>{" "}
                            GHS{order.total}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Current Status:
                            </span>{" "}
                            {currentStat}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Date ordered:
                            </span>{" "}
                            {formattedDate}
                          </p>
                          {/* </TableCell> */}
                          {/* </form> */}
                          {/* </TableRow> */}
                        </Link>
                      );
                    })}
                  </TableBody>
                </Table>
              </>
            )}
          </TabsContent>
          <TabsContent value="declines">
            {sortedDeclines.length === 0 ? (
              <NoOrders text="No Declined Requests" />
            ) : (
              <>
                <p className="pl-4 my-3 w-[90%] mx-auto sm:w-3/4 text-lg font-semibold capitazlize">
                  ({sortedDeclines.length}){" "}
                  {sortedDeclines.length > 1
                    ? "Declined Requests"
                    : "Declined Request"}
                </p>
                <Table className="w-full ">
                  <TableBody className="w-full flex flex-col gap-4">
                    {sortedDeclines.map((order) => {
                      let currentStat =
                        order.isCancelled && order.isDelivered
                          ? "returned"
                          : "cancelled";
                      let dateObj = new Date(order._createdAt);
                      let normalDate = dateObj.toLocaleDateString();
                      const parsedDateTime = DateTime.fromISO(order._createdAt);
                      const formattedDate = parsedDateTime.toFormat(
                        "yyyy.MM.dd 'at' HH:mm a"
                      );
                      return (
                        <Link
                          key={order.name}
                          href={`/admin-dashboard/orders/${order._id}`}
                          className="w-[90%] relative mx-auto p-3 rounded-lg sm:w-3/4  dark:bg-blue-400 hover:opacity-80  bg-blue-100"
                        >
                          <p className="absolute flex items-center text-2xl top-3 right-3">
                            {order.currentStat === "approve-return"
                              ? "👍"
                              : order.currentStat === "decline-return"
                              ? "👎"
                              : "❗"}
                            <Undo2 className="h-16 w16 text-blue-500  dark:text-blue-200" />
                          </p>
                          {/* <TableRow className="w-full"> */}
                          {/* <form onSubmit={handleUpdate}> */}{" "}
                          {/* <TableCell classname="text-lg w-full"> */}
                          {/* <Image/> */}
                          <p>
                            <span className="text-black font-semibold">
                              Order ID:
                            </span>{" "}
                            {order.name}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Order Total:
                            </span>{" "}
                            GHS{order.total}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Current Status:
                            </span>{" "}
                            {currentStat}
                          </p>
                          <p>
                            <span className="text-black font-semibold">
                              Date ordered:
                            </span>{" "}
                            {formattedDate}
                          </p>
                          {/* </TableCell> */}
                          {/* </form> */}
                          {/* </TableRow> */}
                        </Link>
                      );
                    })}
                  </TableBody>
                </Table>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminTabs;
