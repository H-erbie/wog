// "use client";
import React from "react";
import Link from "next/link";
import { User, Check } from "lucide-react";
const VerifyEmailClient = () => {
  return (
    <div className="h-screen flex flex-col gap-y-3 items-center justify-center">
      <div className="flex items-center  gap-x-2">
        <User className="h-16 w-16" />
        <span className="p-3 rounded-[100%] bg-green-500">
          <Check className="h-16 w-16  text-white" />
        </span>
      </div>
      <p className="text-lg text-center lg:w-3/4 font-semibold md:mx-auto">
        A verification link was sent to your email (expires in 24hrs).
      </p>
      <div className="flex sm:flex-row flex-col gap-y-6 sm:gap-y-0 gap-x-10 items-center">
      <Link
        href="/"
        className="underline bg-gray-100 rounded-lg transition-all dark:bg-[#292e36] hover:bg-gray-200 p-3"
      >
        Start shopping
      </Link>
        <Link href="/verify-email/reverify-email" className="bg-green-100 underline rounded-lg p-3 dark:bg-green-600">
          Re-verify Email
        </Link>
      </div>
    </div>
  );
};
export default VerifyEmailClient;
