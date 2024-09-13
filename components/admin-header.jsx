"use client";
import React from "react";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { User2 } from "lucide-react";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { ThemeToggle } from "./themeToggle";

const AdminHeader = ({ siteInfos }) => {
  const [user] = useAuthState(auth);

  const pathname = usePathname();

  if (
    pathname.startsWith("/admin-dashboard") &&
    !pathname.endsWith("/messages")
  )
    return (
      <div className="flex w-screen px-5 z-50 bg-white dark:bg-[#131418] border-b fixed top-0 left-0 border-gray-200 dark:border-zinc-600 justify-between items-center  p-2 gap-6 md:gap-10 ">
        {siteInfos.map((siteInfo) => (
          <Link
            href="/admin-dashboard"
            key={siteInfo._id}
            className="flex  items-center justify-center space-x-2"
          >
            {/*LOGO*/}
            <Image
              src={urlForImage(siteInfo?.images)}
              width={180}
              height={150}
              alt="LOGO"
              className="text-pink-400 min-w-[6rem] w-32 h-10"
            />
          </Link>
        ))}

        <div className="flex gap-x-3 items-center">
          <Link
            href="/admin-dashboard/admins"
            className="flex dark:hover:bg-[#292e36]  relative hover:bg-secondary p-2 rounded-lg gap-x-3 items-center"
          >
            <p>{user?.displayName?.split(" ")[0]}</p>
            <div className="">
              <User2 className="w-7 h-7" />
            </div>
          </Link>
          <button
            className="py-2 rounded-lg flex gap-x-3 items-center justify-center px-3 mx-auto disabled:opacity-50  w-3/4 sm:w-1/2 bg-yellow-200 hover:bg-yellow-300 dark:hover:bg-yellow-600 dark:bg-yellow-500"
            onClick={() => {
              signOut(auth);
              localStorage.removeItem("andamo-user");
              localStorage.removeItem("andamo-seller");
              localStorage.removeItem("andamo-driver");
              sessionStorage.removeItem("temp-url");
            }}
          >
            Logout
          </button>
          {!pathname.endsWith("/checkout") && <ThemeToggle />}
        </div>
      </div>
    );
};

export default AdminHeader;
