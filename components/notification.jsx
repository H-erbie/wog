"use client";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/firebase/config";

import { CONFIG } from "@/config/config";
import { Phone, Bell, MessageSquare } from "lucide-react";

import Link from "next/link";

const notificationsSupported = () =>
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window;

export default function Notifications() {
 
  const [user] = useAuthState(auth);
  const getSubscription = async () => {
    const ORIGIN = window.location.origin;
    const BACKEND_URL = `${ORIGIN}/api/push/${user.uid}`;
  
    const response = await fetch(BACKEND_URL, {
      method: "GET",      
    });
  };
  
  const subscribe = async () => {
    await unregisterServiceWorkers();

    const swRegistration = await registerServiceWorker();
    await window?.Notification.requestPermission();

    try {
      const options = {
        applicationServerKey: CONFIG.PUBLIC_KEY,
        userVisibleOnly: true,
      };
      const subscription = await swRegistration.pushManager.subscribe(options);

      await saveSubscription({ subscription, user });
      console.log({ subscription });
    } catch (err) {
      console.error("Error", err);
    }
  };
 if (!notificationsSupported()) {
    return <h3>Please install the PWA first!</h3>;
  }
  return (
    <>
      {/* <h3>WebPush PWA</h3> */}
      <button
        onClick={subscribe}
        className="p-3 rounded-[100%] border dark:border-zinc-700
hover:bg-blue-50
dark:hover:bg-[#292e36]  dark:bg-[#1f2227]
bg-background"
      >
        <Phone />
      </button>

      <button
              onClick={getSubscription}

        className="p-3 rounded-[100%] border dark:border-zinc-700
hover:bg-blue-50
dark:hover:bg-[#292e36]  dark:bg-[#1f2227]
bg-background"
      >
        <Bell />
      </button>
    </>
  );
}

export const unregisterServiceWorkers = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((r) => r.unregister()));
};

const registerServiceWorker = async () => {
  return navigator.serviceWorker.register("/service.js");
};

const saveSubscription = async (subscription) => {
  const ORIGIN = window.location.origin;
  const BACKEND_URL = `${ORIGIN}/api/push`;

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
};

