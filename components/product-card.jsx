import React from "react";
import Img from "./ui/image";
import { urlForImage } from "@/sanity/lib/image";
// import Image from 'next/image';
// import Img from "./image";
import { Suspense } from "react";
import Link from "next/link";

const ProductCard = ({ category, products }) => {
  const matchedProduct = products.find((item) =>
    item.categories.includes(category)
  );


  const newCategory = encodeURIComponent(category)
  return (
    <Suspense fallback={<div className="sm:w=[150px] md:w-[158px] lg:w-[200px] rounded-md  bg-gray-400 animate-pulse"></div>}>
      {/* <div className="" > */}
        <Link href={`/categories/${newCategory}`} className="w-3/4 flex-col flex items-center justify-center hover:opacity-50 h-[160px]">
          <div className=" w-full  mx-auto overflow-hidden rounded-md bg-gray-100 flex items-center">
          <Img
            src={urlForImage(matchedProduct.images[0]).url()}
            width={200}
            height={200}
            alt={matchedProduct.name}
            className='object-cover h-[140px]'
          />
          </div>
{" "}
          <p className="text-center mt-2 capitalize">{category}</p>
        </Link>
      {/* </div> */}
    </Suspense>
  );
};

export default ProductCard;
