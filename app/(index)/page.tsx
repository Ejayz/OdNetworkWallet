"use client";
import Image from "next/image";
import { IndexNavbar } from "@/app/components/IndexNavbar";

export default function Home() {
  return (
    <main className=" w-full h-full flex flex-row">
      <IndexNavbar />
    </main>
  );
}
