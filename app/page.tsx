"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
    // FIXME: padding and margins are off. there's a ton of whitespace
    <div className="relative grid grid-rows-2 md:grid-cols-2 w-full sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute inset-0 md:relative md:row-start-1 md:col-span-1 flex items-center justify-center z-0 md:h-full">
        <img
          src="/pexels-minan1398-853168.jpg"
          alt="Silhouette of people raising their hands together."
          className="w-full h-full object-cover md:object-cover md:w-full md:h-full opacity-10 md:opacity-100"
        />
      </div>
      <main className="relative row-start-1 col-span-2 md:col-span-1 flex flex-col justify-center items-center md:row-start-1 md:col-start-2 z-10 py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-2 w-5/6 md:w-4/5 lg:w-3/5">
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
                    {/* TODO: Conceal password as it is typed in the input bar */}
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