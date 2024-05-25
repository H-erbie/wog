"use client";
import React, { useState } from "react";
import Link from "next/link";
import { X, User } from "lucide-react";
import { sendEmailVerification } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase/config";

const ReverifyEmail = () => {
  const [verify, setVerify] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const verifyUser = async() => {
    try {
      if(user){
        setVerify(true);
      await sendEmailVerification(user);
      setVerify(false);
      router.replace("/verify-email");
      }
    } catch (err) {
      console.log(err);
      setVerify(false);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-y-3 items-center justify-center">
      <div className="flex items-center  gap-x-2">
        <User className="h-16 w-16" />
        <span className="p-3 rounded-[100%] bg-red-500">
          <X className="h-16 w-16  text-white" />
        </span>
      </div>
      <p className="text-lg text-center lg:w-3/4 font-semibold md:mx-auto">
        Your email is not yet verified. Click on the button below to verify.
      </p>
      <button
        disable={verify}
        onClick={verifyUser}
        className="underline bg-gray-100 rounded-lg transition-all dark:bg-[#292e36] hover:bg-gray-200 p-3"
      >
        {verify ? "sending verfication link..." : " send verfication link"}
      </button>
    </div>
  );
};
export default ReverifyEmail;
