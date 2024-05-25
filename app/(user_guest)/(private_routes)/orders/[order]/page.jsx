import React from "react";
import { client, sanityFetch } from "@/sanity/lib/client";

import { groq } from "next-sanity";
import MiniNav from "@/components/mini-nav";
import OrderTab from "@/components/order-tab";

const Page = async ({ params }) => {
  const { order } = params;
  const decodedOrderId = decodeURIComponent(order); // Decode the parameter
  const orders = await sanityFetch({
    query: groq`*[_type == "orders" && name == $decodedOrderId]`,
    qParams: { decodedOrderId },
    tags: ["order"],

  });
  
  // const orders = await client.fetch(groq`*[_type == "orders"]`, {
  //   next: { revalidate: 30 },
  // });
  // const userOrders = orders.filter((userOrder) => userOrder.name == decodedOrderId);
  // console.log(decodedOrderId);
  const miniLinks = [
    { text: "home", link: "/" },
    // { text: "categories", link: "/categories" },
    // { text: product.categories[0], link: `/            categories/${product.categories[0].toLowerCase()}` },
    { text: "orders", link: "/orders" },
    { text: order, link: `/orders${order}` },
  ];

  return (
    <div className="min-h-screen pt-28">
      <MiniNav links={miniLinks} />

      <OrderTab userOrders={orders} order={decodedOrderId} />
    </div>
  );
};

export default Page;
