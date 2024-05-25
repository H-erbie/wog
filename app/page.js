require('dotenv').config();
import CategorySlide from "@/components/category-slide";
import Hero from "@/components/hero";
import HomeAds from "@/components/home-ads";

// import { register } from "swiper/element/bundle";

import { client, sanityFetch } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { ImSad } from "react-icons/im";
import { heroQuery } from "@/lib/sanity-queries";
// import { seedSanityData } from "@/lib/seed";





export default async function Home({searchParams}) {
  //seed sanity with load of data
  // await seedSanityData()8
  const {search} = searchParams
  const searchFilter = search ? `&& name match "${search}*"` : ""
  const productsFilter = `_type == "product"`

  const filter = `*[${productsFilter}${searchFilter}]`

  const heros = await sanityFetch({
    query: heroQuery,
    tags:["heroBanner"]
  })
  const ads = await sanityFetch({
    query: groq`*[_type == "ads"]`,
    tags:["ads"]
  })
  const products = await sanityFetch({
      query: groq`${filter}`, 
      tags:["product"]
    });

  // register();
  if (products.length === 0) {
    return (
      <div className="mx-auto pt-24 grid h-40 w-full place-items-center rounded-md  main bg-gray-50 py-10 text-center dark:bg-gray-900">
       
     <Link href='/' className='w-max text-white bg-yellow-500 px-3 py-2' >clear search</Link>
        <div>
        <ImSad className="mx-auto h-20 w-20 text-gray-500 dark:text-gray-200" />
          <h1 className="mt-2 text-xl font-bold tracking-tight text-gray-500 dark:text-gray-200 sm:text-2xl">
            No products found
          </h1>
        </div>
      </div>
    )
  }


  return (
    <main className={search ? "main gap-7 pt-20" :"main gap-7 "}>
      {
      search && <Link href='/' className='w-max text-white bg-yellow-600 px-3 py-2'>clear search</Link>}
      {search && <p className='text-2xl font-bold'>Results:</p>}
     {!search && <Hero heros={heros} />}
    {!search && <HomeAds ads={ads} />}

      <div id='products'>
        <CategorySlide products={products} />
      </div>
    </main>
  );
}

export const revalidate = 60;




