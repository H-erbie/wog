"use client";
import React, { useState,useEffect } from "react";
import { LogOut, User2, Truck, Briefcase, CarFront, ChevronDown, ShieldHalf, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { client, sanityFetch } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Avatar = () => {
  const isUserDataStored = JSON.parse(sessionStorage.getItem("andamo-user"))
  const [userRole, setUserRole] = useState({});
  const [user] = useAuthState(auth);
  const username = isUserDataStored?.displayName;
  const profileName = username && username.split('')

  const getRole = async () => {
    if(user){
      const docRef = doc(db, "users", user && user.uid);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    setUserRole(docSnap.data());
    }
  };

  useEffect(()=>{
    getRole()
  },[user, userRole])
  const router = useRouter()
  const revalidateOrders = async() => {
    const orders = await sanityFetch({
      query: groq`*[_type == "orders"]`,
      tags:["orders"]
    })
    console.log(orders)
    router.replace('/orders')

  }
  if (isUserDataStored) {
    // console.log(user);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="text-lg dark:hover:bg-[#292e36] px-2 py-2 rounded-md  capitalize flex items-center cursor-pointer font-bold sm:mx-2">
            {profileName && profileName[0]}
            <ChevronDown className='text-yellow-400'/>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-b-[0.01px] dark:bg-[#292e36]  dark:border-zinc-600 border-slate-200">
          <DropdownMenuGroup>
          
            <Link href="/orders" >
              <DropdownMenuItem 
              // onClick={revalidateOrders}
               className="dark:hover:bg-[#191c22]">
                <Truck className="mr-2 h-4 w-4" />
                <span>Track Order</span>
              </DropdownMenuItem>
            </Link>
            <Link href={isUserDataStored?.spr === 'YW5kYW1vLXVzZXI=' ? "/seller-dashboard" : isUserDataStored?.spr === 'YW5kYW1vLWRyaXZlcg==' ? "/driver-dashboard" : !isUserDataStored?.spr ? "/become-seller" : '/auth/sign-in'}>
              <DropdownMenuItem className="dark:hover:bg-[#191c22]">
                {isUserDataStored.spr === 'YW5kYW1vLXVzZXI=' ? <Briefcase className="mr-2 h-4 w-4" /> : isUserDataStored.spr === 'YW5kYW1vLWRyaXZlcg==' ? <CarFront className="mr-2 h-4 w-4" /> : <ShoppingBag className="mr-2 h-4 w-4" />}
                {isUserDataStored.spr === 'YW5kYW1vLXVzZXI=' ? <span>Seller&apos;s Dashboard </span> : isUserDataStored.spr === 'YW5kYW1vLWRyaXZlcg==' ? <span>Driver Dashboard </span>: <span>Become a Seller </span>}
              </DropdownMenuItem>
            </Link>
            <Link href="/profile">
              <DropdownMenuItem className="dark:hover:bg-[#191c22]">
                <User2 className="mr-2 h-6 w-6" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="dark:hover:bg-[#191c22]" onClick={() =>{ 
              signOut(auth)
              sessionStorage.removeItem('andamo-user')
              sessionStorage.removeItem('andamo-seller')
              sessionStorage.removeItem('andamo-driver')
              sessionStorage.removeItem('temp-url')

              }}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
        {/* <button onClick={() => signOut(auth)}>log out</button>*/}
      </DropdownMenu>
    );
  }
  return (
    <Link href="/auth/sign-in">
      <Button size="sm" variant="ghost" className="flex px-1 py-1 dark:hover:bg-[#292e36]   items-center gap-2">
        <User2 className="h-6 w-6 text-yellow-500" />
        <span className="capitalize font-semibold block text-base">
          sign in
        </span>
      </Button>
    </Link>
  );
};

export default Avatar;
