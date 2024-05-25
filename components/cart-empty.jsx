"use client"

import Link from "next/link"
import { Plus, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import MiniNav from "./mini-nav";

export function CartItemsEmpty() {
  const miniLinks = [
    { text: "home", link: "/" },
    { text: "Cart", link: "" },
  ];

  return (
    <div className="flex h-screen shrink-0 items-center flex-col w-full justify-center rounded-md border-2  border-gray-300 dark:border-gray-800">
            <MiniNav links={miniLinks} />

      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <ShoppingBag className="h-32 w-32 text-muted-foreground" />
        <h3 className="text-3xl font-bold my-4 tracking-tight sm:text-4xl">Cart is empty</h3>
       
        <Link href="/">
          <Button size="sm" className="relative">
            Continue shopping
            <Plus className="ml-2 h-4 w-4" />

          </Button>
        </Link>
      </div>
    </div>
  )
}
