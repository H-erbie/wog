"use client";

import { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import Img from "./image";

export default function ProductGallery({ product }) {
  const [size, setSize] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="flex mx-auto lg:sticky lg:top-24 flex-col-reverse items-center sm:w-3/4">
      {/* Image Grid */}
      <div className="mx-auto mt-6 w-max ">
        <ul className="grid w-max grid-cols-3  gap-x-5">
          {product?.images?.map((image, index) => {
            return (
              <div
                key={image._key}
                onClick={() => setSelectedImage(index)}
                className={`relative  flex ${
                  index == selectedImage ? "h-16 w-16" : "h-12 w-12"
                }  cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase hover:bg-gray-50`}
              >
                <span className="absolute w-full  inset-0 overflow-hidden rounded-md">
                  <Image
                    src={urlForImage(image && image)}
                    width={200}
                    height={200}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                    //   placeholder="blur"
                    //   blurDataURL={`data:image/svg+xml.base64,${toBase64(shimmer(200, 200))}`}
                  />
                </span>
                {!index == selectedImage && (
                  <span className="pointer-events-none h-16 w-full absolute top-0 left-0  hover:backdrop-brightness-50" />
                )}
              </div>
            );
          })}
        </ul>
      </div>

      {/* Main Image */}
      <div className=" rounded-md  w-[50%] h-[450px] lg:w-full  min-w-[300px]  overflow-hidden">
        <Image
          priority
          src={urlForImage(product?.images?.[selectedImage])}
          alt={`Main ${product.name} image`}
          width={400}
          height={200}
          className="h-full hover:scale-125 transition-all w-full border-2 bg-gray-200 border-gray-200 object-cover object-center shadow-sm dark:border-gray-800 rounded-xl"
          //   placeholder="blur"
          //   blurDataURL={`data:image/svg+xml.base64,${toBase64(shimmer(600, 750))}`}
        />
      </div>
    </div>
  );
}
