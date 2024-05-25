"use client";
import React, { useState } from "react";
import { ShoppingBag, Loader2, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import MiniNav from "@/components/mini-nav";
import {
  setDoc,
  doc,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [textToCopy, setTextToCopy] = useState("+233 59 227 1400");
  const { toast } = useToast();
  const router = useRouter();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: `Contact copied!`,
        // variant: "destructive",
        //     // description: "Product added to cart",
        //     // action: <Link href="/cart">Open Cart</Link>,
      });
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      toast({
        title: `Copy failed!`,
        variant: "destructive",
        //     // description: "Product added to cart",
        //     // action: <Link href="/cart">Open Cart</Link>,
      });
    }
  };
  const categories = [
    { name: "Fashion and Apparel", value: "Fashion and Apparel" },
    { name: "Beauty and Personal Care", value: "Beauty and Personal Care" },
    { name: "Home and Garden", value: "Home and Garden" },
    { name: "Electronics and Computers", value: "Electronics and Computers" },

    { name: "Groceries and Food", value: "Groceries and Food" },
    { name: "Health and Wellness", value: "Health and Wellness" },
    { name: "Toys and Games", value: "Toys and Games" },
    { name: "Pet Supplies", value: "Pet Supplies" },
    { name: "Sports and Outdoors", value: "Sports and Outdoors" },
    { name: "Arts and Crafts", value: "Arts and Crafts" },
    { name: "Books and Media", value: "Books and Media" },
    {
      name: "Stationery and Office Supplies",
      value: "Stationery and Office Supplies",
    },
    { name: "Luxury Goods", value: "Luxury Goods" },
  ];
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "Become a seller", link: "" },
    // { text: "T&C's of becoming a seller", link: "" },
  ];
  const isUserDataStored = JSON.parse(sessionStorage.getItem("andamo-user"));
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [business, setBusiness] = useState({
    name: "",
    location: "",
    sellerName: isUserDataStored?.displayName,
    sellerContact: isUserDataStored?.phoneNumber,
    paymentMethod: "",
  });
  const { name, location, sellerContact, paymentMethod, sellerName } = business;

  const [user] = useAuthState(auth);

  const handleSeller = ({ target }) => {
    const { name, value } = target;
    setBusiness({ ...business, [name]: value });
  };

  const registerBusiness = async (e) => {
    e.preventDefault();
    setLoading(true);
    const currentCategory = e.target[5].value;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", user.email));

    try {
      const querySnapshot = await getDocs(q);

      const docRef = await setDoc(doc(db, "sellers", user && user.uid), {
        name,
        location,
        sellerContact,
        paymentMethod,
        sellerName,
        category: currentCategory,
      });
      if (querySnapshot.size === 0) {
        console.error("No user found with contact:", contactValue);
        setAdd(false);
        toast({
          title: `No admin with such contact`,
          variant: "destructive",
          // description: "Product added to cart",
          // action: <Link href="/cart">Open Cart</Link>,
        });
        return;
      }

      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, { specialRole: "andamo-seller" });
      isUserDataStored.spr = 'YW5kYW1vLXVzZXI='
      sessionStorage.setItem("andamo-user", JSON.stringify(isUserDataStored));

      sessionStorage.setItem(
        "andamo-seller",
        JSON.stringify({
          name: name,
          location,
          sellerContact,
          paymentMethod,
          sellerName,
          category: currentCategory,
        })
      );
      setLoading(false);
      setBusiness({
        ...business,
        name: "",
        location: "",
        sellerName: isUserDataStored?.displayName,
        sellerContact: isUserDataStored?.phoneNumber,
        paymentMethod: "",
      });
      setCategory("");
      router.replace("/seller-dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // console.log(business);
  return (
    <div className="main pt-16">
      <MiniNav links={miniLinks} />

      <h1 className="text-xl my-3 font-bold flex items-center gap-x-2 mx-auto">
        Register Business <ShoppingBag />
      </h1>

      <Tabs defaultValue="form">
        <TabsList classname="lg:text-lg mx-auto mt-4 text-sm md:text-base">
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="call">Call</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <form onSubmit={registerBusiness} className="flex flex-col gap-y-3">
            <div className="w-[90%]  gap-x-2 sm:w-3/4 mx-auto">
              <label>Name of Business</label>
              <Input
                type="text"
                value={name}
                onChange={handleSeller}
                required
                name="name"
                id="name"
                className=""
              />
            </div>
            <div className="w-[90%]  gap-x-2 sm:w-3/4 mx-auto">
              <label>Location of Business</label>

              <Input
                type="text"
                value={location}
                onChange={handleSeller}
                required
                name="location"
                id="location"
                className=""
              />
            </div>
            <div className="w-[90%] gap-x-2 sm:w-3/4 mx-auto">
              <label>Payment Method</label>

              <div className="flex items-center gap-x-3">
                <div className="flex gap-x-3">
                  <label>MoMo</label>

                  <Input
                    type="radio"
                    value="MoMo"
                    onChange={handleSeller}
                    required
                    name="paymentMethod"
                    id="paymentMethod"
                    className="h-5"
                  />
                </div>
                <div className="flex gap-x-3">
                  <label>Card</label>

                  <Input
                    type="radio"
                    value="card"
                    onChange={handleSeller}
                    required
                    name="paymentMethod"
                    id="paymentMethod"
                    className="h-5"
                  />
                </div>
              </div>
            </div>
            <Select required className="w-[90%] gap-x-2 sm:w-3/4 mx-auto">
              <SelectTrigger className="w-[90%] gap-x-2 sm:w-3/4 mx-auto dark:border-zinc-600">
                <SelectValue placeholder="choose a category" />
              </SelectTrigger>
              <SelectContent className="focus:outline-none bg-background  dark:bg-[#292e36] dark:border-zinc-600 border-black ">
                <SelectGroup className="grid grid-cols-2">
                  {categories.map((category) => (
                    <SelectItem
                      value={category.value}
                      key={category.name}
                      className="dark:hover:bg-[#191c22]"
                      onClick={() => setCategory(category.value)}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex w-[90%] gap-x-2 sm:w-3/4 items-center mx-auto">
              <Input
                type="checkbox"
                value="card"
                required
                id="paymentMethod"
                className="h-5 w-max"
              />
              <span>
                Agree to{" "}
                <Link
                  href="/become-seller/seller-terms-and-conditions"
                  className="underline"
                >
                  Terms and Conditions
                </Link>
              </span>
            </div>
            <button
              type="submit"
              // onClick={uploadVideoAd}
              disabled={loading}
              className="py-2 flex gap-x-3 items-center justify-center px-3 mx-auto disabled:opacity-50  w-3/4 sm:w-1/2 bg-yellow-200 dark:bg-yellow-500"
            >
              {" "}
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> registering business...
                </>
              ) : (
                "Become a seller"
              )}
            </button>
          </form>
        </TabsContent>
        <TabsContent
          value="call"
          className="flex flex-col items-center justify-center"
        >
          <Phone className="mx-auto w-16 h-16" />
          <h2 className="w-max my-3">
            Call the contact below. We will guide you to register your business
            on Andamo.
          </h2>
          <div className="flex w-full flex-col sm:flex-row items-center sm:w-1/2 justify-between">
            <p className="font-semibold text-lg">Contact: +233 59 227 1400</p>
            <button
              onClick={copyToClipboard}
              className="bg-yellow-200 py-2 px-3 dark:bg-yellow-500 rounded-lg"
            >
              click to copy contact
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
