import React from 'react'
import { Users } from 'lucide-react'
import MiniNav from '@/components/mini-nav';
import { client, sanityFetch } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from "@/sanity/lib/image";
import founders from '@/public/about.jpg'

const Page = async() => {
  const siteInfos = await sanityFetch({
    query: groq`*[_type == "siteInfo"]`,
    tags: ["siteInfo"],
  });
    const miniLinks = [
        { text: "home", link: "/" },
        { text: "about us", link: "" },
      ];
  return (
    <div className='main pt-24 flex '>
              <MiniNav links={miniLinks} />

        <h1 className="text-3xl animate-pulse text-center justify-center items-center flex gap-x-2 font-bold tracking-tight sm:text-4xl">
        About us
        <Users className='w-8 h-8'/>
      </h1>



    <div class="container mx-auto px-4 py-8">
  <h1 class="text-2xl font-bold mb-4">Andamo Express: Your Speedy Shopping Shortcut</h1>
  <p class="text-lg mb-8">Ever get that &apos;gotta-have-it-now&apos; feeling and need it fast? That&apos;s where Andamo Express comes in! We&apos;re your one-stop shop for a huge variety of products, delivered straight to your door at lightning speed.</p>

  <div class="flex items-center mb-8">
    {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mr-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7 -7 7 7" />
    </svg> */}
    <p class="text-lg">Born from a simple idea: online shopping should be convenient, affordable, and hassle-free. That&apos;s why we built Andamo Express as a Progressive Web App (PWA), giving you a smooth shopping experience right from your phone or mobile device.</p>
  </div>

  <h2 class="text-xl font-bold mb-4">But we&apos;re more than just fast delivery</h2>
  <p class="text-lg mb-8">We&apos;re passionate about bringing you the best possible selection of products, from top brands you trust to exciting new discoveries. Our friendly customer service team is always here to help, and we offer secure checkout and easy returns for total peace of mind.</p>

  <h3 class="text-lg font-bold mb-4">The Andamo Express Team:</h3>
  <div class="">
    <div class="flex flex-col items-center space-x-4">
    <Image
  src={founders}
  alt='andamo team'
  width={200}
  height={200}
  className='rounded-xl w-[90%] sm:w-3/4 h-[60vh] object-cover'
  unoptimized={true} // Disable optimization
/>
     {/* <img class="w-16 h-16 rounded-full object-cover" src="path/to/image1.jpg" alt="Team member 1"> */}
      <div className="flex flex-col sm:flex-row my-4 gap-x-3">
      <div className=''>
        <p class="text-base font-bold">Daniel Agyapong (Left) </p>
        <p class="text-gray-600">Founder / Team Leader</p>
      </div>
      <div>
        <p class="text-base font-bold">Samuel Aduboffour (Right)</p>
        <p class="text-gray-600">Team Membrer.</p>
      </div></div>
    </div>
  
  
  </div>

  <p class="text-lg mt-8 text-center">We&apos;re more than just an online store, we&apos;re your partner in getting what you need, fast! So why wait? Start shopping at Andamo Express today!</p>

  <Link href='/' class="mx-auto bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mt-4 block w-max">Shop Now</Link>
</div>
    </div>
  )
}

export default Page