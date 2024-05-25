"use client";
import React, { useState, useEffect } from "react";
import MainNav from "./main-nav";
import { Button } from "./ui/button";
import {
  User2,
  ShoppingCart,
  Search,
  X,
  Bell,
  AlignJustify,
  Edit,
  ChevronDown,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./themeToggle";
// import { useSession } from "next-auth/react";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { signOut } from "firebase/auth";
import { useShoppingCart } from "use-shopping-cart";
import { siteConfig } from "@/config/site";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Socials from "./socials";
import UserInfo from "./user-info";
import Avatar from "./avatar";
import { Input } from "./ui/input";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SiteHeader = ({ products, siteInfos }) => {
  const [search, setSearch] = useState("");
  const handleChange = async ({ target }) => {
    const { value } = target;
    setSearch(value);
  };
  const router = useRouter();
  // const { data, status } = useSession();
  const [user] = useAuthState(auth);
  // const username = fullname.split(' ')
  const submitHandler = (event) => {
    event.preventDefault();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search");
    router.replace(`/?search=${searchQuery}`);
    setSearch("");
  };
  const { cartCount } = useShoppingCart();
  const pathname = usePathname();
  const [dropSearch, setDropSearch] = useState(false);
  const searchParams = useSearchParams();

  const defaultSearchQuery = searchParams.get("search") ?? "";

  let categories = [];
  const isUserDataStored = JSON.parse(sessionStorage.getItem("andamo-user"))
  products.map((product) => {
    product.categories.map((cat) => {
      if (!categories.includes(cat)) categories.push(cat);
    });
  });

  if (pathname.startsWith("/auth") || pathname.startsWith("/admin-dashboard")) return null;
  return (
    <>
      <NavigationMenu className="fixed transition-all top-0 z-40 w-screen  bg-white dark:bg-[#131418] border-b-[0.01px] border-gray-200 dark:border-zinc-700  flex flex-col">
        <NavigationMenuList>
          <div className=" flex h-16 w-full items-center overflow-hidden justify-between px-3 sm:px-6  lg:mx-auto">
            {/* sidemenu */}

            <NavigationMenuItem>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className=" dark:hover:bg-[#292e36]" size="sm" variant="primary">
                    <AlignJustify className="" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side={"left"}
                  className="px-0 dark:bg-[#191c22] py-1 justify-between h-full duration-0 min-h-[100vh] overflow-y-scroll"
                >
                  <SheetHeader className="flex-col flex p-2  dark:border-zinc-700 border-slate-200 ">
                    <SheetTitle className="flex justify-evenly items-center">
                      <Link href="/auth/sign-in">
                        {" "}
                        <SheetClose>
                          <Button
                            className="capitalize font-bold text-yellow-500 text-base"
                            variant="link"
                          >
                            <UserInfo isAuth={user} />
                          </Button>
                        </SheetClose>
                      </Link>
                      <div
                        className={
                          user
                            ? "sm:mr-11 mt-10 sm:mt-0 lg:hidden"
                            : "mr-11 lg:hidden"
                        }
                      >
                        {" "}
                        {/* <ThemeToggle /> */}
                      </div>
                    </SheetTitle>
                    {isUserDataStored && (
                      <SheetDescription className="border-t-[0.01px] dark:border-zinc-700 border-slate-200 text-base px-4 py-3 flex justify-between ">
                        <SheetClose className="capitalize hover:text-yellow-300">
                          <span onClick={() =>{ 
              signOut(auth)
              sessionStorage.removeItem('andamo-user')
              sessionStorage.removeItem('andamo-seller')
              sessionStorage.removeItem('andamo-driver')

              }}>log out</span>
                        </SheetClose>
                        <Link href="/profile">
                          <SheetClose className="capitalize hover:text-yellow-300">
                            profile
                          </SheetClose>
                        </Link>{" "}
                      </SheetDescription>
                    )}
                  </SheetHeader>
                  <Link href={isUserDataStored ? "/become-seller" : '/auth/sign-in'} >
                  <SheetClose className="border rounded-lg w-max gap-x-2 text-center mx-auto  px-6 py-3 hover:border-secondary dark:hover:bg-white bg-[#292e36] hover:bg-white text-white hover:text-black dark:hover:text-black dark:border-zinc-700 flex items-center ">
                          Become a seller <ShoppingBag className="text-yellow-500 "/>
                        </SheetClose></Link>
                  <div className="w-full h-5/6 px-2 py-3 flex flex-col justify-between">
                    <div className="pl-5">
                      <h2 className="capitalize py-3 font-bold text-xl">
                        shop by category
                      </h2>
                      {/* <ListCategories/> */}
                      <div className="flex px-3 flex-col">
                        {categories.splice(0, 8).map((category, index) => (
                          <Link
                            href={`/categories/${category.toLowerCase()}`}
                            key={index}
                          >
                            {" "}
                            <SheetClose className="capitalize hover:underline h-7 w-full text-start text-base py-0 ">
                              {category}
                            </SheetClose>
                          </Link>
                        ))}
                      </div>{" "}
                      <Link href="/categories">
                        <SheetClose className="capitalize flex items-center hover:underline w-full text-base text-start text-yellow-500">
                          see more categories <ChevronRight className="text-yellow-500 ml-3"/> {" "}
                        </SheetClose>{" "}
                      </Link>
                    </div>

                    <SheetFooter className="flex mt-3 py-5 border-t-[0.01px] dark:border-zinc-700 border-slate-200 flex-col sm:flex-col sm:justify-start gap-3 sm:space-x-0">
                      <div className="pl-5 flex flex-col gap-2 ">
                        {siteConfig.footer.map((link, index) => (
                          <Link href={link.href} key={index}>
                            <SheetClose
                              key={link.name}
                              className="text-base hover:underline text-start w-full"
                            >
                              {link.name}
                            </SheetClose>
                          </Link>
                        ))}
                      </div>
                      <SheetClose >
                        <div className="my-3 pl-3 flex sm:flex-wrap sm:flex-row flex-col gap-x-2 w-full  sm:mx-auto gap-y-2 border-t-[0.01px] dark:border-zinc-700 border-slate-200 pt-3">
                          <Socials siteInfos={siteInfos} />
                        </div>
                        
                      </SheetClose>

                    </SheetFooter>
                  </div>
                </SheetContent>
              </Sheet>
            </NavigationMenuItem>
            <NavigationMenuItem
              className={dropSearch ? "hidden lg:block" : "block"}
            >
              <MainNav siteInfos={siteInfos} />
            </NavigationMenuItem>
            <NavigationMenuItem
              className={dropSearch ? "block w-3/4 lg:w-[40%]" : "hidden lg:block"}
            >
              <form
                onSubmit={submitHandler}
                className=" items-center w-full inline-flex gap-2"
              >
                <Input
                  id="search"
                  name="search"
                  type="search"
                  required
                  autoComplete="off"
                  defaultValue={defaultSearchQuery}
                  placeholder="Search products..."
                  value={search}
                  onChange={handleChange}
                  className={
                    dropSearch
                      ? "h-9 sm:w-full lg:w-[300px] focus:outline-yellow-200 dark:border-zinc-700 dark:focus:outline-yellow-300 "
                      : "h-9 sm:w-full lg:w-[300px] hidden lg:block dark:border-zinc-700 focus:outline-yellow-200 dark:focus:outline-yellow-300"
                  }
                  //   defaultValue={defaultSearchQuery}
                />

                <Button
                  size="icon"
                  variant="secondary"
                  className={
                    dropSearch
                      ? "hover:bg-blue-100 flex w-max gap-2 p-3 dark:hover:bg-[#292e36]  dark:bg-[#1f2227] transition-all "
                      : "hover:bg-blue-100 hidden lg:flex w-max gap-2 p-3 dark:hover:bg-[#292e36] dark:bg-[#1f2227] transition-all"
                  }
                >
                  <Search className="h-5 w-5 lg:h-7 lg:w-7 text-yellow-500 " />
                  <p className="text-base capitalize font-semibold hidden sm:block">
                    search
                  </p>
                </Button>

                {dropSearch && (
                  <Button
                    variant="primary"
                    className="p-3 lg:hidden dark:hover:bg-[#292e36]  dark:bg-[#1f2227]"
                    type="button"
                    onClick={() => {
                      setDropSearch(false);
                      setSearch("");
                    }}
                  >
                    <X />
                  </Button>
                )}
              </form>
            </NavigationMenuItem>
            <NavigationMenuItem className={   dropSearch ?"hidden lg:block" : "hidden sm:block"}>
                           <DropdownMenu>
                <DropdownMenuTrigger className="outline-none focus:outline-none flex items-center gap-x-2 dark:hover:bg-[#292e36]  dark:bg-[#1f2227] p-2 rounded-lg ">Categories <ChevronDown className="text-yellow-500"/></DropdownMenuTrigger>
                <DropdownMenuContent className='dark:bg-[#1f2227] max-h-[80vh] overflow-y-scroll dark:border-zinc-700'>
                  {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                  {/* <DropdownMenuSeparator /> */}
                  {categories.map((category, index) => (
                          <Link
                            href={`/categories/${category.toLowerCase()}`}
                            key={index}
                          >
                            {" "}
                            <DropdownMenuItem className="capitalize dark:hover:bg-[#292e36]  pr-16 pl-2 hover:underline h-7 w-full text-start text-base py-0 ">
                              {category}
                            </DropdownMenuItem>
                          </Link>
                        ))}
                  {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <NavigationMenuTrigger className="dark:hover:bg-[#3f434a] font-medium text-base capitalize">
              categories
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-background w-3/4">
              <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] place-items-start">
                  <Link  href='' className="dark:hover:bg-[#3f434a] hover:bg-gray-100 rounded-md w-max p-1">
                    category
                  </Link>
                  <Link  href='' className="dark:hover:bg-[#3f434a] hover:bg-gray-100 rounded-md w-max p-1">
                    category
                  </Link>
                  <Link  href='' className="dark:hover:bg-[#3f434a] hover:bg-gray-100 rounded-md w-max p-1">
                    category
                  </Link>
                  <Link  href='' className="dark:hover:bg-[#3f434a] hover:bg-gray-100 rounded-md w-max p-1">
                    category
                  </Link>
                  <Link  href='' className="dark:hover:bg-[#3f434a] hover:bg-gray-100 rounded-md w-max p-1">
                    category
                  </Link>
                  <Link  href='' className="dark:hover:bg-[#3f434a] hover:bg-gray-100 rounded-md w-max p-1">
                    category
                  </Link>
                  <Link  href='' className="dark:hover:bg-[#3f434a] hover:bg-gray-100 rounded-md w-max p-1">
                    category
                  </Link>
              </ul>
            </NavigationMenuContent> */}
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="flex items-center sm:space-x-1 ">
                {process.env.NEXT_PUBLIC_SANITY_DATASET === "development" && (
                  <Link href="/studio">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-yellow-100 "
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  className={
                    dropSearch
                      ? "gap-2 py-4 px-3 lg:hidden hidden"
                      : "gap-2 flex sm:py-2 sm:px-3 dark:hover:bg-[#292e36]  w-max h-max lg:hidden "
                  }
                  onClick={() => setDropSearch(true)}
                >
                  <Search className=" w-6 h-6 sm:h-5 sm:w-5 text-yellow-500  " />
                  <span className="font-semibold text-base hidden sm:block ">
                    Search
                  </span>
                </Button>
                <div className={dropSearch ? "hidden lg:block" : "block "}>
                  <Avatar />
                </div>
                <Link
                  href="/cart"
                  className={dropSearch ? "hidden lg:block" : "hidden sm:block"}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="relative dark:hover:bg-[#292e36]   space-x-2 py-4 px-3 "
                  >
                    <ShoppingCart className="h-5 text-yellow-500 w-5" />
                    <span className="ml-2 text-base font-bold absolute -top-2  right-2">
                      {cartCount}
                    </span>
                    <span className="font-semibold text-base hidden sm:block">
                      Cart
                    </span>
                  </Button>
                </Link>
               
              </div>
            </NavigationMenuItem>
 
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
export default SiteHeader;
