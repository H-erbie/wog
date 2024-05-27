"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
export default function PrivateLayout({ children }) {
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user.uid !== "XlXX0oq60kbjoeIi2S3Pm0VJ4nq2")
      redirect("/admin-dashboard/overview");
  }, [user]);
  return <>{children}</>;
}
