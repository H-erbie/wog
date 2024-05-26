import MiniNav from "@/components/mini-nav";
import { PhoneCall, Mail } from "lucide-react";
// import VerifyDialog from "@/components/verify-dialog";
import React from "react";

const Page = () => {
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "contact", link: "" },
  ];
  return (
    <div className="main h-full flex items-center justify-center  pt-24">
            {/* <VerifyDialog/> */}

      <MiniNav links={miniLinks} />

      <h2 className="text-2xl font-bold capitalize flex gap-x-2">get in touch with us<PhoneCall className="w-8 h-8"/> <Mail className="w-8 h-8 "/></h2>
      
      <div className="flex flex-col h-full justify-center items-center">
   <div className="flex flex-col justify-center items-center gap-x-3 sm:flex-row">
   <div className="flex w-max rounded-xl  my-2 gap-y-2 flex-col p-5 bg-yellow-500">
      <p>+233 59 227 1400</p>
      <p>Call the above</p>
    </div>

    <div className="flex w-max rounded-xl  my-2 gap-y-2 flex-col p-5 bg-yellow-500">
      <p>weareandamo@gmail.com</p>
      <p>Email the above</p>
    </div>
   </div>
      
      </div>
    
    </div>
  );
};

export default Page;
