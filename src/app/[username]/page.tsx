'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

type FormData = {
  message: string;
};

interface PageProps {
  params: { username: string }
}

export default function Home({ params }: PageProps) {
  const { username } = params;
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await axios.post('/api/send-message', { username, content: data.message })

    if (response.data.success) {
      toast({
        title: "Success",
        description: "Message sent successfully",
        variant: "default"
      })
      reset()
    } else {
      toast({
        title: "Error",
        description: response.data.message,
        variant: "destructive"
      })
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className='text-white text-2xl font-bold'>Join the <span className='text-blue-300'><Link href='/' className='hover:text-blue-500'>SecretNotes</Link></span> Community</h1>
        <img src='/logo-horizontal.png' className='w-1/2' />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="message" className="block text-gray-700 text-lg font-medium mb-2 text-center">
            Send a note to <span className='font-bold'>{username}</span>
          </label>
          <textarea
            id="message"
            className={`w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 ${
              errors.message ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
            }`}
            {...register('message', { required: 'Message is required', maxLength: { value: 500, message: 'Max length is 500 characters' } })}
            placeholder="Write your message..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
