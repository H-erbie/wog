"use client";
import { Home, ShoppingCart, User, ChevronUp, Users2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { ThemeToggle } from "./themeToggle";
import {
  LogOut,
  Bell,
  MessageCircle,
  Truck,
  ChevronDown,
  ShieldHalf,
  ShoppingBag,
  ArrowDownUp,
  Download,
  Shield,
  Plus,
  User2,
  BarChart,
  View,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HiOutlineHome } from "react-icons/hi2";
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
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetFooter,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  const { cartCount } = useShoppingCart();
  const [userRole, setUserRole] = useState({});
  const [user] = useAuthState(auth);
  const username = user && user?.displayName;
  const profileName = username && username.split("");
  const getRole = async () => {
    const docRef = doc(db, "users", user && user.uid);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    setUserRole(docSnap.data());
  };
  if (pathname.startsWith("/admin-dashboard"))
    return (
        <div className="lg:w-1/2 w-full fixed z-50 left-0 sm:left-[13%] md:left-[17%] lg:left-[25%]  bottom-0  sm:bottom-6  flex md:w-2/3 sm:w-3/4 sm:mx-auto p-2 px-4  justify-between border-gray-300 sm:rounded-3xl items-center sm:border  border-t dark:border-zinc-600 bg-white dark:bg-[#191c22]">
          <Link href="/admin-dashboard/overview" className="">
            <div className="rounded-[100%] w-max mx-auto dark:hover:bg-[rgb(41,46,54)] hover:bg-secondary p-3">
              <View className="" />
            </div>
            <p className="text-center hidden sm:block">Overview</p>
          </Link>
          <Link href="/admin-dashboard/admins" className="">
            <div className="rounded-[100%] dark:hover:bg-[rgb(41,46,54)] hover:bg-secondary p-3">
              <User2 className="mx-auto w-max" />
            </div>
            <p className="text-center hidden sm:block"> Admins</p>
          </Link>
          <Link href="/admin-dashboard/orders" className="">
            <div
              className="p-3 rounded-[100%]   
hover:bg-secondary
dark:hover:bg-[#292e36]  
bg-background"
            >
              <ArrowDownUp />
            </div>
            <p className="text-center hidden sm:block"> Orders</p>
          </Link>

          
              <Link href="/admin-dashboard/products">
                <div className="p-3 cursor-pointer relative mx-auto w-max rounded-[100%] hover:bg-secondary dark:hover:bg-[#292e36]">
                  <ShoppingBag className="" />
                   {/* <span className=" text-base animate-ping bg-yellow-500 w-2 h-2 rounded-[100%] font-bold absolute top-[1px]  right-1"></span> */}

                </div>{" "}
                <p className="text-center text-base hidden sm:block ">Products</p>
            </Link>

         { user?.uid === 'XlXX0oq60kbjoeIi2S3Pm0VJ4nq2' && <Link href="/admin-dashboard/messages" className="">
            <div className="rounded-[100%] dark:hover:bg-[#292e36] w-max mx-auto hover:bg-secondary p-3">
              <MessageCircle className="w-7 h-7 " />
            </div>{" "}
            <p className="text-center hidden sm:block">Messages</p>
          </Link>}
          <Link href="/admin-dashboard/special-roles" className="">
            <div className="rounded-[100%] dark:hover:bg-[#292e36] w-max mx-auto hover:bg-secondary p-3">
              <Users2 className="w-7 h-7 " /> 
            </div>{" "}
            <p className="text-center hidden sm:block">S/D</p>
          </Link>
         {/* {!pathname.endsWith("/checkout") && <ThemeToggle />} */}
        </div>
    );

  return (
    <div className="p-2 sm:hidden fixed z-50 left-0  bottom-0 justify-between w-screen flex border-t dark:border-gray-600 bg-white dark:bg-[#191c22] items-center">
      <Link
        href="/"
        className="rounded-[100%] dark:hover:bg-[rgb(41,46,54)] hover:bg-secondary p-3"
      >
        <HiOutlineHome className="text-3xl" />
      </Link>

      <Link
        href="/chats"
        className="p-3 rounded-[100%] sm:my-4  
hover:bg-gray-200
dark:hover:bg-[#292e36]  
bg-background"
      >
        <MessageCircle />
      </Link>

      {/* <Sheet>
        <SheetTrigger asChild>
          <Button
            className="relative flex rounded-[100%] dark:hover:bg-[#292e36]"
            size="sm"
            variant="ghost"
          >
            <Bell className="" />
            <span className="  animate-ping bg-yellow-500 w-2 h-2 rounded-[100%] font-bold absolute top-[1px]  right-3"></span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="px-0 dark:bg-[#191c22] py-1 justify-between h-full duration-0 min-h-[100vh] overflow-y-scroll"
        >
          <SheetHeader>Notifications</SheetHeader>
        </SheetContent>
      </Sheet> */}

      <Link
        href="/cart"
        className="rounded-[100%] dark:hover:bg-[#292e36] relative hover:bg-secondary p-3"
      >
        <ShoppingCart className="w-7 h-7" />
        <span className="ml-2 text-base font-bold absolute -top-2  right-2">
          {cartCount}
        </span>
      </Link>
      {/* <Link
        href={user ? "/profile" :"/auth/sign-in"}
        className="rounded-[100%] dark:hover:bg-[#292e36] relative hover:bg-secondary p-3"
      >
        <User2 className="w-7 h-7" />
        
      </Link> */}
      {!pathname.endsWith("/checkout") && <ThemeToggle />}
    </div>
  );
};

export default MobileNav;
