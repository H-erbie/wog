"use client";

import React, { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { lowerCaseHome } from "@/lib/utils";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import "swiper/css/scrollbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
const Cardcategories = ({ products, category }) => {
  const newProducts = lowerCaseHome(products);

  let filterdProducts = newProducts.filter((product) =>
    product.homepageCategories?.includes(category)
  );

  const sortedProducts = filterdProducts.slice().sort((a, b) => {
    return new Date(b._updatedAt) - new Date(a._updatedAt);
  });

  const rates = [1, 2, 3, 4, 5];
  return (
    <div className="container h-max sm:h-max border-[0.01px] dark:border-zinc-700 border-gray-200 rounded-lg my-3 py-2 px-0">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full relative"
      >
        {" "}
        <CarouselPrevious className="absolute border-gray-200 dark:border-none bg-white hover:bg-gray-300 transition-all dark:hover:bg-gray-800 cursor-pointer border-[0.05] dark:bg-[#3f434a]  rounded-[100%] left-5 z-10  py-2 px-2 top-1/2" />
        <CarouselContent className="border-none ">
          {sortedProducts.splice(0, 12).map((product) => (
            <Suspense
              key={product._id}
              fallback={
                <div className="h-24 w-24 bg-gray-400 dark:bg-[#292e36]  animate-pulse rounded-lg"></div>
              }
            >
              <CarouselItem className="lg:basis-1/6 md:basis-1/5 sm:basis-1/4 basis-1/3 w-full transition-all px-3 border-none  border">
                <Link href={`/products/${product?.slug?.current}`}>
                  <div
                    className={`flex relative gap-2 flex-col hover:brightness-[.8]  w-full items-center justify-center`}
                  >
                    <Image
                      src={urlForImage(product?.images?.[0])}
                      alt={product.name}
                      width={96}
                      height={96}
                      className={`block bg-gray-100 dark:bg-[#292e36]  rounded-lg h-28 w-28 sm:h-28 sm:w-28 object-cover `}
                    />

                    <p className="text-sm text-center sm:text-base">
                      {product.name}
                    </p>
                    <div className="flex flex-col justify-evenly gap-y-2">
                      <span className="text-center">GHS {product.price.toFixed(2)}</span>
                      <span className="flex items-center gap-[2px] dark:text-pink-400 text-pink-500 w-max text-lg ">
                        <>
                          {" "}
                          {/* {rates.map(rate => {
                        product.ratesReviews && product.ratesReviews.map((ratesReview, ind) => {
                          const newIndex = ind + 1;
                        if (newIndex <= ratesReview.rate)
                          return <MdOutlineStarPurple500 />;
                        return <MdOutlineStarBorderPurple500 key={rate} />
                        });
                      })} */}
                        </>
                      </span>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            </Suspense>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute border-gray-200 dark:border-none bg-white hover:bg-gray-300 transition-all dark:hover:bg-gray-800 cursor-pointer border-[0.05] dark:bg-[#3f434a]  rounded-[100%] right-5 z-10 py-2 px-2 top-1/2" />
      </Carousel>
    </div>
  );
};

export default Cardcategories;
