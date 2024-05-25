import MiniNav from "@/components/mini-nav";
// import VerifyDialog from "@/components/verify-dialog";
import React from "react";

const Page = () => {
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "contact", link: "" },
  ];
  return (
    <div className="main  pt-24">
            {/* <VerifyDialog/> */}

      <MiniNav links={miniLinks} />

      <h2 className="text-3xl font-bold capitalize">get in touch with us</h2>
      <div className="">

      <p>
        If you have questions or need any assistance, we are here for you. You
        can get in touch with us on 0302740642 from Monday to Friday between 8am
        to 6pm and on weekends and holidays from 9am - 5pm
      </p>
      {/* image */}
      </div>
      <div className="">
        {/* map */}
        {/* contact form */}
      </div>
    </div>
  );
};

export default Page;
