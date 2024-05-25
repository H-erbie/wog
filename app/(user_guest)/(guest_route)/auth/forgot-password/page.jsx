"use client";
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import MiniNav from "@/components/mini-nav";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState(""); 
  const [error, setError] = useState(null);

  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = async ({ target }) => {
    const { value } = target;
    setEmail(value);
  };
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email)
        .then((data) => {
          alert("Password reset link was sent to your email");
          router.replace("/auth/sign-in");
          setIsLoading(false);
        })
        .catch((err) => {
          alert("Network/Input Error! Try again");
          setIsLoading(false);
        });
    } catch (error) {
      console.log("Network/Input Error! Try again");
      setIsLoading(false);
    }
    3;
  };

  const miniLinks = [
    { text: "home", link: "/" },
    { text: "sign in", link: "/auth/sign-in" },
    { text: "forgot password", link: "" },
  ];
  return (
    <div className="main items-center justify-center gap-7 p-0 ">
      <MiniNav links={miniLinks} />
      <h2 className="text-xl capitalize font-bold">change password</h2>
      <form onSubmit={handlePasswordReset} className="flex flex-col gap-5 ">
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
            className="h-9 lg:w-[300px] text-lg focus:outline-pink-200 dark:focus:outline-pink-300"
            //   defaultValue={defaultSearchQuery}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          type="submit"
          className="text-lg flex items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> sending link...
            </>
          ) : (
            "Change password"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Page;
