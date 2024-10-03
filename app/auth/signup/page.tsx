"use client";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ProfileSignup() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-left text-xl font-bold p-3 mr-6">Create your account</h1>
      <Avatar className="h-20 w-20">
        <AvatarImage src="../../public/profile-picture.jpg"/>
        <AvatarFallback>Member</AvatarFallback>
      </Avatar>
        
        {/* TODO: add form labels and create proper zod form. blur password details */}
      <form className="my-2 space-y-2">
        <Input placeholder="Name"/>
        <Input placeholder="Email"/>
        <Input placeholder="Password"/>
        <Input placeholder="Confirm Password"/>
      </form>
      <Button type="submit">Sign up</Button>
    </main>
  );
}
