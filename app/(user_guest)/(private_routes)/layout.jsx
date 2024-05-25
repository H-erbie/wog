'use client'
import React,{useEffect} from "react";
import {redirect} from 'next/navigation'
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
export default  function PrivateLayout ({children}){
    const [user] = useAuthState(auth);
    const isUserDataStored = JSON.parse(sessionStorage.getItem("andamo-user"))
    useEffect(()=> {
        if(!user || !isUserDataStored) redirect('/auth/sign-in')
    },[isUserDataStored, user])
    return <>{children}</>
}