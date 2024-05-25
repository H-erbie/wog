import React from 'react'
  import {client, sanityFetch } from "@/sanity/lib/client";

import { groq } from "next-sanity";
import Overview from '@/components/overview';
const Page = async() => {


  const sanityOrders = await sanityFetch({
    query: groq`*[_type == "orders"]`,
    tags: ["orders"],
  });
  const products = await sanityFetch({
    query: groq`*[_type == "product"]`, 
    tags:["product"]
  });
  return (
    <div className='main pt-24'>
      <Overview orders={sanityOrders} products={products}/>
    </div>
  )
}

export default Page