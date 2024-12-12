import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserContact() {
  const [isEditing, setIsEditing] = useState(false);
  const email = "email@email.com";
  const discordUsername = "username";
  const instagramUsername = "username";

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  }

  return (
    <div className="w-4/5 md:w-4/6 lg:w-3/5 xl:w-2/5">
      <div className="flex justify-between">
        <h2 className="font-bold text-primary">Contact Information</h2>
        <Button variant="link" onClick={toggleEditing}>{isEditing ? "Cancel" : "Edit"}</Button>
      </div>
      
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2" />
          <Input type="email" disabled={!isEditing} id="email" value={email} />
        </div>

        <Label htmlFor="discord">Discord</Label>
        <div className="flex items-center">
          <MessageCircle className="w-4 h-4 mr-2" />
          <Input type="discord" disabled={!isEditing} id="discord" value={discordUsername ? `@${discordUsername}` : ""} />
        </div>

        <Label htmlFor="instagram">Instagram</Label>
        <div className="flex items-center">
          <Instagram className="w-4 h-4 mr-2" />
          <Input type="text" id="instagram" disabled={!isEditing} value={instagramUsername ? `@${instagramUsername}` : ""} />
        </div>
        { isEditing && <Button variant="outline" type="submit">Save Changes</Button> }
      </div>

    </div>
  );
}

