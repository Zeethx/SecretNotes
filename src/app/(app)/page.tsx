"use client";

import Image from "next/image";
import { Merienda } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react"; // Assuming you have an icon for messages
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

export default function Home() {
    return (
        <>
            <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 text-white bg-gray-800">
                <section className="text-center mb-8 md:mb-12">
                  <p className="text-xl">Make a difference,</p>
                    <h1 className="text-4xl md:text-7xl font-bold leading-tight z-100">
                      Anonymously
                    </h1>
                    <div className="w-[40rem] h-2 relative">
                    {/* Gradients */}
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
                    </div>
                    {/* <Button
                        className="mt-12 bg-blue-400 hover:bg-blue-500 text-white font-bold py-8 text-xl px-12 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
                        size="lg"
                    >
                        <Link href="/sign-in" className="flex items-center">
                            <span className={`ml-2 ${merienda.className}`}>Join SecretNotes</span>
                        </Link>
                    </Button> */}
                </section>

                {/* Carousel for Messages */}
                <Carousel
                    plugins={[Autoplay({ delay: 2000 })]}
                    className="w-full max-w-lg md:max-w-xl"
                >
                    <CarouselContent>
                        {messages.map((message, index) => (
                            <CarouselItem key={index} className="p-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{message.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                                        <Mail className="flex-shrink-0" />
                                        <div>
                                            <p>{message.content}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {message.received}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </main>

            {/* Footer */}
            <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
                © 2024 SecretNotes | All rights reserved.
            </footer>
        </>
    );
}
