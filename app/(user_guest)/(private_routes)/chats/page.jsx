import Chat from '@/components/chat'
import React from 'react'
import {client, sanityFetch } from "@/sanity/lib/client";

import { groq } from "next-sanity";


const Page = async() => {
  const sanityOrders = await sanityFetch({
    query: groq`*[_type == "orders"]`,
    tags: ["orders"],
  });
  
   return (
    <div>
        <Chat orders={sanityOrders}/>
    </div>
  )
}

export default Page