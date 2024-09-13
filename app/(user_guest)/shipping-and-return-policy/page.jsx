import MiniNav from "@/components/mini-nav";
// import VerifyDialog from "@/components/verify-dialog";
import React from "react";

const Page = () => {
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "shipping & return policy", link: "" },
  ];
  return (
    <div className="main pt-24">
            {/* <VerifyDialog /> */}

      <MiniNav links={miniLinks} />
     <div className="w-full my-4 md:w-5/6 mx-auto">
     <h2 className="text-3xl font-bold capitalize my-3">
        shipping & return policy
      </h2>
      {/*  */}
      <p>
        We offer free shipping on all orders over GHS 500.00. For orders under GHS 500.00, we
        charge a flat shipping fee of GHS 5.99. We ship all orders within 1-2
        business days of receiving the order. Orders placed on weekends or
        holidays will be shipped the next business day.
      </p>
      {/*  */}
      <p>
        We ship all orders via USPS First Class Package Service. Most orders
        arrive within 2-5 business days of being shipped. However, please note
        that shipping times may vary depending on your location.
      </p>
      <h3 className="text-xl font-semibold capitalize my-1">Return Policy</h3>
      {/*  */}
      <p>
        We accept returns within 5 days of purchase. All returns must be in new
        and unused condition with the original packaging. To return an item,
        please contact us at weareandamo@gmail.com for a return authorization number
        (RAN). Once you have received an RAN, please ship the item back to us at
        the following address:
      </p>
      <ul>
        <li>Andamo Express</li>
        <li>weareandamo@gmail.com</li>
      </ul>
      {/*  */}
      <p>
        Please be sure to include the RAN on the return shipping label. We will
        process your return within 5-7 business days of receiving it. Once your
        return has been processed, you will receive a full refund to your
        original payment method.
      </p>
      <h3 className="text-xl font-semibold capitalize my-1">Exceptions</h3>
      <p>The following items are not eligible for return:</p>
      <ul>
        <li> Sale items</li>
        <li> Personalized items</li>
        <li> Gift cards</li>
      </ul>
      <h3 className="text-xl font-semibold capitalize my-1">Questions</h3>
      {/*  */}
      <p>
        If you have any questions about our shipping or return policy, please
        contact us at weareandamo@gmail.com
      </p>
     </div>
     {" "}
    </div>
  );
};

export default Page;
