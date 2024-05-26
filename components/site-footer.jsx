"use client";

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation";
import Socials from "./socials";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

const SiteFooter = ({siteInfos}) => {
  const pathname = usePathname()

  if (pathname.startsWith("/auth") || pathname.startsWith("/admin-dashboard")) return null;

  return (
    <footer className="border-t border-gray-200 pb-20 dark:border-zinc-600">
      <div className="mx-auto max-w-7xl overflow-hidden  lg:px-8">
      <div className="flex gap-6 my-5 sm:my-10 md:gap-10 w-max mx-auto">
      {siteInfos.map(siteInfo => (
      <Link href="/" key={siteInfo._id} className="flex  items-center justify-center space-x-2">
        {/*LOGO*/}
        <Image src={urlForImage(siteInfo.images).url()} width={180} height={150} alt="LOGO" className="text-yellow-500 min-w-[6rem] w-48 h-16"/>
        
      </Link>
    ))}
    </div>
        <nav
          className="grid grid-cols-1 w-3/4 mx-auto sm:grid-cols-2 md:grid-cols-3 "
          aria-label="Footer"
        >
          {siteConfig.footer.map((item) => (
            <div key={item.name} className="w-max ">
              <Link href={item.href} className="text-sm  leading-6">
                <Button variant='link'>
                {item.name}
                </Button>
              </Link>
            </div>
          ))}
        </nav>
        <div className='flex w-[90%] sm:w-max mx-auto gap-x-3 mt-4 cursor-pointer'>
        <Socials/>
        </div>
        <Link
          href="/"
          className="mt-5 block text-center text-base leading-5"
        >
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </Link>
        <p className="text-center">Developed by <Link
          href="https://kojo-herbie.netlify.app"
        >
                          <span  className="text-base hover:underline text-start text-yellow-500 "
>

          Kojo Herbie</span>
        </Link> </p>
        
      </div>
    </footer>
  )
}
export default SiteFooter;
