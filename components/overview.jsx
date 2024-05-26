"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import {useRouter} from 'next/navigation'
import { doc, getDocs, query, collection, NOT_IN, where  } from "firebase/firestore";
import { getMonth,isSameDay , getWeek, startOfWeek, endOfWeek } from "date-fns";
const Overview = ({ orders, products }) => {
  const [prods, setProds] = useState(products)
  const router = useRouter()
  useEffect(()=>{
    router.refresh()
    setProds(products)
  },[])
  const activeOrders = orders.filter(
    (order) => !order.isDelivered && !order.isCancelled
  );
  const deliveries = orders.filter(
    (order) => order.isDelivered && !order.isCancelled
  );
  const returns = orders.filter(
    (order) =>
      order.isDelivered &&
      order.isCancelled &&
      order.currentStat === "approve-return"
  );
  

  // Function to calculate total gain for a given delivery array
  const calculateTotalGain = (deliveryArray) => {
    if (deliveryArray.length === 0) {
      return 0; // No deliveries, return 0
    }

    return deliveryArray.reduce((acc, item) => {
      return acc + item.orderProducts.reduce((acc2, product) => {
        const price = Number(product.price) || 0; // Handle missing or invalid price
        return acc2 + price;
      }, 0);
    }, 0);
  };

  let totalGain = calculateTotalGain(deliveries);
  let totalGainMonth = calculateTotalGain(
    deliveries.filter((delivery) => {
      const deliveryMonth = getMonth(delivery._updatedAt);
      return deliveryMonth === getMonth(new Date()); // Filter for this month
    })
  );
  let totalGainWeek = calculateTotalGain(
    deliveries.filter((delivery) => {
      const deliveryWeek = getWeek(delivery._updatedAt);
      const currentWeek = getWeek(new Date());
      const currentWeekStart = startOfWeek(new Date());
      const currentWeekEnd = endOfWeek(new Date());
      return (
        deliveryWeek === currentWeek &&
        delivery >= currentWeekStart &&
        delivery <= currentWeekEnd
      );
    })
  );
  let totalGainToday = calculateTotalGain(
    deliveries.filter((delivery) => {
      const deliveryDate = delivery._updatedAt;
      return isSameDay(deliveryDate, new Date()); // Filter for today
    })
  );

  totalGain = totalGain.toFixed(2);
  totalGainMonth = totalGainMonth.toFixed(2);
  totalGainWeek = totalGainWeek.toFixed(2);
  totalGainToday = totalGainToday.toFixed(2);
  // console.log(totalGainWeek);
  const [users, setUsers] = useState(0);
  const usersCollectionRef = collection(db, "users");
  const q = query(usersCollectionRef);
  const getAllUsers = async () => {
    // Create a basic query for the collection

    const querySnapshot = await getDocs(q);
    const numberOfUsers = querySnapshot.size;
    // console.log(numberOfUsers)
    setUsers(numberOfUsers);
    return numberOfUsers;
  };

  useEffect(() => {
    getAllUsers();
  }, [q]);
  return (
    <div className="pb-16">
      <h1 className="text-3xl my-3 font-bold">Overview</h1>
      <div className="grid gap-3 py-4 place-items-center grid-cols-2 lg:grid-cols-3">
        <div className="p-3 h-[150px] flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52] rounded-xl w-3/4 shadow-md text-center">
          <p className="text-xl sm:text-3xl text-yellow-500 font-semibold">
            {activeOrders.length}
          </p>
          <p className="text-gray-400 dark:text-zinc-400">Active Orders</p>
        </div>
        <div className="p-3 w-3/4 h-[150px] flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52]  rounded-xl shadow-md text-center">
          <p className="text-xl sm:text-3xl text-yellow-500 font-semibold">
            {deliveries.length}
          </p>
          <p className="text-gray-400 dark:text-zinc-400">
            Successful Deliveries
          </p>
        </div>
        <div className="p-3 w-3/4 h-[150px] col-span-2 sm:col-auto flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52]  rounded-xl shadow-md text-center">
          <p className="text-xl sm:text-3xl text-yellow-500 font-semibold">
            {returns.length}
          </p>
          <p className="text-gray-400 dark:text-zinc-400">
            Returned Deliveries
          </p>
        </div>
        <div className="p-3 w-3/4 h-[150px] flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52]  rounded-xl shadow-md text-center">
          <p className="text-xl sm:text-3xl text-yellow-500 font-semibold">
            {orders.length}
          </p>
          <p className="text-gray-400 dark:text-zinc-400">All Orders</p>
        </div>
        <div className="p-3 w-3/4 h-[150px] flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52] rounded-xl shadow-md text-center">
          <p className="text-xl sm:text-3xl text-yellow-500  font-semibold">
            {users - 1}
          </p>
          <p className="text-gray-400 dark:text-zinc-400">Users so far</p>
        </div>
        <div className="p-3 w-3/4 h-[150px] col-span-2 sm:col-auto  flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52] rounded-xl shadow-md text-center">
          <p className="text-xl sm:text-3xl text-yellow-500  font-semibold">
            GHS {totalGainToday}
          </p>
          <p className="text-gray-400 dark:text-zinc-400">Total today</p>
        </div>
        <div className="p-3 h-[150px] flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52] rounded-xl w-3/4 shadow-md text-center">
          <p className="text-xl sm:text-3xl text-yellow-500  font-semibold">
            GHS {totalGainWeek}
          </p>
          <p className="text-gray-400 dark:text-zinc-400">Total this week</p>
        </div>
        <div className="p-3 w-3/4 h-[150px] flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52] rounded-xl shadow-md text-center">
          <p className="text-xl sm:text-3xl text-yellow-500  font-semibold">
            GHS {totalGainMonth}
          </p>
          <p className="text-gray-400  dark:text-zinc-400">Total this month</p>
        </div>
        
        <div className="p-3 w-3/4 h-[150px] col-span-2 sm:col-auto  flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52] rounded-xl shadow-md text-center">
          <p className="text-xl sm:text-3xl text-yellow-500  font-semibold">
            GHS {totalGain}
          </p>
          <p className="text-gray-400 dark:text-zinc-400">Total since launch</p>
        </div>
        <div className="p-3 w-3/4 h-[150px] flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52] rounded-xl shadow-md text-center">
          <p className="text-xl sm:text-3xl text-yellow-500  font-semibold">
             {products.length}
          </p>
          <p className="text-gray-400  dark:text-zinc-400">All products</p>
        </div>
        <div className="p-3 w-3/4 h-[150px] flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52] rounded-xl shadow-md text-center">
          <p className="text-xl sm:text-3xl text-yellow-500  font-semibold">
             {prods.length}
          </p>
          <p className="text-gray-400  dark:text-zinc-400">Andamo products</p>
        </div>
        <div className="p-3 w-3/4 h-[150px] col-span-2 sm:col-auto flex items-center flex-col justify-center dark:bg-[#3c3d3f] hover:bg-gray-50 cursor-default dark:hover:bg-[#4e4f52] rounded-xl shadow-md text-center">
          <p className="text-xl sm:text-3xl text-yellow-500  font-semibold">
             0
          </p>
          <p className="text-gray-400  dark:text-zinc-400">Andamo sellers&apos; products</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
