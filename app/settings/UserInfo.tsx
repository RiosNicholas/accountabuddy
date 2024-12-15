"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(40),
  bio: z.string().min(2, { message: "Bio must be at least 2 characters." }).max(300),
});

type FormValues = z.infer<typeof FormSchema>;

interface UserInfoProps {
  userId: string;
  userName: string;
  initialBio: string;
}

export default function UserInfo({ userId, userName, initialBio }: UserInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localUserName, setLocalUserName] = useState(userName);
  const [localBio, setLocalBio] = useState(initialBio);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: userName,
      bio: initialBio,
    },
  });

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      // Reset the form on cancel
      form.reset({ name: localUserName, bio: localBio });
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // Update name
      const nameResponse = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name }),
      });

      if (!nameResponse.ok) throw new Error("Failed to update name");

      // Update biography
      const bioResponse = await fetch(`/api/users/${userId}/biography`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ biography: data.bio }),
      });

      if (!bioResponse.ok) throw new Error("Failed to update biography");

      // Update local state
      setLocalUserName(data.name);
      setLocalBio(data.bio);

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });

      setIsEditing(false); 
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: error.message || "Unable to update profile. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="my-6 w-4/5 md:w-4/6 lg:w-3/5 xl:w-2/5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-primary">User Info</h2>
        <Button variant="link" onClick={toggleEditing}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={!isEditing}
                    placeholder="Your name"
                    value={field.value || localUserName}
                    onChange={(e) => {
                      field.onChange(e);
                      setLocalUserName(e.target.value);
                    }}
                    className={fieldState.invalid ? "border-red-500" : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio Field */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={!isEditing}
                    placeholder="Tell us a little bit about yourself"
                    className={`resize-none ${fieldState.invalid ? "border-red-500" : ""}`}
                    value={field.value || localBio}
                    onChange={(e) => {
                      field.onChange(e);
                      setLocalBio(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEditing && (
            <Button variant="outline" type="submit">
              Save Changes
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
