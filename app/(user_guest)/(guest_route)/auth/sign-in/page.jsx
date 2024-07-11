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
  const [signInWithEmailAndPassword, signInError] =
    useSignInWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);
  // const user = auth.currentUser;

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInfo;
  const [data, setData] = useState(null);
  const [seller, setSeller] = useState(null);
  const [driver, setDriver] = useState(null);
  const tempUrl = JSON.parse(sessionStorage.getItem("temp-url"));

  // useEffect(() => {
  //   if (user) {
  //     // Check if user exists
  //     fetchUserData();
  //   }
  // }, [user]);

  // Handle user data retrieval on successful sign-in
  // useEffect(() => {
  // const fetchUserData = async () => {
  //   // Check if user exists before fetching data
  //   const docRef = doc(db, "users", user.uid);
  //   const docSnap = await getDoc(docRef);
  //   const userData = docSnap.data();
  //   if (userData) {
  //     // console.log(userData)

  //     sessionStorage.setItem(
  //       "andamo-user",
  //       JSON.stringify({
  //         email: user.email,
  //         displayName: user.displayName || "", // Use default if displayName not found
  //         phoneNumber: userData.contact || "",
  //         spr:
  //           userData?.specialRole === "andamo-seller"
  //             ? "YW5kYW1vLXVzZXI="
  //             : userData?.specialRole === "andamo-driver"
  //             ? "YW5kYW1vLWRyaXZlcg=="
  //             : "",
  //         you: userData.isAdmin
  //           ? "VHzq5s2t+vEV6uwcukPyaxzLq42/jxy4spIrHSyXsZY="
  //           : "96s7+Dgc6paXOiR7NwkubA==", // Use default if contact not found
  //       })
  //     );

      // console.log(sellSnap.data())
      // if (userData.admin) {
      // router.replace("/admin-dashboard/overview");
      // }
      // console.log(data);
  //     if (userData.specialRole === "andamo-seller") {
  //       const sellRef = doc(db, "sellers", user.uid);
  //       const sellSnap = await getDoc(sellRef);
  //       setSeller(sellSnap.data());
  //       sessionStorage.setItem(
  //         "andamo-seller",
  //         JSON.stringify({
  //           name: seller.name,
  //           location: seller.location, // Use default if displayName not found
  //           sellerContact: seller.sellerContact,
  //           paymentMethod: seller.paymentMethod,
  //           sellerName: seller.sellerName,
  //           category: seller.category, // Use default if contact not found
  //         })
  //       );
  //     }
  //     if (userData.specialRole === "andamo-driver") {
  //       const driveRef = doc(db, "drivers", user.uid);
  //       const driveSnap = await getDoc(driveRef);
  //       const drive = driveSnap.data();
  //       sessionStorage.setItem(
  //         "andamo-driver",
  //         JSON.stringify({
  //           email: drive?.email,
  //           available: drive?.available,
  //           contact: drive?.contact,
  //           // Use default if contact not found
  //         })
  //       );
  //     }
  //     userData.isAdmin
  //       ? router.replace("/admin-dashboard/overview")
  //       : tempUrl
  //       ? router.replace(tempUrl)
  //       : router.replace("/");
  //     // const returnValue = userData.isAdmin ? "/admin-dashboard/overview" : tempUrl ? tempUrl : "/"
  //     // return returnValue;
  //   }
  // };

  //   if (user) {
  //     //     // Fetch data only after successful sign-in
  //     fetchUserData();
  //   }
  // }, [user, data, seller, driver]);
  // console.log(data);
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
  // if (response && response.user) {
  //   const { user } = response;
  //   await fetchUserData(user.uid);
  //   // console.log(user);
  // }
  // else{
  //   setError(response.error.message)
  // }
  //   } catch (error) {
  //     console.error(error);
  //     setError(error)

  //     setError("Invalid email or password. Please try again."); // More specific error message
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    // console.log(email, password)
    try {
      const response = await signInWithEmailAndPassword(email, password);
      //  console.log(response)

      if (response && response.user) {
        // Handle invalid credentials error
        const docRef = doc(db, "users", response.user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    if (userData) {
      // console.log(userData)

      sessionStorage.setItem(
        "andamo-user",
        JSON.stringify({
          email: response.user.email,
          displayName: response.user.displayName || "", // Use default if displayName not found
          phoneNumber: userData.contact || "",
          spr:
            userData?.specialRole === "andamo-seller"
              ? "YW5kYW1vLXVzZXI="
              : userData?.specialRole === "andamo-driver"
              ? "YW5kYW1vLWRyaXZlcg=="
              : "",
          you: userData.isAdmin
            ? "VHzq5s2t+vEV6uwcukPyaxzLq42/jxy4spIrHSyXsZY="
            : "96s7+Dgc6paXOiR7NwkubA==", // Use default if contact not found
        })
      );

      // console.log(sellSnap.data())
      // if (userData.admin) {
      // router.replace("/admin-dashboard/overview");
      // }
      // console.log(data);
      if (userData.specialRole === "andamo-seller") {
        const sellRef = doc(db, "sellers", response.user.uid);
        const sellSnap = await getDoc(sellRef);
        setSeller(sellSnap.data());
        sessionStorage.setItem(
          "andamo-seller",
          JSON.stringify({
            name: seller.name,
            location: seller.location, // Use default if displayName not found
            sellerContact: seller.sellerContact,
            paymentMethod: seller.paymentMethod,
            sellerName: seller.sellerName,
            category: seller.category, // Use default if contact not found
          })
        );
      }
      if (userData.specialRole === "andamo-driver") {
        const driveRef = doc(db, "drivers", response.user.uid);
        const driveSnap = await getDoc(driveRef);
        const drive = driveSnap.data();
        sessionStorage.setItem(
          "andamo-driver",
          JSON.stringify({
            email: drive?.email,
            available: drive?.available,
            contact: drive?.contact,
            // Use default if contact not found
          })
        );
      }
      userData.isAdmin
        ? router.replace("/admin-dashboard/overview")
        : tempUrl
        ? router.replace(tempUrl)
        : router.replace("/");
        }
        
    }else{
        setError("Invalid Credentials! Please try again.");
        // setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred! Please check your network and try again.");
      // setIsLoading(false);
    } finally {
      setIsLoading(false);
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
