"use client";
import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
import {
  EmailAuthCredential,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import MiniNav from "@/components/mini-nav";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { IoLogOutSharp } from "react-icons/io5";
import { FaDeleteLeft } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";
// import VerifyDialog from "@/components/verify-dialog";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const Page = () => {
  const router = useRouter();
  const [mode, setMode] = useState({
    editMode: false,
    deleteMode: false,
  });
  const [loading, setLoading] = useState({
    edit: false,
    update: false,
    changePassword: false,
    logout: false,
    deleteUser: false,
  });

  const [userData, setUserData] = useState({});
  const [user] = useAuthState(auth);
  const userUID = user && user.uid;
  const docRef = doc(db, "users", user && userUID);

  const getDocc = async () => {
    const docSnap = await getDoc(docRef);
    const fetchedData = docSnap.data();
    setUserData({ ...userData, ...fetchedData });  };

  const currentUser = auth.currentUser;
  const name = currentUser?.displayName;
  const username = name && name.split(" ");
  const currentPhone = currentUser?.phoneNumber;
  const currentEmail = currentUser?.email;
  const avatar = name && name?.split("");
  const userId = currentUser?.uid;
  const [showDeleteUserForm, setShowDeleteUserForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fname: username && username[0],
    lname: username && username[1],
    email: currentEmail,
    // currentPassword: "",
    // password: currentPswd,
    phone: currentPhone,
    id: userId,
  });

  const { fname, lname, email, phone, deleteFormPassword } = userInfo;
  // const [showPassword, setShowPassword] = useState(false);
  // const comparePassword = async () => {
  //   const compare = await bcrypt.compare(currentPassword, password);
  //   if (compare) {
  //     setUserInfo({ ...userInfo, password: "", currentPassword: "" });
  //     setShowPassword(true);
  //   } else {
  //     console.log("password incorrect. try again");
  //   }

  //   return compare;
  // };

  // const isAuth = status === "authenticated";
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "user profile", link: "" },
  ];

  // update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, update: true });
    try {
      updateProfile(auth.currentUser, {
        displayName: `${fname} ${lname}`,
      });
      await updateDoc(docRef, { contact: phone });
      setLoading({ ...loading, update: false });
    } catch (error) {
      console.log(error);
      setLoading({ ...loading, update: false });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, changePassword: true });
    // setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, currentEmail)
        .then((data) => {
          alert("Password reset link was sent to your email");
          // router.push("/auth/sign-in");
                   signOut(auth);
 // setIsLoading(false  );
          setLoading({ ...loading, changePassword: false });
        })
        .catch((err) => {
          alert("Network/Input Error! Try again");
          setLoading({ ...loading, changePassword: false });
        });
    } catch (error) {
      console.log("Network/Input Error! Try again");
      setLoading({ ...loading, changePassword: false });
    }
  };

  // delete account/profile
  const deleteUser = async () => {
    setLoading({ ...loading, deleteUser: true });
    const credential = EmailAuthProvider.credential(
      currentEmail,
      deleteFormPassword
    );
    //  console.log(credential)
    try {
      // Reauthenticate the user
      const userCredential = await reauthenticateWithCredential(
        user,
        credential
      );
      // Proceed with account deletion only if reauthentication is successful
      await userCredential.user.delete();
      await deleteDoc(docRef);
      setLoading({ ...loading, deleteUser: true });
      // Handle successful deletion (e.g., display a confirmation message)
    } catch (error) {
      // Handle potential errors during reauthentication or deletion (e.g., invalid credentials, network issues)
      console.error(error);
      // Display informative error messages to the user
      setLoading({ ...loading, deleteUser: true });
    }
  };

  const showEditForm = () => {
    setMode({
      editMode: true,
      deleteMode: false,
    });
  };

  const showDelForm = () => {
    setMode({
      editMode: false,
      deleteMode: true,
    });
  };
  const hideModes = () => {
    setMode({
      editMode: false,
      deleteMode: false,
    });
  };

  // change value to current value
  const handleChange = async ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  useEffect(() => {
    if (user) {
      getDocc();
    }
    // if (data) {
    //   if (data.isAdmin && data.isUser) {
    //     router.replace("/admin");
    //   } else if (!data.isAdmin && data.isUser) {
    //     router.replace("/");
    //   }
    // }
  }, [router, user, userData, getDocc]);
  // if (isAuth)
  // console.log(userData);
  return (
    <>
      <main className="main pt-24">
        {/* <VerifyDialog/> */}
        <MiniNav links={miniLinks} />
        <div className="flex flex-col lg:flex-row">
          {!mode.editMode && !mode.deleteMode && (
            <div className="flex flex-col  mt-6  w-full   h-max ">
              <div className="mx-auto flex flex-col gap-3 justify-evenly items-start">
                <div className="rounded-xl animate-pulse px-20 py-16 h-full font-bold capitalize text-6xl text-center text-yellow-500 dark:bg-[#3f434a] bg-gray-100 ">
                  {avatar && avatar[0]}
                </div>
                <div className="flex flex-col gap-y-2">
                  <p className="capitalize">
                    Name: {username && username[0]} {username && username[1]}
                  </p>
                  <p>Email: {currentEmail && currentEmail}</p>
                  <p>Phone: {userData && userData.contact}</p>
                </div>
              </div>

              <div className="w-[200px] sm:w-max sm:items-center flex-col sm:flex-row flex mt-7 gap-x-5 mx-auto">
                <Button
                  variant="primary"
                  type="button"
                  className="w-max text-yellow-500 hover:bg-secondary px-3 py-2 gap-x-1 text-base font-medium  "
                  disabled={loading.logout}
                  onClick={() =>{ 
                    signOut(auth)
                    sessionStorage.removeItem('andamo-user')
                    sessionStorage.removeItem('andamo-seller')
                    sessionStorage.removeItem('andamo-driver')
                    }}
                >
                  {loading.logout && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <IoLogOutSharp />
                  Logout{" "}
                </Button>
                {/* <Button
                  variant="primary"
                  type="button"
                  className="w-max text-pink-600 hover:bg-secondary px-3 py-2 gap-x-1 text-base font-medium  "
                  disabled={loading.changePassword}
                  onClick={handleChangePassword}
                >
                  {loading.changePassword && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <IoLogOutSharp />
                  Change Password{" "}
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  className="w-max text-pink-600 hover:bg-secondary px-3 py-2 items-center gap-x-1 text-base font-medium  "
                  // disabled={logoutIsLoading}
                  onClick={showEditForm}
                >
                  <AiFillEdit />
                  Edit Profile{" "}
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  className="w-max text-red-600 p-0 items-center hover:bg-secondary px-3 py-2 gap-x-1 text-base font-medium "
                  onClick={showDelForm}
                >
                  <FaDeleteLeft />
                  Delete Account
                </Button> */}
              </div>
            </div>
          )}

          {mode.deleteMode && (
            <>
              <div className="flex flex-col gap-y-5 mt-4 mx-auto w-full sm:w-[90%] md:w-1/2 px-4 py-2  relative ">
                <Button
                  type="button"
                  varaint="primary"
                  onClick={hideModes}
                  className="absolute text-red-400 p-0 hover:bg-background right-5 top-0 w-max bg-background"
                >
                  {" "}
                  <X className="text-red-400" />
                </Button>

                <div className="space-y-1 w-full sm:mx-auto">
                  <Label htmlFor="fname" className="text-base font-medium">
                    Password
                  </Label>
                  <Input
                    id="deleteFormPassword"
                    name="deleteFormPassword"
                    type="password"
                    autoComplete="off"
                    placeholder="Password1234"
                    value={deleteFormPassword}
                    onChange={handleChange}
                    className="h-9  rounded-none border-0 border-b w-full focus:outline-pink-200 dark:focus:outline-pink-300"
                    //   defaultValue={defaultSearchQuery}
                  />
                </div>
                <Button
                  variant="primary"
                  type="button"
                  className="w-max text-red-600 p-0 items-center hover:bg-secondary px-3 py-2 gap-x-1 text-base font-medium "
                  disabled={loading.deleteUser}
                  onClick={deleteUser}
                >
                  {loading.deleteUser && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <FaDeleteLeft />
                  Delete Account
                </Button>
              </div>
            </>
          )}

          {mode.editMode && (
            <div className="flex flex-col  relative w-full">
              <Button
                type="button"
                varaint="primary"
                onClick={hideModes}
                className="absolute text-red-400 p-0 hover:bg-background right-5 top-0 w-max bg-background"
              >
                {" "}
                <X className="text-red-400" />
              </Button>
              <p className="w-[90%] md:w-2/4 mx-auto mt-9">
                Note: After clicking on &apos;update user profile&apos; you will
                be logged out and redirected to the homepage. Re-sign in with
                updated credentials to access your account
              </p>
              <form className="flex flex-col gap-y-5 mt-4 mx-auto w-full sm:w-[90%] md:w-1/2 px-4 py-2">
                <div className="space-y-1 w-full sm:mx-auto">
                  <Label htmlFor="fname" className="text-base font-medium">
                    First Name
                  </Label>
                  <Input
                    id="fname"
                    name="fname"
                    type="text"
                    autoComplete="off"
                    placeholder="Kojo"
                    value={fname}
                    onChange={handleChange}
                    className="h-9  rounded-none border-0 border-b w-full focus:outline-pink-200 dark:focus:outline-pink-300"
                    //   defaultValue={defaultSearchQuery}
                  />
                </div>
                <div className="space-y-1 w-full sm:mx-auto">
                  <Label htmlFor="lname" className="text-base font-medium">
                    Last Name
                  </Label>

                  <Input
                    id="lname"
                    name="lname"
                    type="text"
                    autoComplete="off"
                    placeholder="Anokye"
                    value={lname}
                    onChange={handleChange}
                    className="h-9  w-full rounded-none border-0 border-b focus:outline-pink-200 dark:focus:outline-pink-300"
                    //   defaultValue={defaultSearchQuery}
                  />
                </div>
                <div className="space-y-1 w-full sm:mx-auto">
                  <Label htmlFor="email" className="text-base font-medium">
                    Email
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    placeholder="email@example.com"
                    value={email}
                    onChange={handleChange}
                    className="h-9  rounded-none border-0 border-b w-full focus:outline-pink-200 dark:focus:outline-pink-300"
                    //   defaultValue={defaultSearchQuery}
                  />
                  <div className="space-y-1 w-full sm:mx-auto">
                    <Label htmlFor="password" className="text-base font-medium">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="text"
                      autoComplete="off"
                      placeholder="+233123456789"
                      value={phone}
                      onChange={handleChange}
                      className="h-9  rounded-none border-0 border-b w-full focus:outline-pink-200 dark:focus:outline-pink-300"
                      //   defaultValue={defaultSearchQuery}
                    />
                  </div>
                </div>
                <Button
                  variant="primary"
                  type="button"
                  className="w-max text-red-600 p-0 items-center hover:bg-secondary px-3 py-2 gap-x-1 text-base font-medium "
                  disabled={loading.update}
                  onClick={handleUpdate}
                >
                  {loading.update && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <FaDeleteLeft />
                  Update User
                </Button>
              </form>
            </div>
          )}
        </div>{" "}
      </main>
    </>
  );
};

export default Page;
