"use client"

import UserBio from "./UserInfo"
import UserContact from "./UserContact"
import LoginReminder from "@/components/LoginReminder"
import { useSession } from "next-auth/react";

export default function UserSettings() { 
  const { data: session, status } = useSession();
  return (
    <>
    {session ? (
      <div className="flex flex-col justify-center items-start w-full md:w-3/4 lg:w-3/5 xl:w-2/5">
        <h1 className="text-left text-xl font-bold mb-2">
          Edit Profile
        </h1>
        <UserBio />
        <UserContact />
      </div>
    ) : (
      <LoginReminder />
    )}
    </>
  )
}