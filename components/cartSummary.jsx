"use client";
import React, { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/button";

// import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
// import { GlobalContext } from "./context";
// import { useSession } from "next-auth/react";
import { useGlobalContext } from "./context";
import { auth, db  } from "@/firebase/config";
import { Input } from "./ui/input";

import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const CartSummary = () => {
  // const { status } = useSession();
  const [user] = useAuthState(auth);


  const { setAddress } = useGlobalContext();
  const ad = localStorage.getItem("shipping-address")
  const ads = ad ? JSON.parse(ad).split(",") : null;

  const [town, setTown] = useState(ads ? ads[0] : "");
  const {
    formattedTotalPrice,
    totalPrice,
    cartDetails,
    cartCount,
    redirectToCheckout,
  } = useShoppingCart();
  const shippingAmount = cartCount > 0 ? 5 : 0;
  const totalAmount = totalPrice + shippingAmount;
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = isLoading || cartCount == 0;
  // console.log({ ...cartDetails, location: "Bono" });
  const [phone, setPhone] = useState(user ?  JSON.parse(sessionStorage.getItem("andamo-user")).phoneNumber : "");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = e.target[0].innerText;
    setAddress(`${town},${address}`);

    sessionStorage.setItem(
      "shipping-address",
      JSON.stringify(`${town},${address}`)
    );
    sessionStorage.setItem(
      "order-contact",
      JSON.stringify(phone)
    );
    router.replace("/cart/checkout");
  };
  // console.log(ads);
  const regions = [
    { name: "Ashanti", value: "Ashanti" },
    { name: "Brong Ahafo", value: "Brong Ahafo" },
    { name: "Bono East", value: "Bono East" },
    { name: "Ahafo", value: "Ahafo" },

    { name: "Central", value: "Central" },
    { name: "Eastern", value: "Eastern" },
    { name: "Greater Accra", value: "Greater Accra" },
    { name: "Norther", value: "Norther" },
    { name: "Upper East", value: "Upper East" },
    { name: "Upper West", value: "Upper West" },
    { name: "Volta", value: "Volta" },
    { name: "Western", value: "Western" },
    { name: "Savannah", value: "Savannah" },
    { name: "Oti", value: "Oti" },
    { name: "Western North", value: "Western North" },
    { name: "North East", value: "North East" },
  ];
 

  return (
    <>
      <form
        onSubmit={handleSubmit}
        aria-labelledby="summary-heading"
        className="mt-16 rounded-lg md:w-3/4 w-full "
      >
        {/* <div className="mb-8"> */}
        <h3 className="font-semibold text-lg ">Shipping Address</h3>
        <Select required  >
          <SelectTrigger className="w-full mt-4 lg:mx-0 dark:border-zinc-600">
            <SelectValue placeholder="choose a region" />
          </SelectTrigger>
          <SelectContent className="focus:outline-none bg-background dark:bg-[#292e36] dark:border-zinc-600 border-black ">
            <SelectGroup className="grid grid-cols-2">
              {regions.map((region) => (
                <SelectItem
                  value={region.value}
                  key={region.name}
                  className="dark:hover:bg-[#191c22]"
                >
                  {region.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
     
        <Input
          id="town"
          name="town"
          required
          type="text"
          autoComplete="off"
          // defaultValue={defaultSearchQuery}
          placeholder="Enter Town/City"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          className="h-9 dark:border-zinc-600 my-5 focus:outline-yellow-200 dark:focus:outline-yellow-300"
          //   defaultValue={defaultSearchQuery}
        />
          
          <Input
          id="phone"
          name="phone"
          required
          type="text"
          autoComplete="off"
          // defaultValue={defaultSearchQuery}
          placeholder="Your contact"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-9 dark:border-zinc-600 my-5 focus:outline-yellow-200 dark:focus:outline-yellow-300"
          //   defaultValue={defaultSearchQuery}
        />
        {/* </div> */}

        <h2 id="summary-heading" className="text-lg font-medium">
          Order summary
        </h2>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm">Subtotal</dt>
            <dd className="text-sm font-medium">GHS {totalPrice.toFixed(2)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
            <dt className="flex items-center text-sm">
              <span>Delivery fee</span>
            </dt>
            <dd className="text-sm font-medium">
              GHS {shippingAmount.toFixed(2)}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
            <dt className="text-base font-medium">Order total</dt>
            <dd className="text-base font-medium">
              GHS {totalAmount.toFixed(2)}
            </dd>
          </div>
        </div>
        <Button
          type="submit"
          variant="ghost"
          className="mt-4 bg-yellow-600 hover:bg-yellow-500 hover:text-white text-white text-lg w-full"
        >
          checkout
        </Button>
      </form>
    </>
  );
};

export default CartSummary;
