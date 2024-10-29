"use client";

import router from "next/router";
import * as z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().min(3).max(50),
  password: z.string().min(6).max(50),
  // TODO: add message for invalid username or password
})
type FormData = z.infer<typeof formSchema>;

export default function SignupForm() {
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
  const onSubmit = async (data: FormData) => {
    console.log("Submitting signup form", data);
    const { name, username, email, password } = data;

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Signup Successful", response);
      toast({ title: "Signup Successful" });
      router.push("/auth/signup/preferences")
    } catch (e) {
      console.error("Signup Failed:", e);
      toast({ title: "Signup Failed", description: e.message });
    }
  };

  return (
    <>
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field}/>
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
                Sign up
              </Button>
            </div>
          </form>
        </Form>
    </>
  );
}