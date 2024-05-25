import AdminOrder from "@/components/admin-order";
import { client, sanityFetch } from "@/sanity/lib/client";

// import { adminOrders } from "@/lib/sanity-queries";
import { groq } from "next-sanity";
import React from "react";
import MiniNav from "@/components/mini-nav";

const Page = async ({ params }) => {
  const { order } = params;

  const currentOrder = await sanityFetch({
    query: groq`*[_type == "orders" && _id == $order]`,
    qParams: { order },
  })
  let orderId = currentOrder[0].name;

  // console.log(currentOrder);
  
  const serviceId = process.env.SERVICE_ID;
  const templateId = process.env.TEMPLATE_ID;
  const emailApi = process.env.EMAILJS_API_KEY;
  const miniLinks = [
    { text: "overview", link: "/admin-dashboard/overview" },
    { text: "orders", link: "/admin-dashboard/orders" },
    { text: `order ${orderId}`, link: "" },
  ];
  // console.log(params.order)
  return (
    <div className="main pt-24 ">
      <div className="absolute">
      <MiniNav links={miniLinks} />
</div>
      <AdminOrder
        currentOrder={currentOrder[0]}
        serviceId={serviceId}
        templateId={templateId}
        emailApi={emailApi}
        orderId={order}
      />
    </div>
  );
};

export default Page;
