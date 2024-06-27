"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
export default function PrivateLayout({ children }) {
  const [user] = useAuthState(auth);
  const isUserDataStored = JSON.parse(sessionStorage.getItem("andamo-user"));
// console.log(!user?.emailVerified)
  useEffect(() => {
    if ((!user && !isUserDataStored) || !isUserDataStored) {
      // console.log('tempTry  ')
      sessionStorage.setItem('temp-url', JSON.stringify('/cart/checkout'))
      redirect("/auth/sign-in"); 
    } 
  }, [isUserDataStored, user]);
  useEffect(() => {
    if (!user?.emailVerified){
      
      redirect("/verify-email/reverify-email");
      
    }
  }, [user]);
  return <>{children}</>;
}
