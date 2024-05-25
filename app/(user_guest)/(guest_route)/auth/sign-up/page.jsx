"use client";
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import MiniNav from "@/components/mini-nav";
import { generateRandomNumber } from "@/lib/verifyToken";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";
import { auth, db } from "@/firebase/config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import {
  updateProfile,
  updatePhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { ThemeToggle } from "@/components/themeToggle";
import { useAuthState } from "react-firebase-hooks/auth";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [err, setErr] = useState("");
  const [user] = useAuthState(auth);

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "+233",
    emailCode: "",
  });
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const { fname, lname, email, password, phone } = userInfo;
  // auth.currentUser
  const handleChange = async ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const profile = {
    displayName: `${fname} ${lname}`,
    phoneNumber: phone,
  };
  // auth.up

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
          fname: "",
          lname: "",
          phone: "",
          password: "",
        });
        setLoading(false); // console.log(res)
      }
        const user = auth.currentUser;

        const docRef = await setDoc(doc(db, "users", user && user.uid), {
          isAdmin: false,
          isUser: true,
          contact: profile.phoneNumber,
          email: email,
          specialRole: ''
        });
        // console.log(docRef);
        // update user
        updateProfile(auth.currentUser, {
          displayName: profile.displayName,
          // email: profile.displayName,
        });

        sessionStorage.setItem(
          "andamo-user",
          JSON.stringify({
            email: user.email,
            displayName: profile.displayName, // Use default if displayName not found
            phoneNumber: profile.phoneNumber, // Use default if contact not found
            you: "96s7+Dgc6paXOiR7NwkubA==",
            spr: '',
          })
        );
        sendEmailVerification(user && user);

        setUserInfo({
          ...userInfo,
          email: "",
          fname: "",
          lname: "",
          phone: "",
          password: "",
        });
        setLoading(false);
        router.replace("/verify-email");
      // axios.post(
      //   "https://api.chatengine.io/users/",
      //   {
      //     username: user.email,
      //     secret: user.uid,
      //     email: user.email,
      //     full_name: user.displayName,
      //   },
      //   { headers: { "Private-Key": "b5f35cbd-1251-4361-b6ca-b591b0a3d56e" } }
      // );
    } catch (error) {
      setLoading(false);
      setErr("Network/Input Error! Try again");
      console.error(error);
    }
  };
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (user) { // Check if user exists before fetching data
  //       const userUID = user.uid;
  //       const docRef = doc(db, "users", userUID);
  //       const docSnap = await getDoc(docRef);
  //       const retrievedData = docSnap.data();
  //       if (retrievedData) {
  //
  //       }
  //     }
  //   };

  //   if (user) { // Fetch data only after successful sign-in
  //     fetchUserData();
  //   }
  // }, [user]);
  // axios.delete("https://api.chatengine.io/users/me/", {
  //   headers: {
  //     "Project-ID": "7fbb7572-32bc-4219-b84f-89618a67cc09",
  //     "User-Name": user.email,
  //     "User-Secret": user.uid,
  //   },
  // });
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "sign-up", link: "" },
  ];
  return (
    <div className="main items-center justify-center gap-7 p-0">
      {/* <div className="absolute top-5 right-3"><ThemeToggle/></div> */}
      <MiniNav links={miniLinks} />
      <h2 className="text-xl capitalize font-bold">sign up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="fname" className="text-base font-medium">
              First Name
            </Label>
            <Input
              id="fname"
              name="fname"
              type="text"
              autoComplete="off"
              placeholder="Kojo"
              value={fname}
              required
              onChange={handleChange}
              className="h-9 lg:w-[300px] dark:border-zinc-600 focus:outline-yellow-200 dark:focus:outline-yellow-300"
              //   defaultValue={defaultSearchQuery}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lname" className="text-base font-medium">
              Last Name
            </Label>

            <Input
              id="lname"
              name="lname"
              required
              type="text"
              autoComplete="off"
              placeholder="Anokye"
              value={lname}
              onChange={handleChange}
              className="h-9 lg:w-[300px] dark:border-zinc-600 focus:outline-yellow-200 dark:focus:outline-yellow-300"
              //   defaultValue={defaultSearchQuery}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="text-base font-medium">
              Email
            </Label>

            <Input
              id="email"
              name="email"
              required
              type="email"
              autoComplete="off"
              placeholder="email@example.com"
              value={email}
              onChange={handleChange}
              className="h-9 lg:w-[300px] dark:border-zinc-600 focus:outline-yellow-200 dark:focus:outline-yellow-300"
              //   defaultValue={defaultSearchQuery}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="text-base font-medium">
              Phone
            </Label>
            {/* <PhoneInput country={'gh'} placeholder="123456789"  onChange={handleChange} value={phone}/> */}
            <Input
              id="phone"
              name="phone"
              required
              type="text"
              autoComplete="off"
              placeholder="+233123456789"
              value={phone}
              onChange={handleChange}
              className="h-9 lg:w-[300px] dark:border-zinc-600 focus:outline-yellow-200 dark:focus:outline-yellow-300"
              //   defaultValue={defaultSearchQuery}
            />
          </div>
          <div className="space-y-1 sm:col-span-2 ">
            <Label htmlFor="password" className="text-base font-medium">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              required
              type="password"
              autoComplete="off"
              placeholder="password123"
              value={password}
              onChange={handleChange}
              className="h-9 lg:w-[300px] dark:border-zinc-600 focus:outline-yellow-200 dark:focus:outline-yellow-300"
              //   defaultValue={defaultSearchQuery}
            />
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          type="submit"
          disabled={loading}
          className="text-lg flex mx-auto  border-zinc-600
          dark:hover:bg-[#292e36] w-full max-w-[250px] items-center"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> signing up...
            </>
          ) : (
            "sign up"
          )}
        </Button>
        <div id="recaptcha-container"></div>
        {/* <Link href='#'>Forgot password</Link> */}
        <p className="text-lg">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-in">
            {" "}
            <Button variant="link" className="text-yellow-400 text-lg">
              sign in{" "}
            </Button>{" "}
          </Link>
        </p>
      </form>
      <p className="text-red-600 text-lg">{err}</p>{" "}
    </div>
  );
};

export default Page;
