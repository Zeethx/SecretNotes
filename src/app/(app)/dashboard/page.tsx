'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Message } from '@/models/User'
import { useToast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { acceptMessagesSchema } from '@/schemas/acceptMessageSchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { set } from 'mongoose'


function Dashboard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSwitchLoading, setIsSwitchLoading] = useState(false);

    const { toast } = useToast();

    const handleDeleteMessage = async (messageId: string) => {
        setMessages(messages.filter((message) => message._id !== messageId));
    }

    const { data: session } = useSession();

    const form = useForm({
        resolver: zodResolver(acceptMessagesSchema)
    })

    const { register, watch, setValue } = form;

    const acceptMessages = watch('acceptMessages');

    const fetchAcceptMessages = useCallback(async () => {
        setIsSwitchLoading(true);
        try {
            const response = await axios.get('/api/accept-messages')
            setValue('acceptMessages', response.data.isAcceptingMessages)


        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Error",
                description: axiosError.response?.data.message ?? "Failed to fetch user settings",
                variant: "destructive",
            })
        } finally {
            setIsSwitchLoading(false);
        }
    }, [setValue])

    const fetchMessages = useCallback(async (refresh: boolean) => {
        setIsLoading(true);
        setIsSwitchLoading(false);
        try {
            const response = await axios.get('/api/get-messages')
            setMessages(response.data.messages || [])
            toast({
                title: "Messages updated",
                description: "Messages have been updated",
            })
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Error",
                description: axiosError.response?.data.message ?? "Failed to fetch messages",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false);
        }
    }
    , [setIsLoading, setMessages])
 
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard