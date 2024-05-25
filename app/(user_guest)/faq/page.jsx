import MiniNav from "@/components/mini-nav";
// import VerifyDialog from "@/components/verify-dialog";
import React from "react";

const Page = () => {
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "faq", link: "" },
  ];
  return (
    <div className="main pt-24">
       {/* <VerifyDialog/> */}
       <MiniNav links={miniLinks} />
     

      <h2 className="text-3xl font-bold capitalize">faq</h2>
    </div>
  );
};

export default Page;
