"use client";
import React,{useEffect} from "react";
import { redirect } from "next/navigation";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
export default function PrivateLayout({ children }) {
  const [user] = useAuthState(auth);
  const isVerified =  user && user?.emailVerified;
  useEffect(()=>{
    if (!user || isVerified) redirect("/");

      },[user, isVerified])
  return <>{children}</>;
}
