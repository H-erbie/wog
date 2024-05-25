"use client";

import { AppProvider } from "./context";
import { ThemeProvider } from "./themeProvider";
import AuthProvider from "@/components/authProvider";
import { CartProvider } from "use-shopping-cart"
import { Toaster } from "./ui/toaster";


export function Providers({ children }) {
  return (
    <CartProvider
    currency="GHS"
      shouldPersist
      cartMode="checkout-session"
    >
    <AppProvider>
    {/* <AuthProvider> */}
     
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster/>
        {children}
      </ThemeProvider>
    {/* </AuthProvider> */}
    </AppProvider>
    </CartProvider>

  );
}
