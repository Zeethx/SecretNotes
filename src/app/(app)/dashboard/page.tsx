"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Message, User } from "@/models/User";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessagesSchema } from "@/schemas/acceptMessageSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import { MessageCard } from "@/components/MessageCard";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");

  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessagesSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "Failed to fetch user settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    setIsSwitchLoading(false);
    try {
      const response = await axios.get("/api/get-messages");
      setMessages(response.data.messages || []);
      toast({
        title: "Messages updated",
        description: "Messages have been updated",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [setMessages, toast]);

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessages();
    
    // Set profile URL
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    const username = session.user.username || session.user.name || "User";
    setProfileUrl(`${baseURL}/${username}`);
  }, [session, setValue, fetchMessages, fetchAcceptMessages]);

  const handleSwitchChange = async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post("/api/accept-messages", {
        isAcceptingMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: "Success",
        description: "Settings updated",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "Failed to update settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Copied",
      description: "Profile URL copied to clipboard",
    });
  };

  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      <div className="flex justify-center px-4 pt-8">
        <div className="max-w-6xl w-full bg-gray-900 bg-opacity-40 rounded-lg shadow-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-6 text-center">User Dashboard</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Copy Your Unique Link</h2>
            <div className="flex items-center">
              <input
                type="text"
                value={profileUrl}
                disabled
                className="w-full p-3 bg-black bg-opacity-60 text-gray-300 border border-gray-600 rounded-md mr-2"
              />
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={copyToClipboard}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <Switch
              {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
            />
            <span className="ml-2 text-lg">Accept Messages: {acceptMessages ? "On" : "Off"}</span>
          </div>
          <Separator className="my-4" />

          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center mt-4"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
            <span className="ml-2">Refresh Messages</span>
          </Button>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageCard
                  key={message._id as string}
                  message={message}
                  onMessageDelete={(messageId) => setMessages(messages.filter((msg) => msg._id !== messageId))}
                />
              ))
            ) : (
              <p className="text-center">No messages to display.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
