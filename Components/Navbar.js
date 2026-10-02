"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const { data: session, status } = useSession();
   if (status === "loading") {
    return null;
  }
  return (
    <nav className="bg-[#58E069] text-black">
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto px-4 py-1 font-bold">

        <Link href="/" className="flex items-center gap-3">
          <img
            className="h-10 w-15 object-contain"
            src="/businessman.png"
            alt="CareerForge AI logo"
          />
          <div className="text-2xl font-bold">
            CareerForge AI
          </div>
        </Link>

        {/* Navigation */}
       
        <ul>
          <li className="flex gap-4 text-lg">
            <Link href="/about" className="hover:font-bold my-1">
              About
            </Link>

            <Link href="/features" className="hover:font-bold my-1">
              Features
            </Link>
             {session && (
            <button onClick={() => signOut()} className="border border-green-600 px-2 rounded bg-green-200 py-1">Logout</button>
             )}
          </li>
        </ul>
         
      </div>
    </nav>
  );
};

export default Navbar;