import MiniNav from "@/components/mini-nav";
// import VerifyDialog from "@/components/verify-dialog";
import React from "react";

const Page = () => {
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "terms & conditions", link: "" },
  ];
  return (
    <div className="main pt-24">
            {/* <VerifyDialog/> */}

      <MiniNav links={miniLinks} />
      <div className="w-full my-4 md:w-5/6 mx-auto">
        <h2 className="text-3xl font-bold capitalize my-3">terms and conditions</h2>

        <p>
          These Terms and Conditions (the &apos;Terms&apos;) govern your access to and use
          of our e-commerce website (the &apos;Website&apos;).
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">
          Acceptance of the Terms
        </h3>

        <p>
          By accessing or using the Website, you agree to be bound by these
          Terms. If you do not agree to these Terms, you may not access or use
          the Website.
        </p>

        <h3 className="text-xl font-semibold capitalize my-1">
          Use of the Website
        </h3>

        <p>
          You may use the Website for your personal, non-commercial use only.
          You may not use the Website for any commercial purpose, including but
          not limited to selling or reselling products or services, or
          advertising or marketing products or services.
        </p>

        <h3 className="text-xl font-semibold capitalize my-1">
          Restrictions on Use
        </h3>

        <p>You may not:</p>

        <ul>
          <li className=" list-disc ml-8">
            {" "}
            Copy, reproduce, modify, distribute, or sell the Website or any of
            its content without our express written permission.
          </li>
          <li className=" list-disc ml-8">
            {" "}
            Access or use the Website in any way that is unlawful or harmful to
            the Website or its users.
          </li>
          <li className=" list-disc ml-8">
            {" "}
            Use the Website to transmit any viruses, malware, or other harmful
            code.
          </li>
          <li className=" list-disc ml-8"> Interfere with or disrupt the operation of the Website.</li>{" "}
        </ul>

        <h3 className="text-xl font-semibold capitalize my-1">
          Account Registration
        </h3>
        <p>
          To use some of the features of the Website, you may need to create an
          account. When you create an account, you agree to provide us with
          accurate and complete information. You are responsible for maintaining
          the confidentiality of your account password and for all activity that
          occurs under your account.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">Payments</h3>
        <p>
          If you purchase products or services on the Website, you agree to pay
          all applicable fees and taxes. You also agree to provide us with
          accurate and complete payment information.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">
          Intellectual Property
        </h3>
        {/*  */}
        <p>
          The Website and all of its content, including but not limited to
          trademarks, copyrights, and trade secrets, are the property of Babygirl Company or its licensors. You may not use the Website&apos;s
          intellectual property without our express written permission.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">Disclaimers</h3>
        <p className="font-medium">
          THE WEBSITE IS PROVIDED ON AN &apos;AS IS&apos; AND &apos;AS AVAILABLE&apos; BASIS. WE
          MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
          REGARDING THE WEBSITE OR ITS CONTENT. WE EXPRESSLY DISCLAIM ANY
          IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">
          Limitation of Liability
        </h3>
        <p className="font-medium">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY
          DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
          DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF
          THE WEBSITE OR ITS CONTENT.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">Governing Law</h3>
        {/*  */}
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of the Republic of Ghana.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">
          Entire Agreement
        </h3>
        {/*  */}
        <p>
          These Terms constitute the entire agreement between you and Babygirl Company with respect to your access to and use of the Website.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">Severability</h3>
        <p>
          If any provision of these Terms is held to be invalid or
          unenforceable, such provision shall be struck from these Terms and the
          remaining provisions shall remain in full force and effect.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">Waiver</h3>
        <p>
          No waiver of any provision of these Terms shall be effective unless in
          writing and signed by both parties.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">Notices</h3>
        {/*  */}
        <p>
          All notices and other communications hereunder shall be in writing and
          shall be deemed to have been duly given when delivered in person, upon
          the first business day following deposit in the Ghanaian mail,
          postage prepaid, certified or registered, return receipt requested,
          addressed as follows:
        </p>
{/*  */}
        <p>If to Babygirl company:</p>
        <ul>
          <li>Babygirl company</li>
          <li>P.O Box 123, Kumasi</li>
        </ul>
{/*  */}
        <p>If to you:</p>

        <ul>
          <li>Username</li>
          <li>user email</li>
        </ul>

        <p>
          or to such other address as either party may designate in writing from
          time to time.
        </p>
        <h3 className="text-xl font-semibold capitalize my-1">Survival</h3>
        <p>
          The provisions of these Terms which by their nature should survive
          termination of this Agreement shall remain in full force and effect.
        </p>
      </div>{" "}
    </div>
  );
};

export default Page;
