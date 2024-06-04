"use client";
import { DownloadIcon, Bell, MessageCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ThemeToggle } from "./themeToggle";
import Link from "next/link";
import Notifications from "./notification";

import { v4 as uuidv4 } from "uuid";
import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname } from "next/navigation";
// import {
//   doc,
//   getDoc,
//   collection,
//   getDocs,
//   onSnapshot,
//   query,
//   where,
// } from "firebase/firestore";

const InstallBtn = () => {
  const [user] = useAuthState(auth);
  const pathname = usePathname();

  if (pathname.startsWith("/admin-dashboard")) return null;
  
  return (
    <div className="sm:flex z-40 hidden flex-col fixed bottom-5 right-2 gap-y-3">
      
      {!pathname.startsWith("/chats") && (
        <Link
          href="/chats"
          className="p-3 relative rounded-[100%] border dark:border-zinc-700
hover:bg-blue-50
dark:hover:bg-[#292e36]  dark:bg-[#1f2227]
bg-background"
        >
          <MessageCircle />
          {/* {Object.entries(unreadMessageCounts).length > 0 && (
              <span className="ml-2 text-base font-bold px-2 text-white bg-yellow-500 rounded-[100%] absolute -top-2  right-0">
                {Object.values(unreadMessageCounts).reduce(
                  (acc, count) => acc + count,
                  0
                )}
              </span>
            )} */}
        </Link>
      )}
      {!pathname.endsWith("/checkout") && <ThemeToggle />}
      {/* <Dialog className='absolute top-0'>
    <DialogTrigger>
    <div className="dld-btn    dark:border border-black border-[0.5]  cursor-pointer hover:scale-[1.1]  rounded-[100%] p-3 dark:bg-white overflow-hidden bg-pink-400 ">
      {" "}
      <DownloadIcon className="h-6 w-6 text-white dark dark:text-pink-400" />
    </div></DialogTrigger>
    <DialogContent>
    <DialogHeader>
      <DialogTitle>Install app now</DialogTitle>
      <DialogDescription>
        Install this app on your device for easy and effecient accessibility and performance🚀
      </DialogDescription>
      <DialogClose><DialogFooter className='bg-pink-400 w-max px-3 py-1 rounded-md ml-auto'>Install</DialogFooter></DialogClose>
    </DialogHeader>
  </DialogContent>
    </Dialog> */}
    </div>
  );
};

export default InstallBtn;
