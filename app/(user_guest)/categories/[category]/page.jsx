import Img from "@/components/image";
import MiniNav from "@/components/mini-nav";
// import VerifyDialog from "@/components/verify-dialog";
import { lowerCase } from "@/lib/utils";
import { client, sanityFetch } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Link from "next/link";
import React from "react";

const Page = async ({ params }) => {

  const products = await sanityFetch({
    query: groq`*[_type == "product"]`,
    tags:["product"]
  })

  const { category } = params;
  const newParams = decodeURIComponent(category);

  const newProducts = lowerCase(products)
  const categoryProducts =newProducts.filter(product => product.categories.includes(newParams));

  const miniLinks = [
    { text: "home", link: "/" },
    { text: "categories", link: "/categories" },
    { text: newParams, link: "" },
  ]
  return (
    <div className="main  pt-24">
            {/* <VerifyDialog/> */}

      <MiniNav links={miniLinks} />
      <h2 className="text-2xl font-bold capitalize text-center mb-6">{newParams}</h2>
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-7 w-[90%] mx-auto">
        {categoryProducts.map((product) => (
          <Link href={`/products/${product.slug.current}`}  key={product._id}  className="w-3/4 flex-col flex items-center justify-center hover:brightness-50 h-[160px]">
          <div className=" w-full overflow-hidden rounded-md bg-gray-100 flex items-center justify-center" key={product._id}>
            <Img
              src={urlForImage(product?.images?.[0])}
              width={200}
              height={200}
              alt={product.name}

            />
                      </div>

            <p className="text-center mt-2">{product.name}</p>
          </Link>
        ))}
        
      </div>
    </div>
    
  );
};

export default Page;
