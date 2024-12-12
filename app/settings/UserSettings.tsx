"use client";

import UserBio from "./UserInfo";
import UserContact from "./UserContact";
import LoginReminder from "@/components/LoginReminder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSession } from "next-auth/react";

export default function UserSettings() {
  const { data: session, status } = useSession();
  return (
    <>
      {session ? (
        <div className="flex flex-col justify-center items-start w-full md:w-3/4 lg:w-3/5 xl:w-2/5">
          <h1 className="text-left text-xl font-bold mb-2 w-4/5">
            Edit Profile
          </h1>
          <main className="flex flex-col w-full justify-center items-center">
            <div className="flex justify-center">
              <div className="w-20 h-20">
                <Avatar className="w-full h-full">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <UserBio />
            <UserContact />
          </main>
        </div>
      ) : (
        <LoginReminder />
      )}
    </>
  );
}
