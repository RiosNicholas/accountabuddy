"use client";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  // TODO: add message for invalid username or password
})

export default function ProfileSignup() {
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
  }

  return (
    <main className="flex flex-col items-center justify-center p-3 w-full">
      <h1 className="text-left text-xl font-bold p-3">Create your account</h1>
      <Avatar className="h-20 w-20">
        <AvatarImage src="../../public/profile-picture.jpg"/>
        <AvatarFallback>Member</AvatarFallback>
      </Avatar>
        
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 my-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field}/>
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
                    {/* TODO: Conceal password as it is typed in the input bar */}
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit" className="my-2 w-full">
                <Link href="/preferences">
                  Sign up
                </Link>
              </Button>
            </div>
          </form>
        </Form>
    </main>
  );
}