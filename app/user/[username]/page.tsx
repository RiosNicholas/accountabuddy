/* eslint-disable react/no-unescaped-entities */
"use client";

// import {useSession} from "next-auth/react";
// import LoginReminder from "@/components/LoginReminder";
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from 'react';

// interface UserPageProps {
//   username: string;
//   name: string;
//   university: string;
// }

export default function UserPage() {
  const { username } = useParams();
  // const {data: session, status} = useSession();

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(`/api/users/${username}`);
  //     const data = await response.json();
  //     // Handle the data
  //   }
  //   fetchData();
  // }, [username]);
  // }
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
      <Card className="bg-background text-background-foreground border-muted border2 p-6 m-2 w-full lg:w-3/4 xl:w-2/3 max-w-screen-xl">
        <div className="flex flex-col justify-center items-start m-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="profile-picture.jpg" alt={`@username`} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center text-left">
            <CardTitle className="text-xl font-bold">@{username}</CardTitle>
            <CardHeader className="text-base p-0 font-semibold">
              name | university
            </CardHeader>
          </div>
        </div>
        <CardContent className='text-secondary-foreground text-sm'>
          <p>Bio goes here</p>
        </CardContent>
        <CardContent>
          <h4 className="text-muted-foreground font-semibold mb-2">Method Preference</h4>
          <div className="rounded bg-muted text-muted-foreground p-3"> 
            methodPreference
          </div>
        </CardContent>  
        <CardContent>
          <h4 className="text-muted-foreground font-semibold mb-2">Method Preference</h4>
          <div className="rounded bg-muted text-muted-foreground p-3"> 
            methodPreference
          </div>
        </CardContent>
        <CardContent>
          <h4 className="text-muted-foreground font-semibold mb-2">Method Preference</h4>
          <div className="rounded bg-muted text-muted-foreground p-3"> 
            methodPreference
          </div>
        </CardContent>       
      </Card>
    </main>
  );
}
