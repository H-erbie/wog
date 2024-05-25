"use client";

import React, { Suspense } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/effect-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import HeroImages from "./heroImages";
import { revalidateHeros } from "@/lib/actions";

export default function Hero({ heros }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  // console.log(heros)
  return (
    <>
      {/* <HeroImages/>  */}
      <div className="container w-full rounded-lg mt-16 sm:mt-12 sm:p-6 p-0">
        {/* <button onClick={revalidateHeros}>revalidate</button> */}
        <Carousel
          plugins={[plugin.current]}
          // onMouseEnter={plugin.current.stop}
          // onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
          }}
          className="w-full relative rounded-3xl"
        >
          {" "}
          <CarouselPrevious className="absolute  border-gray-500 dark:border-none bg-white hover:bg-gray-300 transition-all dark:hover:bg-gray-800 cursor-pointer border-[0.05] dark:bg-[#3f434a]  rounded-[100%] left-5 z-10  py-2 px-2 top-1/2" />
          <CarouselContent className="border-none rounded-3xl">
            {" "}
            {heros.map((img) => (
              <CarouselItem
                key={img._id}
                className=" w-full rounded-3xl transition-all  border-none  border"
              >
                {" "}
                <div
                  className={`flex relative  h-96 w-full items-center justify-center`}
                >
                  <Suspense
                    fallback={
                      <div className="bg-gray-300 dark:bg-gray-400 animate-pulse h-96 w-full rounded-lg"></div>
                    }
                  >
                    <HeroImages img={img} />
                  </Suspense>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="absolute border-gray-500 dark:border-none bg-white hover:bg-gray-300 transition-all dark:hover:bg-gray-800 cursor-pointer border-[0.05] dark:bg-[#3f434a]  rounded-[100%] right-5 z-10 py-2 px-2 top-1/2" />
        </Carousel>
      </div>
    </>
  );
}
