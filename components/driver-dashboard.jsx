"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import {
  Trash2,
  User2,
  Car,
  CarFront,
  ToggleLeft,
  ToggleRight,
  Pencil,
  Loader2,
  X,
} from "lucide-react";

import { slugify } from "@/sanity/lib/slugify"; // Assuming slugify function is in a separate file
// import NoOrders from "./no-orders";
import Image from "next/image";
import {
  setDoc,
  doc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { urlForImage } from "@/sanity/lib/image";
import { auth, db } from "@/firebase/config";
// import { Input } from "@/components/ui/input";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectLabel,
//   SelectGroup,
//   SelectValue,
// } from "@/components/ui/select";
import { useAuthState } from "react-firebase-hooks/auth";
import NoOrders from "./no-orders";

const DriverDashboard = ({ orders }) => {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const rides = orders.filter(
    (order) => order.isDelivered && order.driverName === user.displayName
  );
  const requests = orders.filter(
    (order) => !order.isDelivered && order.driverName === user.displayName
  );
  const [add, setAdd] = useState(false);
  const [adminInput, setAdminInput] = useState("");

  const [driver, setDriver] = useState(null);
  
  const isDriver = JSON.parse(sessionStorage.getItem("andamo-driver"));

  useEffect(() => {
    const getDriver = async () => {
      const driveRef = doc(db, "drivers", user && user?.uid);
      const driveSnap = await getDoc(driveRef);
      if (!driveSnap.data()?.name) {
        await updateDoc(driveSnap.ref, { name: user?.displayName });
      }
      setDriver(driveSnap.data());
    };
    getDriver();
  }, [driver]);

  const [avail, setAvail] = useState(false);
  const [availCurrent, setAvailCurrent] = useState(isDriver.available);

  const updateAvail = async (state) => {
    setAvail(true);
    console.log(state);
    try {
      const driveRef = doc(db, "drivers", user.uid);
      const driveSnap = await getDoc(driveRef);
      if (!driveSnap) {
        console.error("No driver found with id:", user.uid);
        setAvail(false);
        toast({
          title: `No driver with such id`,
          variant: "destructive",
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        return;
      }
      await updateDoc(driveSnap.ref, { available: state });
      setDriver(driveSnap.data());
      setAvail(false);
      isDriver.available = state;
      sessionStorage.setItem("andamo-driver", JSON.stringify(isDriver));

      // console.log("Admin status updated for user:", emailValue);
      toast({
        title: `Updated profile!`,
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
      // setAdminInput('')
    } catch (error) {
      setAvail(false);
      console.log(error);
      toast({
        title: `Update failed!`,
        variant: "destructive",
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
    }
  };
  // console.log(driver)
  return (
    <div>
      <Tabs defaultValue="profile">
        <TabsList classname="lg:text-lg mx-auto mt-4 text-sm md:text-base">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="rides">Rides</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <h1 className="text-xl w-max my-3 font-bold flex items-center gap-x-2 mx-auto">
            Profile
          </h1>
          <Car className="w-28 h-28 mx-auto" />
          {driver?.name && (
            <p className="text-center">
              {" "}
              <span className="font-semibold ">Driver Name:</span>{" "}
              {driver?.name}
            </p>
          )}
          <p className="text-center">
            {" "}
            <span className="font-semibold ">Email:</span> {isDriver?.email}
          </p>
          <p className="text-center">
            {" "}
            <span className="font-semibold ">Your Contact:</span>{" "}
            {isDriver?.contact}
          </p>
          <p className="text-center">
            {" "}
            <span className="font-semibold">Status:</span>{" "}
            {driver?.available ? "Available" : "Not available"}{" "}
          </p>
          <button
            onClick={() => updateAvail(driver?.available ? false : true)}
            disabled={avail}
            className=" flex sm:flex-col gap-x-2 sm:bg-gray-300 sm:dark:bg-zinc-600 p-2 sm:absolute top-32 right-5 gap-y-1 rounded-lg items-center justify-center mx-auto disabled:opacity-50 "
          >
            {avail ? (
              <Loader2 className="animate-spin" />
            ) : driver?.available ? (
              "Update to unavailable"
            ) : (
              "Update to available"
            )}
            {driver?.available ? (
              <ToggleRight className="w-10 h-10" />
            ) : (
              <ToggleLeft className="w-10 h-10" />
            )}
          </button>
          <p className=' italic'>By continuing to use the app as a driver, you agree to the <Link href='/driver-dashboard/driver-terms-and-conditions' className='underline'> terms and condtions</Link></p>

        </TabsContent>
        <TabsContent value="requests">
          <div className="flex flex-col gap-y-3">
            {requests.length === 0 ? (
              <NoOrders text="No Ride Request" />
            ) : (
              requests.map((ride, index) => (
                <div
                  key={index}
                  className="flex relative w-[90%] sm:w-3/4 dark:bg-[#3c3d3f] bg-gray-200 p-3 rounded-lg gap-y-2  my-3 items-center  gap-x-3"
                >
                  <CarFront />
                  <div className="flex-col flex ">
                    <span className=" ">
                      Purchaser Name: {ride.purchaser.name}{" "}
                    </span>
                    <span>Purchaser Contact: {ride.purchaser.phone}</span>
                    <span>Order ID: {ride.name}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="rides">
          <div className="flex flex-col gap-y-3">
            {rides.length === 0 ? (
              <NoOrders text="No Ride History" />
            ) : (
              rides.map((ride, index) => (
                <div
                  key={index}
                  className="flex relative w-[90%] sm:w-3/4 dark:bg-[#3c3d3f] bg-gray-200 p-3 rounded-lg gap-y-2  my-3 items-center  gap-x-3"
                >
                  <CarFront />
                  <div className="flex-col flex ">
                    <span className=" ">
                      Purchaser Name: {ride.purchaser.name}{" "}
                    </span>
                    <span>Purchaser Contact: {ride.purchaser.phone}</span>
                    <span>Order ID: {ride.name}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DriverDashboard;
