'use client'
import Link from "next/link";
import React, {useState} from "react";
import statbg from "@/public/statbg.png";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetFooter,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Overlay from "./overlay";
import Image from "next/image";
import aim from '@/public/aim.jpg'
import banner1 from '@/public/home1.png'
import banner2 from '@/public/home2.png'
const Gallery = () => {
  const [overlay, setOverlay] = useState(false);

 const imgs =[
   statbg, aim, banner1, banner2,aim, banner1, banner2,aim, banner1, banner2,aim, banner1, banner2
 ]

  return (
    <div className="p-5">
      <h3 className="sm:text-4xl text-center del sm:text-left text-3xl mb-9 ml-6 font-bold">
        Gall<span className="text-[#F53D3D] del">ery</span>{" "}
      </h3>
<div className="sm:columns-2 md:columns-3 lg:columns-4">
{
          imgs.map((img, index) => (
            <Sheet                   key={index}
>
            <SheetTrigger asChild>
            <Image
                  src={
                    // urlForImage(siteInfo?.images)
                    img
                  }
                    sizes="responsive"
                  key={index}
                  width={180}
                  height={150}
                  alt="stat section background image"
                  className="w-[90%]  bg-red-200  cursor-pointer mx-3 my-3 lg:mx-0 rounded-3xl  object-cover"
                />
            </SheetTrigger>
            <SheetContent className="" side="bottom">
              <Overlay
                setOverlay={setOverlay}
                overlay={overlay}
                
                left={
                  <Image
                  src={
                    // urlForImage(siteInfo?.images)
                    img
                  }
                    sizes="responsive"
                  key={index}
                  width={180}
                  height={150}
                  alt="stat section background image"
                  className="w-full bg-red-200  mx-auto lg:mx-0 rounded-3xl  object-cover"
                />
                }
              />
            </SheetContent>
          </Sheet>
   
  ))
}
</div>
    </div>
  );
};

export default Gallery;
