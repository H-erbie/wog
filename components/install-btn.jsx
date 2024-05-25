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
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  getDocs,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname } from "next/navigation";

const InstallBtn = () => {
  const [user] = useAuthState(auth);
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  useEffect(() => {
    const handler = (e) => {
        e.preventDefault();
        setSupportsPWA(true);
        setPromptInstall(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
},[])
const onInstallClick = () => {
     if (!supportsPWA) {
         alert(
             'Either you have already installed the app or your browser does not support PWA :('
         );
         return;
     }
     promptInstall.prompt();
 };


  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default mini-infobar from appearing
      event.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleClickInstall = async () => {
    if (deferredPrompt) {
      // Show install prompt to the user
      deferredPrompt.prompt();

      // Wait for the user's response
      const { outcome } = await deferredPrompt.userChoice;
      // Log the outcome (accepted, dismissed, etc.)
      console.log(`User response to install prompt: ${outcome}`);

      // Reset deferredPrompt
      setDeferredPrompt(null);
    }
  };

  const [roomId, setRoomId] = useState(uuidv4());
  const filterRoomsByUserId = async (userId) => {
    try {
      const roomsCollection = collection(db, "rooms");
      const roomsQuery = query(
        roomsCollection,
        where("userIds", "array-contains", userId)
      );
      const roomsSnapshot = await getDocs(roomsQuery);

      const filteredRoomIds = [];
      roomsSnapshot.forEach((doc) => {
        filteredRoomIds.push(doc.id);
      });
      console.log(filteredRoomIds);
      return filteredRoomIds;
    } catch (error) {
      console.error("Error filtering rooms by user ID:", error);
      return []; // Return empty array on error
    }
  };

  const sendWelcomeMessage = async (userId, adminId) => {
    try {
      await setDoc(doc(db, "rooms", roomId), {
        userIds: [userId, adminId],
      });
      const messageRef = collection(db, `rooms/${roomId}/messages`);
      const timestamp = Date.now();
      const message = {
        content: `Welcome to the chat room, ${user.displayName}!
           Your order of ID, ORDER_ID has been recieved.
           We're working on it to send it your way very soo.
           If anything bothers you don't hesitate to chat us about it
           Patienceis key!.`,
        timestamp: timestamp,
        user: "Andamo Team",
        roomId: roomId,
        userId: adminId,
      };
      await addDoc(messageRef, message);
    } catch (error) {
      console.error("Error sending welcome message:", error);
    }
  };
  if (pathname.startsWith("/admin-dashboard")) return null;

  return (
    <div className="sm:flex z-40 hidden flex-col fixed bottom-5 right-2 gap-y-3">
      {/* <Notifications /> */}
      {/* <button
      onClick={onInstallClick}
          className="p-3 rounded-[100%] border dark:border-zinc-700
hover:bg-blue-50
dark:hover:bg-[#292e36]  dark:bg-[#1f2227]
bg-background"
        >
          <DownloadIcon />
        </button> */}
      {!pathname.startsWith("/chats") && (
        <Link
          href="/chats"
          className="p-3 rounded-[100%] border dark:border-zinc-700
hover:bg-blue-50
dark:hover:bg-[#292e36]  dark:bg-[#1f2227]
bg-background"
        >
          <MessageCircle />
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
