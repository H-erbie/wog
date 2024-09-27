'use client'
import React,{useEffect} from "react";
import {redirect} from 'next/navigation'
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase/config";

export default  function PrivateLayout ({children}){
    // const isUserDataStored = JSON.parse(sessionStorage.getItem("wog-user"))
    // const [user] = useAuthState(auth);

    // useEffect(()=> {
    //     if((!user && isUserDataStored) || !isUserDataStored ) redirect('/auth/sign-in')
    // },[isUserDataStored, user])

    return <>{children}</>
}