import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { set } from "mongoose";
import { Form, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { FormField } from "@/components/ui/form-field";
import { FormItem } from "@/components/ui/form-item";
import { FormControl } from "@/components/ui/form-control";
import { Input } from "@/components/ui/input";

function page() {
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const debouncedUsername = useDebounceValue(username, 300);

    const { toast } = useToast();
    const router = useRouter();

    // zod schema
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        const checkUniqueUsername = async () => {
            if (debouncedUsername) {
                setIsCheckingUsername(true);
                setUsernameMessage("");
                try {
                    const response = await axios.get(
                        `/api/check-unique-username/username=${debouncedUsername}`
                    );
                    setUsernameMessage(response.data.message);
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setUsernameMessage(
                        axiosError.response?.data.message ||
                            "Error checking username"
                    );
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        };
    }, [debouncedUsername]);

    const onSubmit = async (data:z.infer<typeof signUpSchema>) => {
      setIsSubmitting(true);
      try {
        const response = await axios.post<ApiResponse>('/api/sign-up', data);
        toast({
          title: response.data ? 'Success' : 'Error',
          description: response.data.message,
        })
        router.replace(`/verify/${username}`);
        setIsSubmitting(false);
      } catch (error) {
        console.error("User sign up error", error);
        const axiosError = error as AxiosError<ApiResponse>;
        let errorMessage = axiosError.response?.data.message || "Error signing up";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        })
      }
    }

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Sign Up</h1>
            <p className="text-gray-500">Create an account</p>
         </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value);
                    }}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> 
          </Form>
          <FormField
            control={form.control}
            name="email"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    )
}

export default page;
