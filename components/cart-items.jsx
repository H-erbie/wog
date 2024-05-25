"use client";

import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { Clock, X, Trash } from "lucide-react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

import { getSizeName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";

export default function CartItems() {
  const { cartDetails,totalPrice,
    cartCount, setItemQuantity, removeItem, clearCart } = useShoppingCart();
  
  const shippingAmount = cartCount > 0 ? 5 : 0;
  const totalAmount = totalPrice + shippingAmount;
    // console.log(cartDetails)
  const { toast } = useToast();
  function removeCartItem(product) {
    removeItem(product._id);
    toast({
      title: `${product.name} removed!`,
      description: "Cloth removed from the cart",
      variant: "destructive",
    });
  }
  const removeAllItems = () => {
    clearCart()
    toast({
      description: "Cart Cleared",
      variant: "destructive",
    });
  }

  const cartItems = Object.entries(cartDetails).map(([_, product]) => product);
  if (cartItems.length === 0) return 
  return (
<>
<span className="text-right capitalize p-2 px-3 bg-red-500 dark:bg-red-700 rounded-md hover:bg-red-400 dark:hover:bg-red-800 cursor-pointer text-white" onClick={removeAllItems}>clear cart</span>
<h2 id="summary-heading" className="text-lg mt-5 font-medium lg:hidden ">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4 lg:hidden">
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
      
      </dl>
    <ul
      role="list"
      className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-500 dark:border-gray-500 mt-4"
    >
      {cartItems.map((product, productIdx) => {
        return (
          <li key={product._id} className="flex lg:justify-evenly lg:flex-row flex-col justify-evenly  py-6 sm:py-10">
            <div className="shrink-0 w-36 mx-auto lgLw-max lg:mx-0">
            <Link
                        href={`/products/${product.slug.current}`}
                        className="font-medium"
                      >
              <Image
                src={urlForImage(product.images[0]).url()}
                alt={product.name}
                width={200}
                height={200}
                className="h-36 w-36 dark:bg-zinc-600 rounded-md border-2 border-gray-200 object-cover object-center dark:border-gray-800 sm:h-48 sm:w-48"
              /></Link>
            </div>

            <div className="ml-4 flex flex-col lg:w-1/3 justify-between w-full sm:ml-6">
              <div className="relative gap-y-5 items-center justify-between lg:flex-col pr-9 flex sm:gap-x-6 sm:pr-0">
                <div>
                  <div className="flex gap-3 flex-col">
                    <h3 className="text-sm">
                      <Link
                        href={`/products/${product.slug.current}`}
                        className="font-medium"
                      >
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="mt-1 text-sm font-medium">
                    GHS {product.price}
                  </p>
                  <p className="mt-1 text-sm font-medium">Location: {product.loc}
               </p>
                </div>

                <div className="mt-4 sm:mt-0 sm:pr-9">
                  <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                    Quantity, {product.name}
                  </label>
                  <Input
                    id={`quantity-${productIdx}`}
                    name={`quantity-${productIdx}`}
                    type="number"
                    className="w-16"
                    min={1}
                    value={product.quantity}
                    onChange={(e) =>
                      setItemQuantity(product._id, Number(e.target.value))
                    }
                  />
                  <div className="mt-3">
                    <Button
                      variant="ghost"
                      type="button"
                      className="-mr-2 inline-flex p-2 hover:bg-[#3f434a]"
                      onClick={() => removeCartItem(product)}
                    >
                      <span className="text-semibold text-red-500">Remove</span>
                      <Trash className="ml-2 h-5 w-5 text-red-600" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </div>

              <p className="mt-4 flex lg:justify-center space-x-2 text-sm">
                <Clock className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Ships in 1 week</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
    </>
  );
}
