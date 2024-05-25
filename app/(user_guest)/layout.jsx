"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";

import { doc, getDoc } from "firebase/firestore";

export default function PrivateLayout({ children }) {
  const isUserDataStored = JSON.parse(sessionStorage.getItem("andamo-user"));

  const [user] = useAuthState(auth);
  const [seller, setSeller] = useState(null);
  const [driver, setDriver] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!isUserDataStored) signOut(auth);
  }, [isUserDataStored]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userUID = user.uid;
      const docRef = doc(db, "users", userUID);
      const sellRef = doc(db, "sellers", userUID);
      const driversRef = doc(db, "drivers", userUID);
      const docSnap = await getDoc(docRef);
      const sellSnap = await getDoc(sellRef);
      const driversSnap = await getDoc(driversRef);
      setData(docSnap.data());
      setSeller(sellSnap.data());
      setDriver(driversSnap.data());

      if (seller) {
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
      if (seller) {
        sessionStorage.setItem(
          "andamo-driver",
          JSON.stringify({
            email: driver.email,
            available: driver.available,
            contact: driver.contact,
            // Use default if contact not found
          })
        );
      }

      data && data.isAdmin
        ? isUserDataStored &&
          (isUserDataStored.you =
            "VHzq5s2t+vEV6uwcukPyaxzLq42/jxy4spIrHSyXsZY=")
        : isUserDataStored &&
          (isUserDataStored.you = "96s7+Dgc6paXOiR7NwkubA==");
      sessionStorage.setItem("andamo-user", JSON.stringify(isUserDataStored));
    };

    if (user) {
      // Fetch data only after successful sign-in
      fetchUserData();
    }
  }, [user, isUserDataStored, seller, data, driver]);
  // console.log('happened')
  useEffect(() => {
    // console.log('adm@')
    if (
      isUserDataStored?.you === "VHzq5s2t+vEV6uwcukPyaxzLq42/jxy4spIrHSyXsZY="
    ) {
      // console.log('adm')
      redirect("/admin-dashboard/overview");
    }
  }, [isUserDataStored]);
  return <>{children}</>;
}
