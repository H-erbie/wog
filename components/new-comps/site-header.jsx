"use client";

import Link from "next/link";
import React,{useState,useEffect} from 'react'
import { siteConfig } from "@/config/site";
import {
  User2,
  ShoppingCart,
  Search,
  X,
  Bell,
  Car,
  AlignJustify,
  Edit,
  ChevronDown,
  ShoppingBag,
  ChevronRight,
  Home, Briefcase, Phone, Album, Ticket, Group,
  AlignRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
// import Socials from "./socials";
// import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetFooter,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import MainNav from "./main-nav";
import MiniNav from "./mini-nav";
import Socials from "./socials";
const SiteHeader = () => {
  const sidemenuLinks = [
    {
      id: 1,
      text: "Events",
      link: "/events",
      icon: <Ticket />
    },
    {
      id: 1,
      text: "Gallery",
      link: "/gallery",
      icon: <Album />

    },
  
  ];
  const mainLinks = [
    {
      text: "Home",
      link: "/",
      icon: <Home />

    },
    {
      text: "About",
      link: "/about-us",
      icon: <Briefcase />

    },
    {
      text: "Contact",
      link: "/contact-us",
      icon: <Phone />

    },
  ];

  // import { usePathname } from "next/navigation";

  const pathname = usePathname();
    const [activeNavlink, setActiveNavlink] = useState(pathname);
    const makeLinkActive = (link) => {
      setActiveNavlink(link);
    };

    const [isNav, setIsNav] = useState(false)
    useEffect(() => {
      if(['/gallery','/events', '/', '/about-us', '/contact-us'].includes(pathname)){
        setIsNav(true)
      }
      else{
        setIsNav(false)
      
      }
      return () => {
      }
    }, [pathname, isNav])

    useEffect(()=>{
      setActiveNavlink(pathname)
    },[pathname, activeNavlink])

  if (pathname.startsWith("/auth")) return null;

  return (
    <>
      <NavigationMenu className="relative transition-all top-0 z-40 w-screen  border-transparent flex flex-col">
        <NavigationMenuList>
          <div className=" flex w-full items-center overflow-hidden justify-between px-3 sm:px-6  lg:mx-auto">
            {/* sidemenu */}
            <NavigationMenuItem>
              <MainNav />
            </NavigationMenuItem>
            <NavigationMenuItem className="text-center mr-16 lg:mr-0 w-max">
              <Link href="/" className="font-bold  text-sm sm:text-base">
                WILL OF GOD <span className="text-[#EE0505] "> FOUNDATION</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="lg:block hidden">
              <MiniNav />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className=" bg-[#EE0505]" size="sm" variant="primary">
                    <AlignRight className="text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-3 flex flex-col gap-y-3">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className=" font-bold transition-all p-3 py-2 bg-[#F53D3D] text-white rounded-lg "
                    ><SheetClose>
                      Donate</SheetClose>
                    </button>

                    <Link
                      href="/auth/sign-in"
                      className="font-bold py-2 mr-20 sm:mr-32 hover:underline"
                    >
                      <SheetClose>
                      SIGN IN</SheetClose>
                    </Link>
                  </div>
                  <div className="lg:hidden flex-col flex gap-y-3 border-gray-200 py-6 border-y ">
                    {mainLinks.map((link,index) => (
                      <Link key={index} href={link.link} className='text-left w-max'>
                        <SheetClose
                        key={index}
                          onClick={() => makeLinkActive(link.link)}
                          className={` 
                          ${
                            isNav && pathname.startsWith(link.link) &&
                            link.link === activeNavlink 
                              ? "bg-black text-white"
                              : ""
                          } font-semibold flex gap-x-3 px-3 py-2 rounded-lg text-xl hover:underline`}
                        >
                     <span className='text-red-500'>   {link.icon} </span> {link.text}
                        </SheetClose>
                      </Link>
                    ))}
                  </div>
                  <div className="flex pb-6 border-b border-gray-200 flex-col gap-y-3">
                    {sidemenuLinks.map((link) => (
                      <Link key={link.id} href={link.link} className='text-left w-max'>
                        <SheetClose
                          
                          key={link.id}
                          onClick={() => makeLinkActive(link.link)}
                          className={` 
                          ${
                            isNav && pathname.startsWith(link.link) &&
                            link.link === activeNavlink 
                              ? "bg-black text-white"
                              : ""
                          } font-semibold text-xl px-3 py-2 rounded-lg flex gap-x-3 hover:underline`}
                        >
                        <span className='text-red-500'>   {link.icon} </span>  {link.text}
                        </SheetClose>
                      </Link>
                    ))}
                  </div>
                  <SheetClose className="mt-28">
                  <Socials /></SheetClose>
                </SheetContent>
              </Sheet>
            </NavigationMenuItem>{" "}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
export default SiteHeader;
