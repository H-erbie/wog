'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Input } from "@/components/ui/input";

import { Loader2 ,Home} from "lucide-react";
import { auth, db } from "@/firebase/config";
import {
  updateProfile,
  updatePhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import aim from "@/public/signup.jpg";
const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [err, setErr] = useState("");
  const [user] = useAuthState(auth);

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [userInfo, setUserInfo] = useState({
    fname: '',
    email: "",
    password: "",
   
  });

  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const { fname, email, password } = userInfo;
  // auth.currentUser
  const handleChange = async ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    // console.log(phone, profile.phoneNumber)
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      if (!res) {
        setErr("Network/Input Error! Try again");
        setUserInfo({
          ...userInfo,
          email: "",
          fname:'',
          password: "",
        });
        setLoading(false); // console.log(res)
      }
        const user = auth.currentUser;

      
        // console.log(docRef);
        // update user
        updateProfile(auth.currentUser, {
          displayName: fname,
          // email: profile.displayName,
        });

        storageSession.setItem(
          "wog-user",
          JSON.stringify({
            email: email,
            displayName: fname, // Use default if displayName not found
           
          })
        );
        sendEmailVerification(user && user);

        setUserInfo({
          ...userInfo,
          email: "",
          fname: "",
          password: "",
        });
        setLoading(false);
        router.replace("/verify-email");
  
    } catch (error) {
      setLoading(false);
      setErr("Network/Input Error! Try again");
      console.error(error);
    }
  };
  return (
    <>
    <p className="mr-auto ml-9 absolute top-6 w-max hover:underline font-bold text-lg ">
          <Link href="/" className='flex gap-x-3'>Go Home <Home/></Link>
        </p>
    <div className="flex items-center h-screen p-5 justify-center  lg:flex-row-reverse gap-x-10">
      <Image
        src={
          // urlForImage(siteInfo?.images)
          aim
        }
        sizes='responsive'
        width={180}
        height={150}
        alt="stat section background image"
        className="sm:w-3/4 w-[85%] hidden lg:block lg:w-1/2 bg-red-200  lg:mx-0 rounded-3xl mx-auto object-cover"
      />
      <form onSubmit={handleSubmit} className="sm:w-3/4 mx-auto w-[85%]  lg:w-1/2 flex flex-col gap-y-6">
      <h3 className="sm:text-4xl text-center lg:text-left text-3xl mb-9 lg:ml-40 mx-auto lg:mx-0 w-52 font-bold">Sign <span className="text-[#F53D3D]">Up</span> </h3>
      <Input
          type="text"
          className="border w-full border-red-500 focus:outline-red-300 rounded-xl px-3 py-2"
          placeholder="Enter name"
            name="fname"
            value={fname}
            onChange={handleChange}
        />
        <Input
          type="email"
          className="border w-full border-red-500 focus:outline-red-300 rounded-xl px-3 py-2"
          placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleChange}
        />
        <Input
          type="password"
          className="border w-full border-red-500 focus:outline-red-300 rounded-xl px-3 py-2"
          placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleChange}
        />


        <button type="button" disabled={loading || email === '' || fname === '' || password === ''} className='disabled:opacity-50 mx-auto w-3/4 rounded-xl hover:scale-[1.1] transition-all px-3 bg-[#F53D3D] font-bold text-white py-2'>Sign up</button>
       <p className="text-center">Already have an account? <Link className='font-semibold hover:underline' href='/auth/sign-in'>Sign in</Link></p>
      </form>
    </div>
    </>
  );
};

export default Page;
