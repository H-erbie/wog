"use client";
import React, { Suspense, useState, useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { useGlobalContext } from "./context";
import { PaystackButton } from "react-paystack";
// import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import Store from 'store.js'
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { revalidateTag } from "next/cache";
import { useTheme } from "next-themes";

const CheckoutSummary = ({
  apiKey,
  orderId,
  emailApi,
  templateId,
  serviceId,
}) => {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, []);

  const router = useRouter();
  const [user] = useAuthState(auth);
  const [roomId, setRoomId] = useState(uuidv4());
  const fullname = user?.displayName;
  const userPhone =
    JSON.parse(sessionStorage.getItem("andamo-user"))?.phoneNumber || "";
  const userEmail = user?.email;
  const userId = user?.uid;
  const { address } = useGlobalContext();
  const { totalPrice, cartDetails, cartCount, clearCart } = useShoppingCart();
  const newCartDetails = {
    ...cartDetails,
    location:
      address === ""
        ? JSON.parse(localStorage.getItem("shipping-address"))
        : address,
  };
  const shippingAmount = cartCount > 0 ? 5 : 0;
  let totalAmount = totalPrice + shippingAmount;
  const cartItems = Object.entries(newCartDetails).map(
    ([_, product]) => product
  );

  totalAmount = totalAmount.toFixed(2);
  const cartForEmail = Object.entries(cartDetails).map(
    ([_, product]) => product
  );
  let cartItemsForEmail = "";
  cartForEmail.map((cart) => {
    return (cartItemsForEmail += `
        ${cart.name} - ${cart.price}
        `);
  });
  // console.log(cartItemsForEmail)

  // console.log()
  const sendWelcomeMessage = async (userId, adminId) => {
    try {
      await setDoc(doc(db, "rooms", roomId), {
        userIds: [userId, adminId],
      });
      const messageRef = collection(db, `rooms/${roomId}/messages`);
      const timestamp = Date.now();
      const message = {
        content: `Welcome to the chat room, ${user.displayName}!
           Your order of ID, ${orderId} has been recieved.
           We're working on it to send it your way very soon.
           If anything bothers you, don't hesitate to chat us about it.
           Patience is key!🔑😊.`,
        timestamp: timestamp,
        user: "Andamo Team",
        roomId: roomId,
        userId: adminId,
        id: uuidv4(),
        orderId,
      };

      await addDoc(messageRef, message);
    } catch (error) {
      console.error("Error sending welcome message:", error);
    }
  };

  const orderContact = JSON.parse(sessionStorage.getItem("order-contact"));
  const deliveryAddress = JSON.parse(
    sessionStorage.getItem("shipping-address")
  );
  const orderOnSuccess = async () => {
    try {
      await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify({
          orderId,
          shippingAddress: deliveryAddress,
          totalAmount: Number(totalAmount),
          isConfirmed: true,
          isProcessing: false,
          isShipped: false,
          isDelivered: false,
          isCancelled: false,
          name: fullname,
          phone: orderContact,
          email: userEmail,
          id: userId,
          cartItems: cartForEmail.map((cart) => {
            return {
              name: cart.name,
              price: cart.price,
              quantity: cart.quantity,
              image: cart.images[0],
              _key: cart.name,
            };
          }),
        }),
      });
      // sendWelcomeMessage(uuidv4(),user.uid,'ezvRP6tcppZlzzR8D9Cy4qRSh0U2')
    } catch (error) {
      console.log(error);
    }
  };
  const publicKey = apiKey;

  const amount = Math.round(totalAmount) * 100;

  const email = userEmail;

  const name = fullname;

  const phone = userPhone;
  const currency = "GHS";

  const componentProps = {
    email,

    amount,
    currency,

    metadata: {
      name,

      phone,
    },

    publicKey,

    text: "Pay With Paystack",

    onSuccess: () => {
      orderOnSuccess();
      sendWelcomeMessage(user.uid, "i98Cv19XjNQxx2jlpaUXaG5F4oP2");
      clearCart();

      router.replace(`/chats`);
      // revalidateTag("orders");
    },

    onClose: () => {
      alert("Why leave now?");
    },
  };

  return (
    <div className="sm:px-5">
      <Suspense fallback={<div className="animate-pulse h-[80%] w-full"></div>}>
        <Table className="grid grid-cols-2 ">
          {/* <TableCaption>Summary</TableCaption> */}
          {cartItems.map((cartItem, index) => {
            if (index + 1 !== cartItems.length)
              return (
                <>
                  <TableHeader className="w-full dark:hover:bg-[#292e36] border dark:border-zinc-600">
                    <TableRow className="flex  flex-col ">
                      <TableHead className="p-4 h-[52px]">
                        Product Name
                      </TableHead>
                      <TableHead className="p-4 h-[52px]">
                        Product Price
                      </TableHead>
                      <TableHead className="p-4 h-[52px]">
                        Product Quantiy
                      </TableHead>
                      {/* <TableHead className="p-4 h-[52px]">
                        Shipping Adress
                      </TableHead>
                      <TableHead className="p-4 h-[52px]">Subtotal</TableHead>
                      <TableHead className="p-4 h-[52px]">
                        Shipping fee
                      </TableHead>
                      <TableHead className="p-4 h-[52px]">Total</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody className="w-full dark:hover:bg-[#292e36] border dark:border-zinc-600">
                    <TableRow key={cartItem.id} className="flex flex-col ">
                      <TableCell>{cartItem.name}</TableCell>
                      <TableCell>GHS {cartItem.price.toFixed(2)}</TableCell>
                      <TableCell>{cartItem.quantity}</TableCell>
                      {/* <TableCell></TableCell>
                      <TableCell>GHS {totalPrice}</TableCell>
                      <TableCell>GHS {shippingAmount}.00</TableCell>
                      <TableCell>GHS {totalAmount} </TableCell> */}
                    </TableRow>
                  </TableBody>{" "}
                </>
              );
          })}
        </Table>
        <div className="w-[80%] sm:w-1/2 mx-auto mt-5">
          <div className="flex  my-3 justify-between">
            <p className="text-lg text-yellow-500 font-bold">
              {" "}
              Shipping Adress:
            </p>
            <p className="">{newCartDetails.location}</p>
          </div>
          <div className="flex my-3  justify-between">
            <p className="text-lg text-yellow-500 font-bold"> Subtotal:</p>
            <p className="">{totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex my-3  justify-between">
            <p className="text-lg text-yellow-500 font-bold"> Shipping Fee:</p>
            <p className="">{shippingAmount}.00</p>
          </div>
          <div className="flex my-3  justify-between">
            <p className="text-lg text-yellow-500 font-bold"> Total:</p>
            <p className="">{totalAmount}</p>
          </div>
        </div>
        <div className="w-max mx-auto">
          <PaystackButton
            {...componentProps}
            className="w-max mt-8 py-2 px-3 rounded-md bg-yellow-500 dark:bg-yellow-600"
          />
        </div>{" "}
      </Suspense>
    </div>
  );
};

export default CheckoutSummary;
