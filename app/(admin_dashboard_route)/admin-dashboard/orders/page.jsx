import AdminTabs from "@/components/admin-tabs";
import MiniNav from "@/components/mini-nav";
import NoOrders from "@/components/no-orders";
import { client, sanityFetch } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import React from "react";

const Page = async () => {
  
  const orders = await sanityFetch({
    query: groq`*[_type == "orders"]`,
    tags:["orders"]
  })
  
  const siteInfos = await sanityFetch({
    query: groq`*[_type == "siteInfo"]`,
    tags: ["siteInfo"],
  });
 
  return (
    <div className="main pt-24 pb-[90px] px-0">
        <AdminTabs
          orders={orders}
          siteInfos={siteInfos}
        />
      
    </div>
  );
};

export default Page;