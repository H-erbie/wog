import CheckoutSummary from "@/components/checkout-summary";
import MiniNav from "@/components/mini-nav";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ids } from "@/lib/verifyToken";


const Page = () => {
    const orderId = ids() 
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "cart", link: "/cart" },
    { text: "checkout", link: "" },
  ];
  const apiKey = process.env.PAYSTACK_API_KEY;
  const serviceId = process.env.SERVICE_ID
const templateId = process.env.TEMPLATE_ID
const emailApi = process.env.EMAILJS_API_KEY
  return (
    <div className="main pt-24">
      <MiniNav links={miniLinks} />
      <div className="flex justify-between px-4">
        <h2 className="font-bold sm:text-3xl my-4 ">Summary of Order {orderId} </h2>
        <Link href="/cart" className="px-2 py-1 flex gap-2 items-center">
          Edit <Pencil />
        </Link>
      </div>
      <CheckoutSummary orderId={orderId} apiKey={apiKey} serviceId={serviceId} templateId={templateId} emailApi={emailApi}/>
    </div>
  );
};

export default Page;
