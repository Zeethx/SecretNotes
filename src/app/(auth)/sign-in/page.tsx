'use client'

import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormLabel, FormMessage, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { loginSchema } from "@/schemas/loginSchema";
import { signIn } from "next-auth/react";

function SignIn() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    // zod schema
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });


    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password
    })

    if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          toast({
            title: 'Login Failed',
            description: 'Incorrect username or password',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: result.error,
            variant: 'destructive',
          });
        }
      }
  
      if (result?.url) {
        router.replace('/dashboard');
      }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-800">SecretNotes</h1>
                    <p className="text-gray-500 mt-2">Login to get started</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="SillyTuscan42" {...field} />
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
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center items-center">
                            <Button type="submit" disabled={isSubmitting} className="items-center">
                                {
                                    isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                                        </>
                                    ) : ('Login')
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        New user?{" "}
                        <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
