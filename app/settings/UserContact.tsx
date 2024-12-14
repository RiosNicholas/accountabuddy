import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Instagram, Mail, MessageCircle } from "lucide-react";
 
const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  discordUsername: z.string().nonempty("Discord username cannot be empty"),
  instagramUsername: z.string().regex(/^@?\w+$/, "Invalid Instagram username").optional(),
});

export default function UserContact() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "email@email.com",
      discordUsername: "username",
      instagramUsername: "@username",
    },
  });

  const toggleEditing = () => setIsEditing(!isEditing);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    toggleEditing();
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
          <Button variant="outline" type="submit">
            Save Changes
          </Button>
        )}
      </form>
    </div>
  );
}
