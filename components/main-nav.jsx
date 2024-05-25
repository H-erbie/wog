"use client";
import React from "react";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

const MainNav = ({ siteInfos }) => {
  return (
    <div className="flex gap-6 md:gap-10 ">
      {siteInfos.map((siteInfo) => (
        <Link
          href="/"
          key={siteInfo._id}
          className="flex  items-center justify-center space-x-2"
        >
          {/*LOGO*/}
          <Image
            src={urlForImage(siteInfo.images).url()}
            width={180}
            height={150}
            alt="LOGO"
            className="text-pink-400 min-w-[6rem] w-32 h-10"
          />
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
