import React from "react";
import DriverDashboard   from "@/components/driver-dashboard";
import MiniNav from "@/components/mini-nav";

import { client, sanityFetch } from "@/sanity/lib/client";

import { groq } from "next-sanity";

const Page = async () => {
  const orders = await sanityFetch({
    query: groq`*[_type == "orders"]`,
    tags: ["orders"],
  });
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "Driver's Dashboard", link: "" },
    // { text: "T&C's of becoming a seller", link: "" },
  ];

  return (
    <div className="main pt-16">
      <MiniNav links={miniLinks} />
      <DriverDashboard orders={orders} />
    </div>
  );
};

export default Page;
