"use client";
import React, { useEffect, useState } from "react";
// import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import MiniNav from "@/components/mini-nav";
import { Loader2 } from "lucide-react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThemeToggle } from "@/components/themeToggle";
const Page = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  // const [user] = useAuthState(auth);
  const user = auth.currentUser

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInfo;
    const [data, setData] = useState(null)
    const [seller, setSeller] = useState(null)
    const [driver, setDriver] = useState(null)
    const tempUrl = JSON.parse(sessionStorage.getItem("temp-url"));

  // Handle user data retrieval on successful sign-in
  useEffect(() => {
  const fetchUserData = async () => {
    if (user) {
      // Check if user exists before fetching data
      const userUID = user.uid;
      const docRef = doc(db, "users", userUID);
      const docSnap = await getDoc(docRef);
      setData(docSnap.data());
      const sellRef = doc(db, "sellers", userUID);
      const sellSnap = await getDoc(sellRef);
      setSeller(sellSnap.data());
      // console.log(sellSnap.data())
      const driveRef = doc(db, "drivers", userUID);
      const driveSnap = await getDoc(driveRef);
      setDriver(driveSnap.data());
      // console.log(data);
     if(seller && data?.specialRole === 'andamo-seller'){
      sessionStorage.setItem(
        "andamo-seller",
        JSON.stringify({
          name: seller.name,
          location: seller.location  ,// Use default if displayName not found
          sellerContact: seller.sellerContact,
          paymentMethod: seller.paymentMethod,
          sellerName: seller.sellerName,
          category: seller.category, // Use default if contact not found
        })
      );
      } 
      if(driver  && data?.specialRole === 'andamo-driver'){
      sessionStorage.setItem(
        "andamo-driver",
        JSON.stringify({
          email: driver.email,
          available: driver.available,
          contact: driver.contact
           // Use default if contact not found
        })
      );
      } 
      
      if (data) {
        sessionStorage.setItem(
          "andamo-user",
          JSON.stringify({
            email: user.email,
            displayName: user.displayName || "", // Use default if displayName not found
            phoneNumber: data.contact || "",
            spr: data?.specialRole === 'andamo-seller' ? "YW5kYW1vLXVzZXI=": data?.specialRole === 'andamo-driver' ? "YW5kYW1vLWRyaXZlcg==" : "",
            you: data.isAdmin
              ? "VHzq5s2t+vEV6uwcukPyaxzLq42/jxy4spIrHSyXsZY="
              : "96s7+Dgc6paXOiR7NwkubA==", // Use default if contact not found
          })
        );
        data.isAdmin
          ? router.replace("/admin-dashboard/overview")
          : tempUrl ? router.replace(tempUrl) : router.replace("/");
      }
      
    }
  };


  //   if (user) {
  //     // Fetch data only after successful sign-in
      fetchUserData();
  //   }
  }, [user, data, seller, driver]);
  // console.log(data);
  const handleChange = async ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null)
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (!res) {
        setIsLoading(false);
        setError("Network/Input Error! Try again");
      }
      if (res) {

        setUserInfo({ ...userInfo, email: "", password: "" });
        setIsLoading(false);
        // router.replace('/')
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError("Network/Input Error! Try again");
    }
  };
  // useEffect(() => {
  //   getDocc()
  // }, [router]);
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "sign-in", link: "" },
  ];
  return (
    <div className="main items-center justify-center gap-7 p-0 ">
      {/* <div className="absolute top-5 right-3"><ThemeToggle/></div> */}
      <MiniNav links={miniLinks} />
      <h2 className="text-xl capitalize font-bold">sign in</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        <div className="space-y-1">
          <Label htmlFor="email" className="text-base font-medium">
            Email
          </Label>

          <Input
            id="email"
            name="email"
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
          <Label htmlFor="password" className="text-base font-medium">
            Password
          </Label>

          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            placeholder="password123"
            value={password}
            onChange={handleChange}
            className="h-9 lg:w-[300px] dark:border-zinc-600 focus:outline-yellow-200 dark:focus:outline-yellow-300"
            //   defaultValue={defaultSearchQuery}
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          type="submit"
          className="text-lg flex border-zinc-600 items-center dark:hover:bg-[#292e36]"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> signing in...
            </>
          ) : (
            "sign in"
          )}
        </Button>
        <Link href="/auth/forgot-password" className="hover:underline">
          Forgot password?
        </Link>

        <p className="text-lg">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up">
            {" "}
            <Button variant="link" className="text-yellow-400  text-lg">
              sign up{" "}
            </Button>{" "}
          </Link>
        </p>
      </form>
      {error ? <p className="text-red-600 text-lg">{error}</p> : null}{" "}
    </div>
  );
};

export default Page;
