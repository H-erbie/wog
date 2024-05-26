"use client";

import React, { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { lowerCase } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
const YouMayAlsoLike = ({ products, category, productId }) => {
  const newProducts = lowerCase(products);

  let filteredProducts = newProducts.filter(
    (product) =>
      product?.categories?.includes(category) && product._id !== productId
  );
if(filteredProducts.length === 0) return
  return (
    <>
          <h2 className="text-2xl font-bold capitalize text-center mb-6">You may also like</h2> 

      <div className="container dark:border-zinc-600 h-48 border border-gray-200   rounded-lg my-3 py-2 px-0">

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full relative"
        >
          {" "}
          <CarouselPrevious className="absolute border-gray-500 dark:border-none bg-white hover:bg-gray-300 transition-all dark:hover:bg-gray-800 cursor-pointer border-[0.05] dark:bg-[#3f434a]  rounded-[100%] left-5 z-10  py-2 px-2 top-1/2" />
          <CarouselContent className="border-none ">
            {filteredProducts.splice(0, 12).map((product) => (
              <Suspense
                fallback={
                  <div className="h-24 w-24 bg-gray-400 animate-pulse rounded-lg"></div>
                }
                key={product._id}
              >
                <CarouselItem className="lg:basis-1/6 md:basis-1/5 sm:basis-1/4 basis-1/3 w-full transition-all hover:brighness-50 px-3 border-none  border">
                  <Link href={`/products/${product.slug.current}`}>
                    <div
                      className={`flex relative gap-2 flex-col  w-full items-center justify-center`}
                    >
                      <Image
                        src={urlForImage(product.images[0]).url()}
                        alt={product.name}
                        width={96}
                        height={96}
                        className={`block bg-white dark:bg-zinc-600 rounded-lg h-24 w-24 sm:h-28 sm:w-28 object-cover `}
                      />

                      <p className="text-sm text-center  sm:text-base">
                        {product.name}
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              </Suspense>
            ))}
          </CarouselContent>
          <CarouselNext className="absolute border-gray-500 dark:border-none bg-white hover:bg-gray-300 transition-all dark:hover:bg-gray-800 cursor-pointer border-[0.05] dark:bg-[#3f434a]  rounded-[100%] right-5 z-10 py-2 px-2 top-1/2" />
        </Carousel>{" "}
      </div>
    </>
  );
};

export default YouMayAlsoLike;
