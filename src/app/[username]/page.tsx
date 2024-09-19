"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Merienda } from "next/font/google";

type FormData = {
    message: string;
};

interface PageProps {
    params: { username: string };
}

const merienda = Merienda({ subsets: ["latin"] });

export default function Home({ params }: PageProps) {
    const { username } = params;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();
    const { toast } = useToast();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const response = await axios.post("/api/send-message", {
            username,
            content: data.message,
        });

        if (response.data.success) {
            toast({
                title: "Success",
                description: "Message sent successfully",
                variant: "default",
            });
            reset();
        } else {
            toast({
                title: "Error",
                description: response.data.message,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-800 to-gray-900 text-white relative">
            {/* Header */}
            <h1 className={`text-xl font-bold mb-4 ${merienda.className}`}>
                Join the{" "}
                <span className="text-purple-400 hover:text-blue-500 transition duration-300">
                    <Link href="/">SecretNotes</Link>
                </span>{" "}
                Community
            </h1>
            <Image
                src="/logo-horizontal.png"
                alt="SecretNotes Logo"
                width={400} 
                height={100} 
                className="w-4/12 mb-8"
            />

            {/* Form Container */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-5xl relative z-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label
                        htmlFor="message"
                        className="block text-white text-lg font-medium mb-4 text-center"
                    >
                        Send a note to{" "}
                        <span className="font-bold text-blue-400">
                            {username}
                        </span>
                    </label>
                    <textarea
                        id="message"
                        className={`w-full h-32 p-3 border rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 ${
                            errors.message
                                ? "border-red-500 focus:ring-red-400"
                                : "focus:ring-blue-400"
                        }`}
                        {...register("message", {
                            required: "Message is required",
                            maxLength: {
                                value: 500,
                                message: "Max length is 500 characters",
                            },
                        })}
                        placeholder="Write your message..."
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.message.message}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
