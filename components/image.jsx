import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import React from 'react'

const Img = async({src, width, height, alt, className}) => {
    // console.log(product, cat)
  return (
    <>
     <Image
              src={src}
              width={width}
              height={height}
              alt={alt}
              className={`rounded-md bg-gray-300 dark:bg-zinc-600 ${className}`}
            />
    </>
  )
}

export default Img
