"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

export default function PrivateLayout({ children }) {
  const isSeller = JSON.parse(sessionStorage.getItem("andamo-user"));
  const isUserDataStored = JSON.parse(sessionStorage.getItem("andamo-user"));
// console.log(!user?.emailVerified)
  useEffect(() => {
    if ( !isUserDataStored) {
      sessionStorage.setItem('temp-url', JSON.stringify('/become-seller'))
      redirect("/auth/sign-in"); 
    } 
  }, [isUserDataStored]);
  useEffect(() => {
    if (isSeller?.spr === 'YW5kYW1vLXVzZXI='){
      
      redirect("/");

    }
  }, [isSeller]);
  return <>{children}</>;
}
