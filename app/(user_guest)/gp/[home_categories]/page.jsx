import Img from "@/components/image";
import MiniNav from "@/components/mini-nav";
// import VerifyDialog from "@/components/verify-dialog";
import { lowerCaseHome } from "@/lib/utils";
import { client, sanityFetch } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Link from "next/link";
import React from "react";
``
const Page = async ({ params }) => {
  const { home_categories } = params;
  const homeCategory =  decodeURIComponent(home_categories)

  const products = await sanityFetch({
    query: groq`*[_type == "product"]`,
    tags:["product"]
  })

  const newProducts = lowerCaseHome(products);
  const newCategoryProducts = newProducts.filter(
    (product) => product.homepageCategories == homeCategory
  );


  const miniLinks = [
    { text: "home", link: "/" },
    { text: homeCategory, link: "" },
  ];
  return (
    <div className="main pt-24">
            {/* <VerifyDialog/> */}

      <MiniNav links={miniLinks} />

      <h1 className="text-xl mb-3 font-bold capitalize"> {homeCategory}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-10 w-full mx-auto">
        
        {newCategoryProducts.map((product) => (
          // console.log(product.images)
          <Link href={`/products/${product.slug.current}`} className="items-center justify-center flex-col flex" key={product._id}>
          <div className="hover:opacity-50 rounded-md bg-gray-100 flex gap-2 flex-col items-center justify-center w-full" key={product._id}>
            <Img
              src={urlForImage(product.images[0])}
              width={200}
              height={200}
                alt={product.name}
            />
                      </div>

            <span className="text-center mt-2">{product.name}</span>
          </Link>
        ))}
      </div>
      
    </div>
  );
};

export default Page;
