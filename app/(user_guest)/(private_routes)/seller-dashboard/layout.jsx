"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

export default function PrivateLayout({ children }) {
  const isSeller = JSON.parse(sessionStorage.getItem("andamo-user"));
  useEffect(() => {
    if (isSeller?.spr !== 'YW5kYW1vLXVzZXI=') redirect("/");
  }, [isSeller]);
  return <>{children}</>;
}
