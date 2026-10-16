import { Geist, Geist_Mono } from "next/font/google";

// Polices partagées par les deux layouts racines (site public et admin).
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
