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
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

const FormSchema = z.object({
  email: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });


  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);
    const { email, password } = data;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log({ response });
      if (!response?.error) {
        router.push("/dashboard");
        router.refresh();
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Login Successful", response);
      toast({ title: "Login Successful" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login Failed:", error);
      toast({ title: "Login Failed", description: error.message });
    }
  };

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

      <main className="relative z-10 col-span-1 flex flex-col justify-center items-center md:col-start-3 bg-background-translucent bg-opacity-85 md:bg-transparent p-4 md:p-0 min-h-screen">
        <div className="flex flex-col justify-center gap-2 w-4/6 max-w-md mx-auto">
          <Button 
            onClick={() => signIn("google", { callbackUrl: "/" })} className="flex-1 gap-1 text-xs bg-white text-black font-bold border border-background hover:text-secondary-foreground hover:bg-white hover:text-neutral-400">
            <Image
              src="/google.svg"
              alt="Google Logo"
              width={24}
              height={24}
            />
            Sign in with Google
          </Button>
          <Button
              // onClick={() => signIn("instagram", { callbackUrl: "/" })}
              className="flex-1 gap-1 text-xs bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc2a8d] text-white font-bold border border-transparent hover:border-background-foreground hover:text-secondary-foreground hover:bg-secondary hover:border-background-foreground"
            >
            <Image
              src="/instagram.svg"
              alt="Instagram Logo"
              width={24}
              height={24}
            />
            Login with Instagram
          </Button>
        </div>
        <div className="flex items-center justify-center w-4/6 my-4">
          <div className="border-t border-muted-foreground flex-grow mr-3"></div>
          <span className="text-muted-foreground">or</span>
          <div className="border-t border-muted-foreground flex-grow ml-3"></div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-4 w-5/6 md:w-4/5 lg:w-3/5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background"
                      placeholder="Email"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      className="bg-background"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-2" type="submit">
              Sign in
            </Button>
          </form>
          <span className="flex justify-center text-sm text-center">
            <p className="mr-1">Don't have an account?</p>
            <Link
              href="/auth/signup"
              className="underline text-accent hover:cursor-pointer"
            >
              Sign up here
            </Link>
          </span>
        </Form>
      </main>
    </div>
  )
}