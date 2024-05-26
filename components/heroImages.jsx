import React from 'react'


import { client } from "@/sanity/lib/client";
import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';

const HeroImages = async ({img}) => {
   
  return (
    <>
        <div className="absolute top-0 left-0 w-full rounded-3xl h-full backdrop-brightness-[.7] dark:backdrop-brightness-[.8] flex justify-center items-center">
                  <p className="font-bold text-2xl sm:text-3xl w-48 sm:w-max md:text-4xl lg:text-5xl text-white capitalize">{img.detail}</p>
                </div>
                <Image
                  src={urlForImage(img?.images)}
                  alt={img.detail}
                  width={500}
                  height={300}
                  className={`block h-full w-full rounded-3xl object-cover `}
                />
              </>
  )
}

export default HeroImages