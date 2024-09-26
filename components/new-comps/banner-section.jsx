"use client";
import Link from "next/link";
import React from "react";
import banner1 from "@/public/home1.jpg";
import banner2 from "@/public/home2.jpg";
import Image from "next/image";
import { Reveal } from "./reveal";
import { PaystackButton } from "react-paystack";

const BannerSection = () => {
  // const data = sessionStorage.getItem("wog-user");
  // const isUserDataStored = data && JSON.parse(data);

  const apiKey = process.env.PAYSTACK_API_KEY;

  const publicKey = apiKey;

  const amount = Math.round(100) * 100;

  const email =  "email@gmail.com";

  const name = "name";
  const phone = "+233123456789";
  const currency = "GHS";

  const componentProps = {
    email,

    amount,
    currency,

    metadata: {
      name,

      phone,
    },

    publicKey,

    text: "Donate",

    onSuccess: () => {
      // revalidateTag("orders");
    },

    onClose: () => {
      alert("Why leave now?");
    },
  };

  return (
    <div className="h-max gap-y-6 pb-5 py-8 flex-col-reverse  lg:flex-row flex justify-evenly items-center ">
      <div className="w-full flex flex-col justify-center lg:w-1/2">
        <h2 className="sm:text-4xl del text-3xl text-center lg:text-left lg:text-[3rem] lg:ml-16 font-bold">
          <span className="del text-[#EE0505]"> Save Life,</span> Inspire Life
        </h2>
        <h2 className="sm:text-4xl del text-3xl  text-center lg:text-left my-3 sm:my-6 lg:text-[3rem] lg:ml-16 font-bold">
          Transforming <span className="del text-[#EE0505]"> Lives</span>.
        </h2>
        <h3 className="lg:w-3/4  mb-6 mt-2 sm:mx-0 lg:text-left text-center w-3/4 mx-auto  sm:w-full lg:mx-auto">
          Want to help us help bring up the future builders of our communities?
        </h3>
        {/* <Link href='/donate'  className="hover:scale-[1.1]" >donate</Link> */}
       
          <PaystackButton
            {...componentProps}
            className="lg:ml-20 cursor-pointer mx-auto rounded px-3 w-max text-white  hover:scale-[1.1] py-2 transition-all bg-[#F53D3D]"
          />
      </div>
      <div className="flex relative w-max items-center justify-center  lg:w-max ml-0 lg:ml-52">
        <div className="p-3 rounded-[100%] -left-10 sm:-left-32 absolute bg-[#F4EBEB]">
          <div className=" w-60 h-60 sm:w-72 w-60   rounded-[100%] overflow-hidden">
            <Image
              src={banner1}
              className=" w-full bg-red-200 h-full  object-cover"
              alt="home-image-2"
            />
          </div>
        </div>
        <div className=" w-[22rem] sm:w-96  h-[21rem] rounded-[100%] overflow-hidden">
          <Image
            src={banner2}
            className=" w-full h-full bg-red-200 object-cover"
            alt="home-image-1"
          />
        </div>{" "}
      </div>
    </div>
  );
};

export default BannerSection;
