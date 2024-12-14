"use client";

import { useSession } from "next-auth/react";

import UserInfo from "./UserInfo";
import UserContact from "./UserContact";
import UserSettingsLoading from "./UserSettingsLoading";
import LoginReminder from "@/components/LoginReminder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserSettings() {
  const { data: session, status } = useSession();
  const name = "nick";
  const biography = "I'm a software engineer and I love building";

  if (status === "loading") return <UserSettingsLoading />;
  return (
    <>
      {session && status === "authenticated" ? (
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
            <UserInfo name={name} biography={biography}/>
            <UserContact />
          </main>
        </div>
      ) : (
        <LoginReminder />
      )}
    </>
  );
}
