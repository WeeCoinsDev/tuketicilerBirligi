import { Inter_Tight, Manrope } from "next/font/google";

export const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans-family",
  display: "swap"
});

export const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading-family",
  display: "swap"
});

export const fontVariables = `${interTight.variable} ${manrope.variable}`;
