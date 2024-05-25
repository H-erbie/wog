import React from 'react'
import SellerDashboard from '@/components/seller-dashboard'
import MiniNav from "@/components/mini-nav";

import { client, sanityFetch } from "@/sanity/lib/client";

import { groq } from "next-sanity";


const Page = async() => {
  const orders = await sanityFetch({
    query: groq`*[_type == "orders"]`,
    tags:["orders"]
  })
  
  const products = await sanityFetch({
    query: groq`*[_type == "product" ]`, 
    tags: ['product'],
  });
    const miniLinks = [
        { text: "home", link: "/" },
        { text: "Seller's Dashboard", link: "" },
        // { text: "T&C's of becoming a seller", link: "" },
      ];
  return (
    <div className='main pt-16'>
                  <MiniNav links={miniLinks} />

        <SellerDashboard orders={orders} products={products} />
    </div>
  )
}

export default Page