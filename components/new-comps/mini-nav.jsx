"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
// import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const MiniNav = () => {
  const pathname = usePathname();
  const [activeNavlink, setActiveNavlink] = useState(pathname);
  const makeLinkActive = (link) => {
    setActiveNavlink(link);
  };
  // console.log(activeNavlink)
  const links = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "About",
      link: "/about-us",
    },
    {
      text: "Contact",
      link: "/contact-us",
    },
  ];
  const [isNav, setIsNav] = useState(false)
  useEffect(() => {
    if(['/','/about-us', '/contact-us'].includes(pathname)){
      setIsNav(true)
    }
    else{
      setIsNav(false)
    
    }
    console.log(pathname)
    return () => {
    }
  }, [pathname, isNav])

  useEffect(()=>{
    setActiveNavlink(pathname)
  },[pathname, activeNavlink])
  return (
    <div className="flex  items-center gap-x-9">
      {links.map((link, index) => (
        <Link
          href={link.link}
          onClick={() => makeLinkActive(link.link)}
          className={` ${ isNav && pathname.startsWith(link.link) &&
            link.link === activeNavlink 
              ? "bg-[#F53D3D] text-white"
              : ""
          } transition-all font-thin border border-transparent hover:scale-[1.1] px-3  py-1 rounded-lg`}
          key={index}
        >
          {link.text}
        </Link>
      ))}
      <Link href="/auth/sign-in" className="font-bold hover:underline">
        SIGN IN
      </Link>
    </div>
  );
};

export default MiniNav;
