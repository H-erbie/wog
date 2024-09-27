
'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import aim from "@/public/signin.jpg";
import { redirect, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

import { Loader2, Home } from "lucide-react";
// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth, db } from "@/firebase/config";
// import { doc, getDoc } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import firebase_app from "../config";
// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// const auth = getAuth(firebase_app);

// export default async function signUp(email, password) {
//     let result = null,
//         error = null;
//     try {
//         result = await createUserWithEmailAndPassword(auth, email, password);
//     } catch (e) {
//         error = e;
//     }

//     return { result, error };
// }
const Page = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  // const [
  //   signInWithEmailAndPassword,
  //   signInError,
  // ] = useSignInWithEmailAndPassword(auth);
  // const [user] = useAuthState(auth);
  // const user = auth.currentUser;

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInfo;
  const handleChange = async ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   setError(null);
  //   // console.log(email, password)
  //   try {
  //     const response = await signInWithEmailAndPassword(email, password);
  //     //  console.log(response)
  //     console.log(response);
  //     if (response && response.user) {
  //       // Handle invalid credentials error
  //       //     const docRef = doc(db, "users", response.user.uid);
  //       // const docSnap = await getDoc(docRef);
  //       // const userData = docSnap.data();
  //       // if (userData) {
  //       // console.log(userData)

  //       storageSession.setItem(
  //         "wog-user",
  //         JSON.stringify({
  //           email: response.user.email,
  //           displayName: response.user.displayName || "", // Use default if displayName not found
  //         })
  //       );
  //       setUserInfo({
  //         ...userInfo,
  //   email: "",
  //   password: "",
  //       })
  //       router.replace("/");

  //       // }
  //     } else {
  //       setUserInfo({
  //         ...userInfo,

  //   email: "",
  //   password: "",
  // })
  //       setError("Invalid Credentials! Please try again.");
  //       // setIsLoading(false);
  //     }
  //   } catch (error) {
  //     setUserInfo({
  //       ...userInfo,

  //   email: "",
  //   password: "",
  // })
  //     setError("An error occurred! Please check your network and try again.");
  //     // setIsLoading(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <p className="mr-auto  ml-9 absolute top-6 w-max hover:underline font-bold text-lg ">
        <Link href="/" className="flex gap-x-3">
          Go Home <Home />
        </Link>
      </p>
      <div className="flex h-screen p-5 items-center justify-center  lg:flex-row gap-x-10">
        <Image
          src={
            // urlForImage(siteInfo?.images)
            aim
          }
          sizes="responsive"
          width={180}
          height={150}
          alt="stat section background image"
          className="sm:w-3/4 w-[85%] hidden lg:block lg:w-1/2 bg-red-200  lg:mx-0 rounded-3xl mx-auto object-cover"
        />
        <form  className="sm:w-3/4 mx-auto w-[85%]  lg:w-1/2 flex flex-col gap-y-6">
          <h3 className="sm:text-4xl text-center lg:text-left text-3xl mb-9 lg:ml-40 mx-auto lg:mx-0 w-52 font-bold">
            Sign <span className="text-[#F53D3D]">In</span>{" "}
          </h3>

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

          <button    type="button"       disabled={loading || email === '' || password === ''}
 className="mx-auto w-3/4 disabled:opacity-50 flex gap-x-3 rounded-xl hover:scale-[1.1] justify-center transition-all px-3 bg-[#F53D3D] text-white font-bold py-2">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
            </>
          ) : (
            "Sign in"
          )}
          </button>
          <p className="text-center">
            Need an account?{" "}
            <Link className="font-semibold hover:underline" href="/auth/sign-up">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Page;
