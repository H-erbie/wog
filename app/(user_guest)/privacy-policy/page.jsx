import MiniNav from "@/components/mini-nav";
// import VerifyDialog from "@/components/verify-dialog";
import React from "react";

const Page = () => {
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "privacy policy", link: "" },
  ];
  return (
    <div className="main sm:px-4  pt-24">
            {/* <VerifyDialog/> */}

      <MiniNav links={miniLinks} />
<div className="w-full my-4 md:w-5/6 mx-auto">
    
<h2 className="text-3xl font-bold capitalize mb-3">privacy policy</h2>
        <p>
          This Privacy Policy explains how we collect, use, and share your
          personal information when you use our e-commerce website.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">What information do we collect?</h3>
        <p>
          We collect the following personal information from you when you use
          our website:
        </p>
        <ul>
          <li className=" list-disc ml-8"> Your name, email address, mobile contact detail, and shipping address</li>
          <li className=" list-disc ml-8">
            {" "}
            Your payment information, such as your credit card number and
            billing address
          </li>
          <li className=" list-disc ml-8"> Your product purchase history</li>
          <li className=" list-disc ml-8"> Your browsing history on our website</li>
        </ul>
        <h3 className="text-xl font-semibold capitalize my-1">How do we use the information we collect?</h3>
        <p>We use the personal information we collect to:</p>
        <ul>
          <li className=" list-disc ml-8"> Process your orders and payments</li>
          <li className=" list-disc ml-8"> Provide customer support</li>
          {/* <li className=" list-disc ml-8"> Send you marketing emails (if you have opted in)</li> */}
          <li className=" list-disc ml-8"> Improve our website and services</li>
        </ul>
        <h3 className="text-xl font-semibold capitalize my-1">Who do we share the information we collect with?</h3>
        <p>
          We share your personal information with the following third parties:
        </p>
        <ul>
          <li className=" list-disc ml-8">NextAuth, which we use to authenticate and authorize users</li>
          <li className=" list-disc ml-8"> Use-shopping-cart, which we use to manage products</li>
          <li className=" list-disc ml-8"> Sanity, which we use for content management</li>
        </ul>
        <p>
          We also share your personal information with third-party payment
          processors when you make a purchase on our website.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">How do we protect the information we collect?</h3>
        <p>
          We use a variety of security measures to protect your personal
          information from unauthorized access, use, or disclosure. These
          measures include:
        </p>
        <ul>
          <li className=" list-disc ml-8">
            {" "}
            Encrypting all personal information transmitted over the internet
          </li>
          <li className=" list-disc ml-8"> Storing personal information on secure servers</li>
          <li className=" list-disc ml-8">
            {" "}
            Limiting access to personal information to authorized employees
          </li>
        </ul>
        <h3 className="text-xl font-semibold capitalize my-1">What choices do you have about your information?</h3>
        <p>You have the following choices about your personal information:</p>
        <ul>
          {/* <li className=" list-disc ml-8">
            {" "}
            You can opt out of receiving marketing emails from us by clicking
            the unsubscribe link in any marketing email.
          </li> */}
          {/*  */}
          <li className=" list-disc ml-8">
            {" "}
            You can request access to your personal information, have it
            corrected or deleted, or restrict our processing of it by contacting
            us at weareandamo@gmail.com
          </li>
        </ul>
        <h3 className="text-xl font-semibold capitalize my-1">Changes to this Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. If we make any
          significant changes, we will notify you by email or by posting a
          notice on our website.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">Contact us</h3>
        {/*  */}
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at Babygirl email
            </p>
</div>
{" "}
    </div>
  );
};

export default Page;
