"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import Link from "next/link";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
   
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex rounded-[100%] dark:border-zinc-700 sm:border border-black hover:bg-gray-200 p-3 py-6  text-yellow-500 dark:hover:bg-[#292e36]  dark:bg-[#1f2227]  bg-background"
    >
      <Moon className="absolute text-4xl rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Sun className="rotate-0 text-4xl scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
      {/* <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
