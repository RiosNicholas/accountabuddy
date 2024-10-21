"use client"

import {useSession} from "next-auth/react";

import LoginReminder from "@/components/LoginReminder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserPage() {
  const {data: session, status} = useSession();
  return (
    //   <>
    //     {session ? (
    //       <main>
    //         <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
    //       </main>
    //     ) : (
    //       <LoginReminder />
    //     )}
    //   </>
    // );
    <main className="flex justify-center w-screen">
      <Card className="bg-background text-background-foreground border-muted border-2 p-6 m-2 w-full lg:w-3/4 xl:w-2/3 max-w-screen-xl">
        <div className="flex flex-col justify-center items-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src="profile-picture.jpg" alt="@username" />
              <AvatarFallback>Name</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center text-left">
              <CardTitle className="text-xl font-bold">Name</CardTitle>
              <CardHeader className="text-base p-0 font-semibold">
                University Name
              </CardHeader>
            </div>
        </div>
        <CardContent>
          TODO:
          <br/>
          Stuff goes here. try to make use of shadcn components to make it look nice. maybe a header image as well above. this is where there could be detailed information, as well as optional contact information. work on a figma mockup beforehand. this is not meant to be an edit profile page. this page is to view a given profile which could include your own as well. if you're signed in and are viewing your own profile, then there should be a button visible to you to edit the profile in /settings/profile.
        </CardContent>
      </Card>
    </main>
  );
}