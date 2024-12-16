"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Instagram, Mail, MessageCircle } from "lucide-react";

const contactSchema = z.object({
  email: z
    .string()
    .nullable()
    .optional()
    .refine(
      (value) => !value || z.string().email().max(255).safeParse(value).success,
      { message: "Invalid email address or exceeds 255 characters" }
    ),
  discordUsername: z
    .string()
    .nullable()
    .optional()
    .refine(
      (value) => !value || value.length <= 50,
      { message: "Discord username must be at most 50 characters" }
    ),
  instagramUsername: z
    .string()
    .nullable()
    .optional()
    .refine(
      (value) => !value || /^@?\w+$/.test(value),
      { message: "Invalid Instagram username" }
    )
    .refine(
      (value) => !value || value.length <= 50,
      { message: "Instagram username must be at most 50 characters" }
    ),
});

type FormValues = z.infer<typeof contactSchema>;

interface UserContactProps {
  userId: string;
  email?: string | null;
  discordUsername?: string | null;
  instagramUsername?: string | null;
}

export default function UserContact({ userId, email, discordUsername, instagramUsername }: UserContactProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [latestChanges, setLatestChanges] = useState({
    email: email ?? null,
    discordUsername: discordUsername ?? null,
    instagramUsername: instagramUsername ?? null,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email,
      discordUsername,
      instagramUsername,
    },
  });

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      form.reset(latestChanges);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const mappedData = {
      email: data.email,
      discord: data.discordUsername,
      instagram: data.instagramUsername,
    };

    console.log("Mapped payload:", mappedData);

    try {
      const response = await fetch(`/api/users/${userId}/contact-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mappedData),
      });

      if (!response.ok) throw new Error("Failed to update contact information");

      setLatestChanges((prev) => ({
        ...prev,
        email: mappedData.email ?? prev.email,
        discordUsername: mappedData.discord ?? prev.discordUsername,
        instagramUsername: mappedData.instagram ?? prev.instagramUsername,
      }));

      toast({
        title: "Contact updated",
        description: "Your contact information has been updated successfully.",
      });

      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error updating contact information",
        description: (error instanceof Error ? error.message : "Unable to update contact information. Please try again."),
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="my-6 w-4/5 md:w-4/6 lg:w-3/5 xl:w-2/5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-primary">Contact Information</h2>
        <Button variant="link" onClick={toggleEditing}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <Input
                      {...field}
                      disabled={!isEditing}
                      placeholder="your_email@email.com"
                      value={field.value || latestChanges.email || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        setLatestChanges((prev) => ({ ...prev, email: e.target.value }));
                      }}
                      className={fieldState.invalid ? "border-red-500" : ""}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discord Field */}
          <FormField
            control={form.control}
            name="discordUsername"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Discord</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <Input
                      {...field}
                      disabled={!isEditing}
                      placeholder="username"
                      value={field.value || latestChanges.discordUsername || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        setLatestChanges((prev) => ({ ...prev, discordUsername: e.target.value }));
                      }}
                      className={fieldState.invalid ? "border-red-500" : ""}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Instagram Field */}
          <FormField
            control={form.control}
            name="instagramUsername"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Instagram className="w-4 h-4 mr-2" />
                    <Input
                      {...field}
                      disabled={!isEditing}
                      placeholder="@username"
                      value={field.value || latestChanges.instagramUsername || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        setLatestChanges((prev) => ({ ...prev, instagramUsername: e.target.value }));
                      }}
                      className={fieldState.invalid ? "border-red-500" : ""}
                    />
                  </div>
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
