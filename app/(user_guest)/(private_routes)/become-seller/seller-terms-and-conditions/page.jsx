import React from 'react'
import MiniNav from "@/components/mini-nav";

 

const Page = () => {
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "Become a seller", link: "/become-seller" },
    { text: "T&C's of becoming a seller", link: "" },
  ];
  
  return (
    <div className='main pt-20 pb-5 p-4'>
            <MiniNav links={miniLinks} />

 <h1 className='sm:text-3xl text-xl my-3 font-bold text-center'>Andamo Express Seller Terms and Conditions</h1>

<p>Welcome to Andamo Express!</p>

<p>These Terms and Conditions (&apos;Terms&apos;) govern your use of the Andamo Express platform (&apos;Platform&apos;) as a seller and your relationship with Andamo Express (&apos;we&apos;, &apos;us&apos;, or &apos;our&apos;). By registering as a seller on the Platform, you agree to be bound by these Terms.</p>

<h2 className='sm:text-2xl text-lg my-1 font-semibold'>Eligibility</h2>

<p>To become a seller on Andamo Express, you must:</p>

<ul>
  <li>Be at least 18 years old and have the legal capacity to enter into a binding contract.</li>
  <li>Be a registered business entity or individual with a valid business license (if applicable).</li>
  <li>Comply with all applicable laws and regulations for selling online.</li>
</ul>

<h2 className='sm:text-2xl text-lg my-1 font-semibold'>Account Registration and Management</h2>

<p>You are responsible for maintaining the accuracy and completeness of the information you provide during registration and keeping your account information updated.</p>
<p>You are solely responsible for all activity that occurs under your account.</p>
<p>You must keep your password confidential and secure.</p>

<h2 className='sm:text-2xl text-lg my-1 font-semibold'>Products and Listings</h2>

<p>You are responsible for the quality, safety, legality, and accurate description of all products you list on the Platform.</p>
<p>You must comply with all applicable laws and regulations related to the products you sell.</p>
<p>You agree to list products accurately, including descriptions, pricing, and availability.</p>
<p>We reserve the right to remove any listing that violates these Terms or our policies.</p>

<h2 className='sm:text-2xl text-lg my-1 font-semibold'>Orders and Fulfillment</h2>

<p>You are responsible for fulfilling all orders placed through the Platform in a timely manner.</p>
<p>You must ship orders within the timeframe specified during listing or as communicated with the customer.</p>
<p>You are responsible for providing accurate tracking information to customers.</p>
<p>You are responsible for handling customer service inquiries related to your orders.</p>

<h2 className='sm:text-2xl text-lg my-1 font-semibold'>Payments and Fees</h2>

<p>Andamo Express may charge various fees associated with selling on the Platform, including listing fees, transaction fees, and payment processing fees. These fees will be clearly communicated to you before you list your products.</p>
<p>You will be paid for your sales minus any applicable fees through your chosen payment method.</p>
<p>You are responsible for any taxes associated with your sales.</p>

<h2 className='sm:text-2xl text-lg my-1 font-semibold'>Intellectual Property</h2>

<p>You retain ownership of all intellectual property rights related to your products and listings.</p>
<p>You grant Andamo Express a non-exclusive license to use your product listings and intellectual property to display your products on the Platform.</p>

<h2 className='sm:text-2xl text-lg my-1 font-semibold'>Termination</h2>

<p>We may terminate your account at any time for any reason, with or without notice.</p>
<p>You may terminate your account at any time by following the instructions on the Platform.</p>
<p>Upon termination of your account, you will no longer be authorized to sell on the Platform.</p>

<h2 className='sm:text-2xl text-lg my-1 font-semibold'>Disclaimers and Limitations of Liability</h2>

<p>Andamo Express is a platform that connects buyers and sellers. We are not responsible for the quality, safety, or legality of products sold on the Platform.</p>
<p>We are not liable for any damages arising from your use of the Platform or your interactions with buyers.</p>
<p>You agree to indemnify and hold us harmless from any claims or liabilities arising from your use of the Platform.</p>

<h2 className='sm:text-2xl text-lg my-1 font-semibold'>Governing Law and Dispute Resolution</h2>

<p>These Terms will be governed by and construed in accordance with the laws of Ghana.</p>
<p>Any dispute arising out of or relating to these Terms will be settled through  binding arbitration.</p>

<h2 className='sm:text-2xl text-lg my-1 font-semibold'>Updates to the Terms</h2>

<p>We may update these Terms at any time by posting the revised version on the Platform. You are responsible for checking the Terms periodically for updates. Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes.</p>

<h2 className='sm:text-2xl text-lg my-1 font-semibold'>Contact Us</h2>
If you have any questions about these Terms, please contact us at +233 59 227 1400 or weareandamo@gmail.com.

By registering as your business a seller on Andamo Express, you acknowledge that you have read, understood, and agree to be bound by these Terms.
    </div>
  )
}

export default Page