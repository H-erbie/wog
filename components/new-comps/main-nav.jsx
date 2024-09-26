"use client";
import React from "react";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import logo from '@/public/wog-logo1.png'
const MainNav = ({ siteInfos }) => {
  return (
    <div className="flex gap-6 md:gap-10 ">
      {/* {siteInfos.map((siteInfo) => (
        <Link
          href="/"
          key={siteInfo._id}
          className="flex  items-center justify-center space-x-2"
        > */}
          {/*LOGO*/}
          <Image
            src={
              // urlForImage(siteInfo?.images)
              logo
            }
            width={180}
            height={150}
            alt="LOGO"
            className="text-red-400 min-w-[6rem] w-40 mb-5"
          />
        {/* </Link> */}
      {/* // ))} */}
    </div>
  );
};

export default MainNav;
