"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";

import UserInfo from "./UserInfo";
import UserContact from "./UserContact";
import UserSettingsLoading from "./UserSettingsLoading";
import LoginReminder from "@/components/LoginReminder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserSettings() {
  const { data: session, status } = useSession();
  const [bio, setBio] = useState("");
  const [isLoadingBio, setIsLoadingBio] = useState(true);  

  // Use useCallback to define fetchUserBio so it doesn't get redefined on every render
  const fetchUserBio = useCallback(async () => {
    if (session?.user.id) {
      try {
        const bioResponse = await fetch(`/api/users/${session.user.id}/biography`);
        if (bioResponse.ok) {
          const bioJson = await bioResponse.json();
          setBio(bioJson.biography || "");
        } else {
          console.error("Failed to fetch user bio");
        }
      } catch (error) {
        console.error("Error fetching user bio:", error);
      } finally {
        setIsLoadingBio(false); // Ensure loading is updated
      }
    }
  }, [session?.user.id]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserBio();
    }
  }, [status, fetchUserBio]);

  if (status === "loading" || isLoadingBio) return <UserSettingsLoading />;

  return (
    <>
      {(session && status === "authenticated") ? (
        <div className="flex flex-col justify-center items-start w-full md:w-3/4 lg:w-3/5 xl:w-2/5">
          <h1 className="text-left text-xl font-bold mb-2 w-4/5">Edit Profile</h1>
          <main className="flex flex-col w-full justify-center items-center">
            <div className="flex justify-center">
              <div className="w-20 h-20">
                <Avatar className="w-full h-full">
                  <AvatarImage src="https://github.com/shadcn.png" alt={session.user.name || "User"} />
                  <AvatarFallback>{session.user.username.slice(0, 2).toUpperCase()}</AvatarFallback> 
                </Avatar>
              </div>
            </div>
            {/* Pass the bio only after it has loaded */}
            <UserInfo userId={session.user.id} userName={session.user.name || ""} initialBio={bio} />
            <UserContact />
          </main>
        </div>
      ) : (
        <LoginReminder />
      )}
    </>
  );
}
