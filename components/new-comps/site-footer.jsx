"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import logo from "@/public/wog-logo1.png";

import { siteConfig } from "@/config/site";

import { usePathname } from "next/navigation";

const SiteFooter = () => {
  const pathname = usePathname();
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/chats") ||
    pathname.startsWith("/admin-dashboard")
  )
    return null;

  
  return (
    <footer className=" bg-[#F53D3D] pt-28 sm:pt-36 pb-9 h-min-[75vh] relative ">
     {pathname === '/' ? <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute rotate-180 -top-1 left-0"
        viewBox="0 0 1440 320"
      >
        <path
          fill='#000'
          fillOpacity="1"
          d="M0,288L60,256C120,224,240,160,360,154.7C480,149,600,203,720,197.3C840,192,960,128,1080,117.3C1200,107,1320,149,1380,170.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg> : 
      <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute rotate-180 -top-1 left-0"
      viewBox="0 0 1440 320"
    >
      <path
        fill='#F4EBEB'
        fillOpacity="1"
        d="M0,288L60,256C120,224,240,160,360,154.7C480,149,600,203,720,197.3C840,192,960,128,1080,117.3C1200,107,1320,149,1380,170.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      ></path>
    </svg>
      }
      <div className="bg-white py-3 px-1 items-center justify-center flex w-max mx-auto rounded-[100%]">
      <Image
        src={
          // urlForImage(siteInfo?.images)
          logo
        }
        width={180}
        height={150}
        alt="LOGO"
        className="text-red-400 ml-3 rounded-[100%] w-40 mb-5"
      /></div>
      <p className='w-full my-3 text-center'>
<Link href="/" className="font-bold hover:underline  text-base">
                WILL OF GOD <span className="text-white "> FOUNDATION</span>
              </Link></p>
      <nav
        className="grid grid-cols-1 w-3/4 gap-3 mx-auto sm:grid-cols-2 md:grid-cols-3 "
        aria-label="Footer"
      >
        {siteConfig.footer.map((item) => (
          <div key={item.name} className="w-max ">
            <Link
              href={item.href}
              className="text-sm hover:underline text-white font-medium leading-6"
            >
              {item.name}
            </Link>
          </div>
        ))}
      </nav>

      <Link href="/" className="mt-5 block text-center text-base leading-5">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
        reserved.
      </Link>
      <p className="text-center font-bold mt-6">
        Made by{" "}
        <Link href="mailto:iamkorantengansongherbert@gmail.com">
          <span className="text-base text-white hover:underline text-start  ">
            Kojo Herbie
          </span>
        </Link>{" "}
      </p>
    </footer>
  );
};

export default SiteFooter;
