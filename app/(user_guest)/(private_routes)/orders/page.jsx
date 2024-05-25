import OrdersTab from "@/components/orders-tab";
import {client, sanityFetch } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import React from "react";
import MiniNav from "@/components/mini-nav";
import MainNav from "@/components/main-nav";
import { revalidateTag } from "next/cache";
const Page = async () => {
  const miniLinks = [
    { text: "home", link: "/" },

    { text: "orders", link: "" },
  ];

  const sanityOrders = await sanityFetch({
    query: groq`*[_type == "orders"]`,
    tags: ["orders"],
  });

   const orders = await client.fetch(groq`*[_type == "orders"]`, {
    next: { revalidate: 30 },
  });
  // revalidateTag("orders");

  const siteInfos = await sanityFetch({
    query: groq`*[_type == "siteInfo"]`,
    tags: ["siteInfo"],
  });
  // console.log(orders, sanityOrders);

  return (
    <div className="main pt-24">
      <MiniNav links={miniLinks} />
      {/* <button>checkrev</button> */}
      {/* <MainNav siteInfos={siteInfos} /> */}

      {/* <VerifyDialog /> */}
      <OrdersTab orders={sanityOrders} />
    </div>
  );
};

export default Page;
