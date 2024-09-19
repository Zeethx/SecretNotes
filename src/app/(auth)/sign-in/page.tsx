"use client";

import { useForm } from "react-hook-form";
import { Merienda } from "next/font/google";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
    Form,
    FormLabel,
    FormMessage,
    FormField,
    FormItem,
    FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";

const merienda = Merienda({ subsets: ["latin"] });

function SignIn() {
    const [identifier, setIdentifier] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    const debounced = useDebounceCallback(setIdentifier, 300);

    // zod schema
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setIsSubmitting(true);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                identifier: data.identifier,
                password: data.password,
            });

            setIsSubmitting(false);

            if (result?.error) {
                toast({
                    title: "Error",
                    description: "Incorrect username or password",
                    variant: "destructive",
                });
            } else if (result?.url) {
                router.replace("/dashboard");
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Error",
                description:
                    axiosError.response?.data.message || "Login failed",
                variant: "destructive",
            });
            setIsSubmitting(false);
        }
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex justify-center items-center text-white pt-12">
                <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-lg shadow-xl border border-gray-700">
                    <div className="text-center">
                        <h1
                            className={`text-5xl font-bold text-white ${merienda.className}`}
                        >
                            SecretNotes
                        </h1>
                        <p className="text-gray-300 mt-2">
                            Sign in to continue
                        </p>
                    </div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="identifier"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Username or Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-gray-800 text-white border-gray-600"
                                                placeholder="SillyTuscan42"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    debounced(e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                className="bg-gray-800 text-white border-gray-600"
                                                placeholder="********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center items-center">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                                            Please wait...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <div className="text-center mt-4">
                        <p className="text-gray-400">
                            New user?{" "}
                            <Link
                                href="/sign-up"
                                className="text-blue-400 hover:text-blue-600 transition duration-200"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
