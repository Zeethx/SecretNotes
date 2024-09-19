"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className={`${className ? className : "p-4 md:p-6 shadow-md text-white relative w-full h-18 z-20"}`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="/" className="text-xl font-bold mb-4 md:mb-0">
          {/* <img src="/logo-horizontal.png" alt="SecretNotes" className="w-30 h-10" /> */}
          <Image
            src="/logo-horizontal.png"
            alt="SecretNotes"
            width={160}
            height={40}
            className="w-32 h-8"/>
        </a>
        {user ? (
          <>
            <p className="mr-4 text-lg">Welcome, <span className="text-purple-500">{user.username || user.email}</span></p>
            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;