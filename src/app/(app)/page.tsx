"use client";

import Image from "next/image";
import { Merienda } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

const merienda = Merienda({ subsets: ["latin"] });

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
    <div className="bg-black flex justify-between px-20 py-6">

    
        <Link href="/">
            <img src='/logo-horizontal.png' alt="SecretNotes" className="w-30 h-10 bg-black z-20">            
            </img>
        </Link>
        <Link href="/dashboard">
            <span className="text-white text-xl">Dashboard</span>
        </Link>
        </div>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 text-white bg-gradient-to-b from-black to-gray-900 relative">
        {/* Glowing Planet */}
        <div className="absolute top-1/4 md:top-1/3 lg:top-1/4 w-[300px] h-[300px] bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl opacity-60" />

        {/* Section: Main Text */}
        <section className="text-center mb-8 md:mb-12 relative z-10">
          <p className="text-xl font-light">SecretNotes is the place to</p>
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Make a Difference, Anonymously.
          </h1>

          {/* Gradient Bar */}
          <div className="w-[40rem] h-2 relative mx-auto mt-4">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-12 space-x-6">
            <Button
              className="bg-opacity-70 bg-purple-800 hover:bg-purple-900 text-white border-white border-2 font-bold py-8 text-2xl px-8 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
              size="lg"
            >
              <Link href="/create-profile" className="flex items-center">
                <span className={`ml-2 ${merienda.className}`}>
                  Create Your Profile
                </span>
              </Link>
            </Button>
          </div>
        </section>

        {/* Carousel for Messages */}
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full max-w-lg md:max-w-xl relative z-10"
      >
        <CarouselContent>
          {messages.map((message, index) => (
            <CarouselItem key={index} className="p-4">
              <Card className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{message.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                  <Mail className="flex-shrink-0 text-blue-500" />
                  <div>
                    <p>{message.content}</p>
                    <p className="text-xs text-gray-400">
                        - {message.received}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      </main>
    </>
  );
}
