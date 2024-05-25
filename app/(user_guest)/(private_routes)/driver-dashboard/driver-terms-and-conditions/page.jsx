import React from "react";
import MiniNav from "@/components/mini-nav";

const Page = () => {
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "Driver dashboard", link: "/driver-dashboard" },
    { text: "T&C's for Andamo drivers", link: "" },
  ];
  return (
    <div className="main pt-20 pb-5 p-4">
      <MiniNav links={miniLinks} />
      <div class="prose prose-lg prose-green prose-border prose-border-gray-300 rounded-lg p-4 shadow-md">
        <h2 className='font-semibold'>Driver Terms and Conditions</h2>

        <p class="mb-4">
          These Terms and Conditions (&apos;Terms&apos;) govern the relationship
          between Andamo Express (&apos;Company&apos;) and you, the driver
          (&apos;Driver&apos;), regarding the delivery of orders to customers
          through the Company&apos;s e-commerce platform.
        </p>

        <h3 className='font-semibold' >1. Services</h3>

        <p class="mb-4">
          Driver agrees to provide delivery services for orders placed on the
          Company&apos;s website in accordance with these Terms and the Company&apos;s
          delivery policies.
        </p>

        <h3  className='font-semibold'>2. Driver Responsibilities</h3>

        <ul class="list-disc pl-4 space-y-2">
          <li>
            Driver is responsible for maintaining a valid driver&apos;s license
            and all necessary permits and insurance for operating a vehicle for
            delivery purposes.
          </li>
          <li>Driver must be at least 18 years old.</li>
          <li>
            Driver must be familiar with the delivery area and follow all
            traffic laws and regulations.
          </li>
          <li>
            Driver must handle customer orders with care and ensure timely
            delivery within the designated timeframe.
          </li>
          <li>
            Driver must present a professional appearance and maintain a
            courteous and respectful demeanor when interacting with customers.
          </li>
          <li>
            Driver must report any damage to orders or delivery issues to the
            Company promptly.
          </li>
          <li>
            Driver must comply with all Company policies and procedures related
            to deliveries.
          </li>
        </ul>

        <h3 className='font-semibold'>3. Compensation</h3>

        <p class="mb-4">
          Driver will be compensated for delivery services according to the
          Company&apos;s agreed-upon payment structure. This may include a base
          rate per delivery, distance-based fees, and/or other incentives as
          determined by the Company.
        </p>

        <h3 className='font-semibold'>4. Term and Termination</h3>

        <p class="mb-4">
          These Terms will remain in effect for as long as Driver continues to
          provide delivery services for the Company. The Company may terminate
          these Terms at any time, with or without cause, upon written notice to
          Driver. Driver may terminate these Terms by ceasing to provide
          delivery services for the Company.
        </p>

        <h3 className='font-semibold'>5. Independent Contractor</h3>

        <p class="mb-4">
          Driver is an independent contractor and not an employee of the
          Company. Driver is responsible for all taxes and social security
          contributions associated with the income earned from providing
          delivery services.
        </p>

        <h3 className='font-semibold'>6. Confidentiality</h3>

        <p class="mb-4">
          Driver agrees to keep confidential all information obtained from the
          Company or its customers in the course of providing delivery services.
          This includes customer information, order details, and any other
          sensitive data.
        </p>

        <h3 className='font-semibold'>7. Disclaimer</h3>

        <p class="mb-4">
          The Company disclaims any warranties, express or implied, regarding
          the delivery services or the suitability of Driver for such services.
          Driver performs services at their own risk.
        </p>

        <h3 className='font-semibold'>8. Limitation of Liability</h3>
        <p class="mb-4">
          The Company shall not be liable for any damages arising from Driver&apos;s
          performance of services under these Terms, except to the extent such
          damages are caused by the Company&apos;s gross negligence or willful
          misconduct.
        </p>

        <h3 className='font-semibold'>9. Governing Law</h3>

        <p class="mb-4">
          These Terms shall be governed by and construed in accordance with the
          laws of Ghana.
        </p>

        <h3 className='font-semibold'>10. Entire Agreement</h3>

        <p class="mb-4">
          These Terms constitute the entire agreement between the Company and
          Driver regarding the subject matter hereof and supersede all prior or
          contemporaneous communications, representations, or agreements,
          whether oral or written.
        </p>

        <p>
          By continuing to provide delivery services for the Company, Driver
          acknowledges that they have read, understood, and agree to be bound by
          these Terms.
        </p>
      </div>
    </div>
  );
};

export default Page;
