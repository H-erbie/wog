"use client";
import Link from "next/link";
import React, { useState } from "react";
import statbg from "@/public/e1.jpg";
import e2 from "@/public/e2.jpg";
import e3 from "@/public/e3.jpg";
import e4 from "@/public/e4.jpg";
import e5 from "@/public/e5.jpg";
import e6 from "@/public/e6.jpg";
import e7 from "@/public/e7.jpg";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import { usePathname } from "next/navigation";
import { Reveal } from "./reveal";


const UpEvent = () => {
  const [overlay, setOverlay] = useState(false);
  const events = [
    {
      id: 1,
      img: statbg,
      name: "Movie Night",
      date: "10 September",
      time: "8pm",
    },
    {
      id: 2,
      img: e2,
      name: "Movie Night",
      date: "10 September",
      time: "8pm",
    },
    {
      id: 3,
      img: e3,
      name: "Movie Night",
      date: "10 September",
      time: "8pm",
    },
    {
      id: 3,
      img: e4,
      name: "Movie Night",
      date: "10 September",
      time: "8pm",
    },
    {
      id: 3,
      img: e5,
      name: "Movie Night",
      date: "10 September",
      time: "8pm",
    }, {
      id: 3,
      img: e6,
      name: "Movie Night",
      date: "10 September",
      time: "8pm",
    }, {
      id: 3,
      img: e7,
      name: "Movie Night",
      date: "10 September",
      time: "8pm",
    },
  ];
  const pathname = usePathname()

  return (
    <div className={`${pathname === '/' ? "bg-white" : ""}  h-min-[70vh]  pt-6`}>
      <h3 className="sm:text-4xl text-center sm:text-left text-3xl mb-9 ml-6 font-bold">
        Upcoming <span className="text-[#F53D3D]">Events</span>{" "}
      </h3>
      {pathname === '/' && <p className="ml-auto mb-6 w-max hover:underline font-bold text-lg ">
          <Link href="/events">see more...</Link>
        </p>}
      <div className="flex flex-col">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full  "
        >
          {" "}
          <CarouselPrevious className="absolute border-gray-200 dark:border-none hover:bg-gray-700  transition-all bg-gray-800 cursor-pointer border-[0.05] dark:bg-[#3f434a]  rounded-[100%] left-5 z-10  py-2 px-2 top-1/2" />
          <CarouselContent className="border-none  h-80">
            {events.map((event) => (              
              <CarouselItem
                key={event.id}
                className=" md:basis-1/2 basic-3/4 sm:basis-[60%] lg:basis-1/3 w-full transition-all px-3 border-none  "
              >
                <div
                  className="w-full rounded-3xl transition-all cursor-pointer event-card
     relative"
                >
                  <div className="w-3/4h h-60  mx-auto rounded-3xl overflow-hidden">
                  <Image
                    src={
                      // urlForImage(siteInfo?.images)
                      event.img
                    }
                    sizes='responsive'
                    width={180}
                    height={150}
                    alt="stat section background image"
                    className="h-full w-full  bg-red-200  object-cover"
                  /></div>

                  <div className=" w-[70%] event-desc transition-all left-[15%] gap-y-3 absolute bg-white -bottom-10 p-3 flex flex-col rounded-xl">
                    <p className="text-xl text-center font-bold">
                      {event.name}
                    </p>

                    <div className="flex justify-evenly">
                      <div className="flex items-center gap-x-1">
                        <Calendar className="w-4 text-gray-400 h-4" /> {event.date}
                      </div>
                      <div className="items-center flex gap-x-1">
                        <Clock className="w-4 text-gray-400 h-4" />
                        {event.time}
                      </div>
                    </div>
                    <Sheet>
                      <SheetTrigger asChild>
                        <p className="ml-auto w-max ">
                          <button className='text-red-500 hover:underline'>more details</button>
                        </p>
                      </SheetTrigger>
                      <SheetContent className="" side="bottom">
                        <Overlay
                          setOverlay={setOverlay}
                          overlay={overlay}
                          rightTop={event.name}
                          rightMid1={event.date}
                          rightMid2={event.time}
                          rightBottom="loremLorem ipsum dolor sit amet consectetur, adipisicing elit. Quia tenetur fugit, quasi ipsum quam adipisci perferendis quis praesentium, dicta eaque maiores? Vitae, laudantium qui. Iure amet quo incidunt quos perferendis similique assumenda debitis sunt expedita molestias eligendi voluptate nihil, sint deserunt nobis libero tempore doloremque, dolorem veniam praesentium. Officia et expedita perspiciatis quasi, laboriosam quaerat numquam reiciendis optio quas doloribus natus vitae dolore qui quisquam, unde libero inventore? Voluptates dolorem molestiae, ad aut voluptatem soluta ut. Perspiciatis dolor velit, assumenda qui, pariatur deserunt cumque consequatur nesciunt architecto asperiores corrupti, debitis voluptate ratione quasi porro a alias officia expedita excepturi voluptas"
                          left={
                            <Image
                              src={
                                // urlForImage(siteInfo?.images)
                                event.img
                              }
                              sizes='responsive'

                              width={180}
                              height={150}
                              alt="stat section background image"
                              className="w-full bg-red-200  rounded-3xl mx-auto object-cover"
                            />
                          }
                        />
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="absolute border-gray-200 dark:border-none  hover:bg-gray-700 transition-all bg-gray-800 cursor-pointer border-[0.05] dark:bg-[#3f434a]  rounded-[100%] right-5 z-10 py-2 px-2 top-1/2" />
        </Carousel>
      
      </div>
      {/* <svg xmlns="http://www.w3.org/2000/svg" className='absolute  -top-52'  viewBox="0 0 1440 320"><path className='absolute top-0' fill="#fff" fillOpacity="1" d="M0,32L18.5,74.7C36.9,117,74,203,111,197.3C147.7,192,185,96,222,90.7C258.5,85,295,171,332,181.3C369.2,192,406,128,443,90.7C480,53,517,43,554,85.3C590.8,128,628,224,665,229.3C701.5,235,738,149,775,138.7C812.3,128,849,192,886,229.3C923.1,267,960,277,997,261.3C1033.8,245,1071,203,1108,197.3C1144.6,192,1182,224,1218,208C1255.4,192,1292,128,1329,96C1366.2,64,1403,64,1422,64L1440,64L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path></svg> */}
    </div>
  );
};

export default UpEvent;
