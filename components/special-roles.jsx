'use client'
import React, {useState, useEffect} from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    getFirestore,
    collection,
    updateDoc,
    query,
    where,
    addDoc,
    getDocs,
    doc,setDoc
  } from "firebase/firestore";
  import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import { Input } from "./ui/input";
import { Loader2, User2, CarFront, ShoppingBag, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import NoOrders from "./no-orders";

const SpecialRoles = () => {
    const { toast } = useToast();
    const [adminInput, setAdminInput] = useState('')
    const [user] = useAuthState(auth);
    const [sellers, setSellers] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const usersRef = collection(db, "sellers"); 
    const driversRef = collection(db, "drivers"); 
    // const q = query(usersRef, where("specialRole", "==", 'andamo-seller'));
    const getAdminUsers = async () => {
      const querySnapshot = await getDocs(usersRef);
      const queryDriverSnapshot = await getDocs(driversRef);
      const sells = [];
        const drives = []
      querySnapshot.forEach((doc) => {
        sells.push(doc.data());
      });
      queryDriverSnapshot.forEach((doc) => {
        drives.push(doc.data());
      });
      setSellers(sells);
      setDrivers(drives)
      return {sells, drives};
    };
    useEffect(() => {
      getAdminUsers();
    }, [usersRef, driversRef]);
    // console.log(ads)
    // const [remove, setRemove] = useState(false);
    const [add, setAdd] = useState(false);

    const addDriver = async(email) => {
        setAdd(true)
        try {
            const usersRef = collection(db, "users");

            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size === 0) {
                toast({
                    title: `There is no user with email ${email}`,
                    variant: "destructive",
                    // description: "Product added to cart",
                    // action: <Link href="/cart">Open Cart</Link>,
                  });
                  setAdd(false)

            }
            const userDoc = querySnapshot.docs[0];
            // console.log(userDoc.id)
                await updateDoc(userDoc.ref, { specialRole: "andamo-driver" });
                const driversCollection = collection(db, "drivers");
                const docRef = doc(driversCollection, userDoc.id); // Create doc reference with custom ID
                await setDoc(docRef, {
                  email,
                  contact: userDoc.data().contact,
                  available: false,
                  // Add other driver specific fields here
                });
            setAdd(false)
            setAdminInput('')
        } catch (error) {
            console.error(error)
            setAdd(false)

        }
    }


  return (
    <div>
         <Tabs defaultValue="sellers" className="">
        <TabsList className="lg:text-lg mx-auto mt-4 text-sm md:text-base">
          <TabsTrigger value="sellers">Sellers</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
        </TabsList>
        <TabsContent value='sellers' >
        {
          sellers.length === 0 ? <NoOrders text="No Sellers" /> : 
          <div className='grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3'>
         { sellers.map((seller, index) => (

                <div key={index} className='flex w-max dark:bg-[#3c3d3f] bg-gray-200 p-3 rounded-lg  gap-y-2  my-3 sm:items-center  gap-x-3'>
                                <ShoppingBag/>

                <span>{seller.name}</span>-<span>{seller.sellerContact}</span></div>
            ))}</div>
        }
        </TabsContent>
        <TabsContent value='drivers' className='pb-32'>
           
        {
           drivers.length === 0 ? <NoOrders text="No Drivers" />
: <> <div className='grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3'> 
       {  drivers.map((driver, index) => (

                <div key={index} className='flex relative w-[90%] sm:w-max dark:bg-[#3c3d3f] bg-gray-200 p-3 rounded-lg gap-y-2  my-3 items-center  gap-x-3'>
                <div className={`rounded-[100%] absolute top-0 right-0 p-1 ${driver?.available ? "bg-green-500" : "bg-red-500" }`}></div>
                <CarFront/>
                <div className='flex-col flex sm:items-center'><span className='break-words '>{driver.email} </span>
                <span>{driver?.contact}</span></div></div>
            ))}</div>
            
            </>
        }
         <div className='flex flex-col gap-x-3 w-[90%] sm:w-3/4 mx-auto items-center'>
 <label htmlFor="admin" className="mb-2">
                Add driver by email
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
          <button disabled={add||!adminInput} className='flex rounded-xl p-2 hover:opacity-[.8] cursor-pointer bg-yellow-500 p-1 gap-x-2 items-center' onClick={() => addDriver(adminInput)}>
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

        </TabsContent>
            </Tabs>
    </div>
  )
}

export default SpecialRoles