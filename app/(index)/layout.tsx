"use client";
import "@/css/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-full h-full overflow-y-auto bg-base-100`}
      >
        {children}
      </body>
    </html>
  );
}
