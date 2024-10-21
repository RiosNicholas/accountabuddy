/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {useSession} from "next-auth/react";

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export default function HomePage() {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);
  }

  return (
    <div className="relative w-full min-h-screen grid grid-cols-1 md:grid-cols-3">
      <div className="absolute inset-0 md:relative md:col-span-2">
        <Image 
          src="/pexels-minan1398-853168.jpg" 
          alt="Silhouette of people raising their hands together."
          layout="fill" 
          objectFit="cover" 
          className="opacity-100 md:rounded-e"
        />
      </div>

      <main className="relative z-10 col-span-1 flex flex-col justify-center items-center md:col-start-3 bg-white bg-opacity-85 md:bg-transparent p-4 md:p-0 min-h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 w-5/6 md:w-4/5 lg:w-3/5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input className="bg-background" placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input className='bg-background' placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href="auth/login/" passHref>
              <Button className="w-full mt-2" type="submit">
                Sign in
              </Button>
            </Link>
          </form>
          <span className="flex justify-center text-sm text-center">
            <p className="mr-1">Don't have an account?</p>
            <Link href="auth/signup" className="underline text-accent hover:cursor-pointer">
              Sign up here
            </Link>
          </span>
        </Form>
      </main>
    </div>
  );
}
