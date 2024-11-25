/* eslint-disable react/no-unescaped-entities */
"use client";

// import {useSession} from "next-auth/react";
// import LoginReminder from "@/components/LoginReminder";
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import ProfileCard from '@/components/ProfileCard';

// interface UserPageProps {
//   username: string;
//   name: string;
//   university: string;
// }

export default function UserPage() {
  const { username } = useParams() as { username: string };
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
      <ProfileCard username={username} />
    </main>
  );
}
