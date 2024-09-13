"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

export default function PrivateLayout({ children }) {
  const isSeller = JSON.parse(localStorage.getItem("andamo-user"));
  useEffect(() => {
    if (!isSeller?.spr === 'YW5kYW1vLWRyaXZlcg==') redirect("/");
  }, [isSeller]);
  return <>{children}</>;
}
