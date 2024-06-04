"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";

import { doc, getDoc } from "firebase/firestore";
export default function PrivateLayout({ children }) {
  const isUserDataStored = JSON.parse(sessionStorage.getItem("andamo-user"));

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!isUserDataStored) signOut(auth);
  }, [isUserDataStored]);
  useEffect(() => {
    const fetchUserData = async () => {
      const userUID = user?.uid;
      const docRef = doc(db, "users", userUID);
      const docSnap = await getDoc(docRef);
      const retrievedData = docSnap.data();
      (retrievedData && retrievedData.isAdmin)
        ? isUserDataStored &&
          (isUserDataStored.you =
            "VHzq5s2t+vEV6uwcukPyaxzLq42/jxy4spIrHSyXsZY=")
        : isUserDataStored &&
          (isUserDataStored.you = "96s7+Dgc6paXOiR7NwkubA==");
      sessionStorage.setItem("andamo-user", JSON.stringify(isUserDataStored));
      // console.log(isUserDataStored)
    };

    if (user) {
      // Fetch data only after successful sign-in
      fetchUserData();
    }
  }, [user,isUserDataStored]);
  useEffect(() => {
    if (
      !isUserDataStored ||
     
      (isUserDataStored.you &&
       ( isUserDataStored.you === "96s7+Dgc6paXOiR7NwkubA=="))
    )
      redirect("/");
  }, [isUserDataStored]);
  return <>
  
  {children}
  
  </>;
}
