import {
  Open_Sans as OpenSans,
  JetBrains_Mono as FontMono,
  Plus_Jakarta_Sans as FontSans,
} from "next/font/google";

export const openSans = OpenSans({
  subsets: ["latin"],
  variable: "--open-sans",
});

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
