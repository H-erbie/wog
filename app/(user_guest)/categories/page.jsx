import React from "react";
import MiniNav from "@/components/mini-nav";
import { client, sanityFetch } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import ProductCard from "@/components/product-card";
import { makeCategoriesLowercase } from "@/lib/utils";
// import VerifyDialog from "@/components/verify-dialog";


const Page = async () => {
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "categories", link: "" },
  ];

  const products = await sanityFetch({
    query: groq`*[_type == "product"]`,
    tags:["product"]
  })

  const categories = makeCategoriesLowercase(products);


  return (
    <div className="main mb-5 pt-24">
            {/* <VerifyDialog/> */}

      <MiniNav links={miniLinks} />
      <h1 className="text-2xl font-bold capitalize mb-6 text-center">all categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-7 w-[90%] mx-auto">
        {categories.map((category, index) => {
          // console.log(product.images)
          return (
              <ProductCard category={category} products={products} key={index}/>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
export const revalidate = 60;
