import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

interface UserContactProps {
  email?: string | null;
  discordUsername?: string | null;
  instagramUsername?: string | null;
}

export default function UserContact({ email, discordUsername, instagramUsername }: UserContactProps) {
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email,
      discordUsername,
      instagramUsername,
    },
  });

  const toggleEditing = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      // Reset fields to initial values if editing is canceled
      reset({ email, discordUsername, instagramUsername });
    }
  };

  const onSubmit = async (data: any) => {
    console.log("Form data submitted:", data);
    try {
      const response = await fetch(`/api/users/{user_id}/contact-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact information");
      }

      console.log("Contact information updated successfully");
      toggleEditing();
    } catch (error) {
      console.error("Error updating contact information:", error);
    }
  };

  return (
    <div className="mb-6 w-4/5 md:w-4/6 lg:w-3/5 xl:w-2/5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-primary">Contact Information</h2>
        <Button variant="link" onClick={toggleEditing}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid w-full max-w-sm gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            <Input
              type="email"
              id="email"
              placeholder="your_email@email.com"
              disabled={!isEditing}
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="discord">Discord</Label>
          <div className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-2" />
            <Input
              type="text"
              id="discord"
              placeholder="username"
              disabled={!isEditing}
              {...register("discordUsername")}
              className={errors.discordUsername ? "border-red-500" : ""}
            />
          </div>
          {errors.discordUsername && (
            <p className="text-red-500 text-sm">
              {errors.discordUsername.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <div className="flex items-center">
            <Instagram className="w-4 h-4 mr-2" />
            <Input
              type="text"
              id="instagram"
              placeholder="@username"
              disabled={!isEditing}
              {...register("instagramUsername")}
              className={errors.instagramUsername ? "border-red-500" : ""}
            />
          </div>
          {errors.instagramUsername && (
            <p className="text-red-500 text-sm">
              {errors.instagramUsername.message}
            </p>
          )}
        </div>

        {isEditing && (
          <Button variant="outline" type="submit">Save Changes</Button>
        )}
      </form>
    </div>
  );
}
