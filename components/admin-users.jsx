"use client";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import { Input } from "./ui/input";
import { Loader2, User2, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";


// Assuming you already have initialized Firebase in your Next.js app

const AdminUsers = () => {
  const { toast } = useToast();

  const [user] = useAuthState(auth);
  const isManager = user?.email === "danielmarcos8@gmail.com"|| "herbertsbusinesses@gmail.com";
  const [ads, setAds] = useState([]);
  const usersRef = collection(db, "users"); 
  const q = query(usersRef, where("isAdmin", "==", true));
  const getAdminUsers = async () => {
    const querySnapshot = await getDocs(q);
    const admins = [];

    querySnapshot.forEach((doc) => {
      admins.push(doc.data());
    });
    setAds(admins);
    return admins;
  };
  useEffect(() => {
    getAdminUsers();
  }, [q]);
  // console.log(ads)
  const [remove, setRemove] = useState(false);
  const [add, setAdd] = useState(false);
  const addAdmin = async (emailValue, isAdmin) => {
    try {
      setAdd(true);
      const db = getFirestore();
      const usersRef = collection(db, "users");

      const q = query(usersRef, where("email", "==", emailValue));

      const querySnapshot = await getDocs(q);

      // Check if a document was found
      if (querySnapshot.size === 0) {
        console.error("No user found with contact:", emailValue);
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

      // Update the isAdmin field
      await updateDoc(userDoc.ref, { isAdmin });
      setAdd(false);
      console.log("Admin status updated for user:", emailValue);
      toast({
        title: `Added new admin!`,
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
      setAdminInput('')
    } catch (error) {
      setAdd(false);
      console.log(error);
      toast({
        title: `Admin addition failed!`,
        variant: "destructive",
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
    }
  };
  const [ind, setInd] = useState(0)
  const delAdmin = async (emailValue, isAdmin, index) => {
    try {
      setRemove(true);
      setInd(index)
      const db = getFirestore();
      const usersRef = collection(db, "users");

      const q = query(usersRef, where("email", "==", emailValue));

      const querySnapshot = await getDocs(q);

      // Check if a document was found
      if (querySnapshot.size === 0) {
        console.error("No user found with contact:", emailValue);
        return;
      }
      const userDoc = querySnapshot.docs[0];

      // Update the isAdmin field
      await updateDoc(userDoc.ref, { isAdmin });
      toast({
        title: `Removed an admin!`,
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
      console.log("Admin status updated for user:", emailValue);
      setRemove(false);
      setInd(0)
    } catch (error) {
      setRemove(false);
      setInd(0)

      console.log(error);
      toast({
        title: `admin removal failed`,
        variant: "destructive",
        // description: "Product added to cart",
        // action: <Link href="/cart">Open Cart</Link>,
      });
    }
  };
  const [adminInput, setAdminInput] = useState("");
  const isUserDataStored = JSON.parse(sessionStorage.getItem("andamo-user"));

  return (
    <div>
      <div className="">
      <h2 className="text-xl text-center my-3 font-bold">You</h2>
<div className="flex items-center flex-col justify-center">
<User2 className="w-24 h-24"/>
<p> <span className='font-semibold'> Name:</span> {isUserDataStored.displayName}</p>
<p><span className='font-semibold'> Role:</span> Admin😎</p>
</div>
        {ads.length > 1 && <h2 className="text-xl text-center my-3 mt-6 font-bold">Fellow Admins</h2>}
<div className={`${ads.length  === 0 ? "" : "grid grid-cols-1 md:grid-cols-2 place-items-center"}   `}>

        {ads.length  === 0 ?<div className='my-3 w-max mx-auto'> <Loader2 className='animate-spin'/> </div>: ads.map((admin, index) => {
         if(admin.email !== user.email) return (
            <div key={index} className="flex dark:bg-[#3c3d3f] bg-gray-200 p-3 rounded-lg flex-col gap-y-2 sm:flex-row  my-3 sm:items-center  gap-x-3">
              {" "}
              <p>{admin.email}</p>{" "}
              {isManager && (
                <button
                  className="bg-red-400 flex gap-x-2 hover:opacity-[.8] ml-auto dark:bg-red-500 rounded-lg p-2"
                  onClick={() => delAdmin(admin.email, false, index)}
                >
                  {remove && ind === index ? (
                    <>
                      <Loader2 className="animate-spin" /> removing admin...
                    </>
                  ) : (
                    <>
                      Remove <Trash />
                    </>
                  )}
                </button>
              )}{" "}
            </div>
          );
        })}
      </div></div>
      {/* <div className=""> */}
      {isManager && (
        <div className='flex mt-6 flex-col gap-x-3 w-[90%] sm:w-3/4 mx-auto items-center'>
 <label htmlFor="admin" className="mb-2">
                Add admin by email
              </label>         
              <div className="flex gap-x-2 items-center">
              <Input
            id="admin"
            name="admin"
            type="text"
            autoComplete="off"
            placeholder="example@gmail.com"
            value={adminInput}
            required
            className="h-9 w-3/4  dark:border-zinc-600 focus:outline-yellow-200 dark:focus:outline-yellow-300"
            onChange={(e) => setAdminInput(e.target.value)}
          />
          <button disabled={add||!adminInput} className='flex rounded-xl p-2 hover:opacity-[.8] cursor-pointer bg-yellow-500 p-1 gap-x-2 items-center' onClick={() => addAdmin(adminInput, true)}>
            {add ? (
              <>
                <Loader2 className="animate-spin" /> Adding...
              </>
            ) : (
              <>
                {" "}
                Add <User2 />
              </>
            )}
          </button>
              </div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default AdminUsers;
