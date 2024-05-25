import AdminProducts from '@/components/admin-products'
import React from 'react'
import { client, sanityFetch } from "@/sanity/lib/client";

import { groq } from "next-sanity";

const Page = async() => {
  const products = await sanityFetch({
    query: groq`*[_type == "product"]`, 
    tags:["product"]
  });
  const sellers = await sanityFetch({
    query: groq`*[_type == "sellersProduct"]`, 
    tags:["sellers"]
  });
  // console.log(sellers )
  const ads = await sanityFetch({
    query: groq`*[_type == "ads"]`,
    tags:["ads"]
  })
  return (
    <div className='pt-24'>
        <AdminProducts products={products} sellers={sellers} ads={ads}/>
    </div>
  )
}

export default Page