"use client";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  updateDoc,
  query,
  where,
  addDoc,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
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
import { DateTime } from "luxon";

import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";
import { Loader2, User2, Undo2, CarFront, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
import { LuHelpingHand } from "react-icons/lu";
import { PiHandCoinsLight } from "react-icons/pi";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";
import { FaRegHandshake } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import { FcProcess } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const AdminOrder = ({
  currentOrder,
  orderId,
  serviceId,
  emailApi,
  templateId,
}) => {
  const [user] = useAuthState(auth);

  const router = useRouter();
  const { toast } = useToast();
  const [order, setOrder] = useState(currentOrder);
  const [isConfirmed, setIsConfirmed] = useState(order.isConfirmed);
  const [isProcessing, setIsProcessing] = useState(order.isProcessing);
  const [isShipped, setIsShipped] = useState(order.isShipped);
  const [isDelivered, setIsDelivered] = useState(order.isDelivered);
  const [isCancelled, setIsCancelled] = useState(order.isCancelled);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [approve, setApprove] = useState(false);
  const [decline, setDecline] = useState(false);
  const [currentStat, setCurrentStat] = useState(order.currentStat);
  useEffect(() => {
    setOrder(currentOrder);
    router.refresh()
  }, [currentOrder]);
  const toggleBtn = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    if (toggle) {
      order.isConfirmed &&
      !order.isProcessing &&
      !order.isShipped &&
      !order.isDelivered
        ? setIsProcessing(true)
        : order.isConfirmed &&
          order.isProcessing &&
          !order.isShipped &&
          !order.isDelivered
        ? setIsShipped(true)
        : order.isConfirmed &&
          order.isProcessing &&
          order.isShipped &&
          !order.isDelivered
        ? setIsDelivered(true)
        : null;
    }
  }, [toggle, isShipped, isProcessing, isDelivered, isConfirmed, order]);
  const fname = order.purchaser.name.split(" ");
  const [drivers, setDrivers] = useState([]);
  const driversRef = collection(db, "drivers");
  const q = query(driversRef, where("available", "==", true));
  const getAdminUsers = async () => {
    const queryDriverSnapshot = await getDocs(q);
    const drives = [];

    queryDriverSnapshot.forEach((doc) => {
      drives.push(doc.data());
    });
    setDrivers(drives);
    return drives;
  };
  useEffect(() => {
    getAdminUsers();
  }, [driversRef]);

  const updateOrder = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/update-order", {
        method: "POST",
        body: JSON.stringify({
          isConfirmed,
          isProcessing,
          isShipped,
          isDelivered,
          isCancelled,
          id: order._id,
          driverName: drivers[0]?.name,
          driverContact: drivers[0]?.contact,
        }),
      });
      if (res) {
        setLoading(false);
        setToggle(false);
        const updatedOrder = {
          ...order,
          isConfirmed,
          isProcessing,
          isShipped,
          isDelivered,
          isCancelled,
          driverName: currentOrder.driverName,
          driverName: currentOrder.driverPhone,
        };
        setOrder(updatedOrder);
        toast({
          title: `${order.name} updated!`,
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        title: `${order.name} update failed!`,
        variant: "destructive",
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
    }
  };

  const approveReturn = async () => {
    try {
      setApprove(true);

      const res = await fetch("/api/update-order", {
        method: "POST",
        body: JSON.stringify({
          isConfirmed,
          isProcessing,
          isShipped,
          isDelivered,
          isCancelled,
          currentStat,
          id: order._id,
        }),
      });
      if (res) {
        setApprove(false);
        // setToggle(false);
        const updatedOrder = {
          ...order,
          isConfirmed,
          isProcessing,
          isShipped,
          isDelivered,
          isCancelled,
          currentStat,
        };
        setOrder(updatedOrder);
        toast({
          title: `Order ${order.name} return approved!`,
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setApprove(false);
      toast({
        title: `Return approval failed!`,
        variant: "destructive",
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
    }
  };
  const approveCancel = async () => {
    try {
      setApprove(true);
      // console.log(order.currentStat, currentStat);

      const res = await fetch("/api/update-order", {
        method: "POST",
        body: JSON.stringify({
          isConfirmed,
          isProcessing,
          isShipped,
          isDelivered,
          isCancelled,
          currentStat,
          id: order._id,
        }),
      });
      if (res) {
        // setToggle(false);
        const updatedOrder = {
          ...order,
          isConfirmed,
          isProcessing,
          isShipped,
          isDelivered,
          isCancelled,
          currentStat,
        };
        setOrder(updatedOrder);
        toast({
          title: `Order ${order.name} cancel approved!`,
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        // console.log(order.currentStat, currentStat);
        setApprove(false);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setApprove(false);
      toast({
        title: `Cancel approval failed!`,
        variant: "destructive",
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
    }
  };
  // console.log(!loading && (!order.isDelivered || !order.isCancelled));

  const declineReturn = async () => {
    try {
      setDecline(true);
      const res = await fetch("/api/update-order", {
        method: "POST",
        body: JSON.stringify({
          isConfirmed,
          isProcessing,
          isShipped,
          isDelivered,
          isCancelled,
          currentStat,
          id: order._id,
        }),
      });
      if (res) {
        setDecline(false);
        // setToggle(false);
        const updatedOrder = {
          ...order,
          isConfirmed,
          isProcessing,
          isShipped,
          isDelivered,
          isCancelled,
          currentStat,
        };
        setOrder(updatedOrder);
        toast({
          title: `Order ${order.name} return declined!`,
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setDecline(false);
      toast({
        title: `Return decline failed!`,
        variant: "destructive",
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
    }
  };
  const declineCancel = async () => {
    try {
      setDecline(true);

      const res = await fetch("/api/update-order", {
        method: "POST",
        body: JSON.stringify({
          isConfirmed,
          isProcessing,
          isShipped,
          isDelivered,
          isCancelled,
          currentStat,
          id: order._id,
        }),
      });
      if (res) {
        setDecline(false);
        // setToggle(false);
        const updatedOrder = {
          ...order,
          isConfirmed,
          isProcessing,
          isShipped,
          isDelivered,
          isCancelled,
          currentStat,
        };
        setOrder(updatedOrder);
        toast({
          title: `Order ${order.name} cancel declined!`,
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setDecline(false);
      toast({
        title: `Cancel decline failed!`,
        variant: "destructive",
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
    }
  };
  useEffect(() => {
    if (approve) {
      if (order.isCancelled && order.isDelivered) {
        setCurrentStat("approve-return");
      }
      if (order.isCancelled && !order.isDelivered) {
        setCurrentStat("approve-cancel");
      }
    }
    if (decline) {
      if (order.isCancelled && order.isDelivered) {
        setCurrentStat("decline-return");
      }
      if (order.isCancelled && !order.isDelivered) {
        setCurrentStat("decline-cancel");
      }
    }
  }, [approve, decline, currentStat, order]);
  // console.log(
  //   isConfirmed,
  //   isProcessing,
  //   isShipped,
  //   isDelivered,
  //   isCancelled,
  //   order.currentStat,
  //   currentStat
  // );
  useEffect(() => {
    setOrder(currentOrder);
  }, [currentOrder]);
  const parsedDateTime = DateTime.fromISO(order._createdAt);
  const formattedDate = parsedDateTime.toFormat("yyyy.MM.dd 'at' HH:mm a");
  const devDateTime = DateTime.fromISO(order._updatedAt);
  const formatDev = devDateTime.toFormat("yyyy.MM.dd 'at' HH:mm a");
  // console.log(isProcessing && drivers.length === 0);
  useEffect(()=>{
    router.refresh()
  }, [])
  return (
    <div className="flex flex-col-reverse pb-28 lg:flex-row">
      <div className="flex flex-col mt-10 gap-y-10 sm:gap-y-0 lg:w-[60%] my-4">
        {/* </div> */}
        <div className="w-full flex justify-center flex-wrap gap-8  my-5  mx-auto relative">
          {order.orderProducts &&
            order.orderProducts.map((orderItem) => {
              let dateObj = new Date(order._createdAt);
              let normalDate = dateObj.toLocaleDateString();

              return (
                <>
                  {" "}
                  <div
                    className="flex gap-x-2 w-full sm:w-max justify-evenly sm:justify-normal items-center"
                    key={orderItem.name}
                  >
                    <Image
                      src={urlForImage(orderItem?.image)}
                      width={200}
                      height={200}
                      alt={order.name}
                      className="bg-gray-300 object-cover rounded-lg h-[180px] w-[200px]"
                    />
                    <div className="h-full flex flex-col justify-evenly gap-x-2 w-max">
                      <p className="flex flex-col w-max">
                        <span className="font-semibold">Order ID:</span>{" "}
                        <span> {orderItem.name}</span>
                      </p>
                      <p className="flex flex-col w-max">
                        <span className="font-semibold">Order Price:</span>{" "}
                        <span>{orderItem.price}</span>
                      </p>
                      <p className="flex flex-col w-max">
                        <span className="font-semibold">Quantity:</span>{" "}
                        <span>
                          {orderItem.quantity}{" "}
                          {orderItem.quantity > 0 ? "items" : "item"}
                        </span>
                      </p>
                    </div>
                  </div>
                </>
              );
            })}{" "}
        </div>
        <div className="mx-auto flex sm:flex-row flex-col mt-4 gap-x-5 items-center w-[80%] sm:w-max">
          <div className="rounded-[100%] w-max mx-auto bg-gray-200 dark:bg-zinc-600 p-4">
            <User2 className="h-24 w-24 mx-auto" />
          </div>
          <div className="w-full">
            <p className="flex flex-col sm:flex-row">
              {" "}
              <span className="font-semibold">
                {" "}
                Purchaser&apos;s User ID:
              </span>{" "}
              {order.purchaser && order.purchaser.id}
            </p>
            <p className="flex flex-col sm:flex-row">
              {" "}
              <span className="font-semibold">Purchaser&apos;s Name: </span>
              {order.purchaser && order.purchaser.name}
            </p>
            <p className="flex flex-col sm:flex-row">
              {" "}
              <span className="font-semibold">
                Purchaser&apos;s Contact:
              </span>{" "}
              {order.purchaser && order.purchaser.phone}
            </p>
            <p className="flex flex-col sm:flex-row">
              <span className="font-semibold">Purchaser&apos;s Email:</span>{" "}
              {order.purchaser && order.purchaser.email}
            </p>
            <p className="flex flex-col sm:flex-row">
              <span className="font-semibold">Shipping Address:</span>{" "}
              {order.shippingAddress}
            </p>
            <p className="flex flex-col w-max">
              <span className="font-semibold">Order date/time:</span>{" "}
              <span>{formattedDate}</span>
            </p>
            {order.isDelivered && (
              <p className="flex flex-col w-max">
                <span className="font-semibold">Delivery date/time:</span>{" "}
                <span>{formatDev}</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="lg:w-[40%] w-full h-max lg:sticky mt-10 lg:mt-0 top-0 right-3 mx-auto">
        <div className="flex gap-x-8 w-3/4 mx-auto mt-8 sm:px-0 items-center justify-evenly ">
          {" "}
          <div className="flex items-center flex-col">
            {order.isConfirmed && (
              <>
                {" "}
                <p className="text-center lg:text-lg text-sm md:text-base">
                  {order.isConfirmed ? "✅" : "❌"}
                </p>{" "}
              </>
            )}
            {order.isConfirmed && (
              <>
                {" "}
                <div className="h-32 sm:h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>{" "}
                <p className="text-center lg:text-lg text-sm md:text-base">
                  {order.isConfirmed ? "✅" : "❌"}
                </p>{" "}
              </>
            )}
            {order.isProcessing && (
              <>
                {" "}
                <div className="h-32 sm:h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>
                <p className="text-center text-lg">
                  {order.isProcessing ? "✅" : "❌"}
                </p>{" "}
              </>
            )}
            {order.isShipped && (
              <>
                {" "}
                <div className="h-32 sm:h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>{" "}
                <p className="text-center text-lg">
                  {order.isShipped ? "✅" : "❌"}
                </p>
              </>
            )}
            {order.isDelivered && (
              <>
                {" "}
                <div className="h-32 sm:h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>
                <p className="text-center text-lg">
                  {order.isDelivered ? "✅" : "❌"}
                </p>
              </>
            )}
            {order.isDelivered && order.isCancelled && (
              <>
                {" "}
                <div className="h-32 sm:h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>
                <p className="text-center text-lg">
                  {order.isDelivered && order.isCancelled ? "✅" : "❌"}
                </p>
              </>
            )}
            {!order.isDelivered && order.isCancelled && (
              <>
                {" "}
                <div className="h-32 sm:h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>
                <p className="text-center text-lg">
                  {!order.isDelivered && order.isCancelled ? "✅" : "❌"}
                </p>
              </>
            )}

            {order.isDelivered && order.isCancelled && order.currentStat && (
              <>
                {" "}
                <div className="h-32 sm:h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>
                <p className="text-center text-lg">
                  {order.isDelivered &&
                  order.isCancelled &&
                  order.currentStat === "approve-return"
                    ? "✅"
                    : order.currentStat === "decline-return"
                    ? "✅"
                    : "❌"}
                </p>
              </>
            )}
            {!order.isDelivered &&
              order.isCancelled &&
              (order.currentStat === "approve-cancel" ||
                order.currentStat === "decline-cancel") && (
                <>
                  {" "}
                  <div className="h-32 sm:h-20 w-1 border-gray-400 dark:border-zinc-600 border-l-4 border-dotted"></div>
                  <p className="text-center text-lg">
                    {!order.isDelivered &&
                    order.isCancelled &&
                    order.currentStat === "approve-cancel"
                      ? "✅"
                      : order.currentStat === "decline-cancel"
                      ? "✅"
                      : "❌"}
                  </p>
                </>
              )}
          </div>
          <div className="flex flex-col gap-y-[3.5rem]">
            {order.isConfirmed && (
              <>
                <div className="flex flex-col sm:flex-row gap-x-2 items-center">
                  <LuHelpingHand className="text-4xl" />
                  <div className="flex flex-col gap-y-2">
                    <p className="capitalize font-bold">order confirmed</p>
                    <p className="text-sm text-gray-400 dark:text-zinc-400">
                      You have recieved the order
                    </p>
                  </div>
                </div>
              </>
            )}
            {order.isConfirmed && (
              <div className="flex flex-col sm:flex-row gap-x-2 items-center">
                <PiHandCoinsLight className="text-4xl" />
                <div className="flex flex-col gap-y-2">
                  <p className="capitalize font-bold">payment confirmed</p>
                  <p className="text-sm text-gray-400 dark:text-zinc-400">
                    You have recieved the payment
                  </p>
                </div>
              </div>
            )}
            {order.isProcessing && (
              <div className="flex flex-col sm:flex-row gap-x-2 items-center">
                <FcProcess className="text-4xl" />
                <div className="flex flex-col gap-y-2">
                  <p className="capitalize font-bold">order processed</p>
                  <p className="text-sm text-gray-400 dark:text-zinc-400">
                    You are preparing the order
                  </p>
                </div>
              </div>
            )}{" "}
            {order.isShipped && (
              <div className="flex flex-col sm:flex-row gap-x-2 items-center">
                <GrDeliver className="text-4xl" />
                <div className="flex flex-col gap-y-2">
                  <p className="capitalize font-bold">order shipped</p>
                  <p className="text-sm text-gray-400 dark:text-zinc-400">
                    Your have shipped the order
                  </p>
                </div>
              </div>
            )}{" "}
            {order.isDelivered && (
              <div className="flex flex-col sm:flex-row gap-x-2 items-center">
                <FaRegHandshake className="text-4xl" />
                <div className="flex flex-col gap-y-2">
                  <p className="capitalize font-bold">order delivered</p>
                  <p className="text-sm text-gray-400 dark:text-zinc-400">
                    You have delivered the order
                  </p>
                </div>
              </div>
            )}
            {order.isDelivered && order.isCancelled && (
              <div className="flex flex-col sm:flex-row gap-x-2 items-center">
                <Undo2 className="text-4xl" />
                <div className="flex flex-col gap-y-2">
                  <p className="capitalize font-bold">
                    Retrun request received
                  </p>
                  <p className="text-sm text-gray-400 dark:text-zinc-400">
                    Received return request
                  </p>
                </div>
              </div>
            )}
            {!order.isDelivered && order.isCancelled && (
              <div className="flex flex-col sm:flex-row gap-x-2 items-center">
                <Undo2 className="text-4xl" />
                <div className="flex flex-col gap-y-2">
                  <p className="capitalize font-bold">
                    Cancel request received
                  </p>
                  <p className="text-sm text-gray-400 dark:text-zinc-400">
                    Received cancel request
                  </p>
                </div>
              </div>
            )}
            {order.isDelivered && order.isCancelled && order.currentStat && (
              <div className="flex flex-col sm:flex-row gap-x-2 items-center">
                <div className="text-3xl flex sm:flex-col items-center flex-row">
                  {" "}
                  <Undo2 className="text-4xl" />{" "}
                  {currentStat === "approve-return" ? "👍" : "👎"}
                </div>
                <div className="flex flex-col gap-y-2">
                  <p className="capitalize font-bold">Return Request update</p>
                  <p className="text-sm text-gray-400 dark:text-zinc-400">
                    {order.currentStat === "approve-return"
                      ? "Order return approved"
                      : "Order return decline"}
                  </p>
                </div>
              </div>
            )}
            {!order.isDelivered &&
              order.isCancelled &&
              (order.currentStat === "approve-cancel" ||
                order.currentStat === "decline-cancel") && (
                <div className="flex flex-col sm:flex-row gap-x-2 items-center">
                  <div className="text-3xl flex sm:flex-col items-center flex-row">
                    {" "}
                    <X className="text-4xl" />{" "}
                    {currentStat === "approve-cancel" ? "👍" : "👎"}
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="capitalize font-bold">
                      Cancel Request update
                    </p>
                    <p className="text-sm text-gray-400 dark:text-zinc-400">
                      {order.currentStat === "approve-cancel"
                        ? "Order cancel approved"
                        : "Order cancel decline"}
                    </p>
                  </div>
                </div>
              )}
          </div>
        </div>
        {order.isProcessing && !order.driverName && drivers.length > 0 ? (
          <div className="flex relative w-[90%] sm:w-max dark:bg-[#3c3d3f] bg-gray-200 p-3 mx-auto rounded-lg gap-y-2  my-3 items-center  gap-x-3">
            <div
              className={`rounded-[100%] absolute top-0 right-0 p-1 ${
                drivers[0]?.available ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <CarFront />
            <div className="flex-col flex sm:items-center">
              <span className="break-words ">{drivers[0].name} </span>
              <span>{drivers[0]?.contact}</span>
            </div>
          </div>
        ) : order.isProcessing && order.driverName ? (
          <div className="flex relative w-[90%] sm:w-max dark:bg-[#3c3d3f] bg-gray-200 p-3 mx-auto rounded-lg gap-y-2  my-3 items-center  gap-x-3">
            <div
              className={`rounded-[100%] absolute top-0 right-0 p-1 ${
                drivers[0]?.available ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <CarFront />
            <div className="flex-col flex sm:items-center">
              <span className="break-words ">{drivers[0]?.name} </span>
              <span>{drivers[0]?.contact}</span>
            </div>
          </div>
        ) : order.isProcessing && !order.driverName && drivers.length === 0 ? (
          <p className="text-center mt-3">No driver is available at the moment</p>
        ) : (
          ""
        )}
        {!order.isCancelled && !order.isDelivered && (
          <div className="flex items-center gap-x-3 justify-center my-8">
            {!loading && !order.isDelivered && !order.isCancelled && (
              <div className="flex gap-x-3">
                <span>
                  {!order.isProcessing
                    ? "Update to Processing"
                    : !order.isShipped
                    ? "Update to Shipped"
                    : "Update to Delivered"}
                </span>

                {!toggle ? (
                  <FaToggleOff
                    className="text-3xl cursor-pointer"
                    onClick={() => setToggle(!toggle)}
                  />
                ) : (
                  <FaToggleOn
                    className="text-3xl cursor-pointer"
                    onClick={toggleBtn}
                  />
                )}
              </div>
            )}
            <Button
              onClick={updateOrder}
              type="submit"
              variant="outline"
              disabled={
                loading || !toggle || order.isProcessing && drivers.length === 0
              }
              className=""
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> updating
                  order...
                </>
              ) : (
                "update order"
              )}
            </Button>
          </div>
        )}
        {!order.isDelivered &&
          order.isCancelled &&
          order.currentStat === "cancel-request" && (
            <div className="flex gap-x-3 justify-center mt-6">
              {" "}
              {!decline && (
                <Button
                  onClick={approveCancel}
                  type="submit"
                  variant="outline"
                  disabled={approve}
                  className=""
                >
                  {approve ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      approving cancel...
                    </>
                  ) : (
                    "approve cancel👍"
                  )}
                </Button>
              )}
              {!approve && (
                <Button
                  onClick={declineCancel}
                  type="submit"
                  variant="outline"
                  disabled={decline}
                  className=""
                >
                  {decline ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      declining cancel...
                    </>
                  ) : (
                    "decline cancel👎"
                  )}
                </Button>
              )}
            </div>
          )}
        {order.isDelivered &&
          order.isCancelled &&
          order.currentStat === "return-request" && (
            <div className="flex gap-x-3 justify-center mt-6">
              {" "}
              {!decline && (
                <Button
                  onClick={approveReturn}
                  type="submit"
                  variant="outline"
                  disabled={approve}
                  className=""
                >
                  {approve ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      approving return...
                    </>
                  ) : (
                    "approve return👍"
                  )}
                </Button>
              )}
              {!approve && (
                <Button
                  onClick={declineReturn}
                  type="submit"
                  variant="outline"
                  disabled={decline}
                  className=""
                >
                  {decline ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      declining return...
                    </>
                  ) : (
                    "decline return👎"
                  )}
                </Button>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default AdminOrder;
