"use client";
import React, { useState } from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/button";
import { CartItemsEmpty } from "@/components/cart-empty";

const CartSummary = () => {
  const {
    formattedTotalPrice,
    totalPrice,
    cartDetails,
    cartCount,
    redirectToCheckout,
  } = useShoppingCart();
  const shippingAmount = cartCount > 0 ? 5 : 0;
  const totalAmount = totalPrice + shippingAmount;
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = isLoading || cartCount == 0;

  const config = {
    publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: 1000,
    currency: "GHS",
    payment_options: "mobilemoney_ghana",
  };
  const cartItems = Object.entries(cartDetails).map(([_, product]) => product);
  if (cartItems.length === 0) return <CartItemsEmpty />;
  return (
    <section
      aria-labelledby="summary-heading"
      className="sticky lg:top-24 w-full bottom-0 lg:w-1/3 h-max rounded-lg border-2 border-gray-200 bg-gray-300 dark:bg-[#3f434a]  px-4 lg:py-6 py-4 shadow-md dark:border-gray-900  sm:p-6  lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium hidden lg:block">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4 hidden lg:block">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">GHS {totalPrice.toFixed(2)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium">
            GHS {shippingAmount.toFixed(2)}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
            GHS {totalAmount.toFixed(2)}
          </dd>
        </div>
      </dl>

      <div className="lg:mt-6">
        <Button className="w-full font-semibold" disabled>checkout <span className="ml-3 lg:hidden">(GHS {totalAmount.toFixed(2)})</span></Button>
      </div>
    </section>
  );
};

export default CartSummary;
