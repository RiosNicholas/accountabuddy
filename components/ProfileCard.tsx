import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface ContactInfo {
  email: string;
  instagram: string;
  discord: string;
}

interface ProfileCardProps {
  username: string;
  name: string;
  university?: string;
  contactInfo?: ContactInfo;
  biography?: string;
  meetingFrequency?: string;
  methodPreference?: string;
  accountabilityAreas: string[];
  growthAreas: string[];
  isCurrentUser: boolean;
}

export default function ProfileCard({
  username,
  name,
  university = "Not specified",
  contactInfo,
  biography = "No biography provided.",
  meetingFrequency = "Not specified",
  methodPreference = "Not specified",
  accountabilityAreas,
  growthAreas,
  isCurrentUser
}: ProfileCardProps) {
  return (
    <Card className="bg-background text-background-foreground border-muted border2 p-6 m-2 w-full lg:w-3/4 xl:w-2/3 max-w-screen-xl">
      <div className="flex justify-between items-start">
        <div className="flex flex-col justify-center items-start mt-6 mx-6 mb-3">
          <Avatar className="h-20 w-20">
            <AvatarImage src="profile-picture.jpg" alt={`@${username}`} />
            <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center text-left">
            <CardTitle className="text-xl font-bold">@{username}</CardTitle>
            <CardHeader className="text-base p-0 font-semibold">
              {name} | {university}
            </CardHeader>
          </div>
        </div>
        {isCurrentUser && (
          <Link href="/settings">
            <Button variant="outline" className="hover:bg-accent hover:text-accent-foreground rounded-md p-2 mt-6 mx-6 mb-3">Edit Profile</Button>
          </Link>
        )}
      </div>
  
      <CardContent>
        <div className="mb-1">
          <h4 className="text-muted-foreground font-medium text-base">About Me</h4>
          <p className="text-sm p-1">{biography}</p>
        </div>
        <div className="mb-1">
          <h4 className="text-muted-foreground font-medium text-base">Contact Information</h4>
          {contactInfo ? (
            <ul className="text-xs p-1">
            <li className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              Email:{" "}
              <a className="hover:underline ml-1" href={`mailto:${contactInfo.email}`} target="_blank">
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-center">
              <Instagram className="w-4 h-4 mr-1" />
              Instagram: {contactInfo.instagram}
            </li>
            <li className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              Discord: {contactInfo.discord}
            </li>
          </ul>
            
          ) : (
            <p className="text-sm p-1">No contact information provided.</p>
          )}
        </div>
      </CardContent>
      <CardContent>
        <h4 className="text-muted-foreground font-semibold mb-2">Meeting Frequency Preference</h4>
        <div className="rounded bg-muted text-muted-foreground p-3 capitalize">{meetingFrequency}</div>
      </CardContent>
      <CardContent>
        <h4 className="text-muted-foreground font-semibold mb-2">Method Preference</h4>
        <div className="rounded bg-muted text-muted-foreground p-3 capitalize">{methodPreference}</div>
      </CardContent>
      <CardContent>
        <h4 className="text-primary font-semibold mb-2">Accountability Areas</h4>
        <div className="rounded bg-primary text-primary-foreground p-3 capitalize">
          {accountabilityAreas.length > 0 ? (
            accountabilityAreas.map((area, index) => <div key={index}>{area}</div>)
          ) : (
            <p>No accountability areas specified.</p>
          )}
        </div>
      </CardContent>
      <CardContent>
        <h4 className="text-primary font-semibold mb-2">Growth Areas</h4>
        <div className="rounded bg-primary text-primary-foreground p-3 capitalize">
          {growthAreas.length > 0 ? (
            growthAreas.map((area, index) => <div key={index}>{area}</div>)
          ) : (
            <p>No growth areas specified.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
