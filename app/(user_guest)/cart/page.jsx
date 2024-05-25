'use client'
import React from "react";
import CartItems from "@/components/cartItems";
import CartSummary from "@/components/cartSummary";
import MiniNav from "@/components/mini-nav";

import { useShoppingCart } from "use-shopping-cart";
import { CartItemsEmpty } from "@/components/cart-empty";
// import VerifyDialog from "@/components/verify-dialog";

const Page = () => {

  const miniLinks = [
    { text: "home", link: "/" },
    { text: "cart", link: "" },
  ];


  const { cartDetails} = useShoppingCart();

  const cartItems = Object.entries(cartDetails).map(([_, product]) => product);
  if (cartItems.length === 0) return <CartItemsEmpty />
  return (
    <div>
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-24 sm:px-6 lg:max-w-7xl lg:px-8 ">
      {/* <VerifyDialog/> */}


        <MiniNav links={miniLinks}/>

        <div className="mt-12">
          <section aria-labelledby="cart-heading" className="w-full">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <CartItems />
          </section>
          <section className='flex justify-center items-center'>
            
            {/* Cart Summary */}
            <CartSummary />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Page;
