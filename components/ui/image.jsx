import React from 'react'


import { client } from "@/sanity/lib/client";
// import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';

const Img =  ({src, alt, width, height, cls}) => {
   
  return (
    <>
        
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  className={`block h-full ${cls} w-full object-cover `}
                />
              </>
  )
}

export default Img