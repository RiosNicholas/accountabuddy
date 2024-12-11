/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import ProfileCard from "@/components/ProfileCard";
import LoginReminder from "@/components/LoginReminder";
import LoadingUser from "./LoadingUser";

interface UserProfile {
  username: string;
  name?: string;
  university?: string;
  biography?: string;
  contactInfo?: {
    email: string;
    instagram: string;
    discord: string;
  };
  meetingFrequency?: string;
  methodPreference?: string;
  accountabilityAreas: string[];
  growthAreas: string[];
}

export default function UserPage() {
  const params = useParams(); 
  const username = params?.username;
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      console.error("No username provided in the URL.");
      setLoading(false);
      return;
    }

    async function fetchUserData() {
      try {
        setLoading(true);

        // Fetching user_id by username
        const userIdResponse = await fetch(`/api/usernames/${username}`);
        if (!userIdResponse.ok) {
          throw new Error("Failed to fetch user ID");
        }
        const { user_id } = await userIdResponse.json();

        // Fetching core user data by user_id
        const userResponse = await fetch(`/api/users/${user_id}`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();

        // Fetching accountability areas
        const accountabilityResponse = await fetch(`/api/users/${user_id}/accountability-areas`);
        if (!accountabilityResponse.ok) {
          throw new Error("Failed to fetch accountability areas");
        }
        const accountabilityData = await accountabilityResponse.json()

        // Fetching growth areas
        const growthResponse = await fetch(`/api/users/${user_id}/growth-areas`);
        if (!growthResponse.ok) {
          throw new Error("Failed to fetch growth areas");
        }
        const growthData = await growthResponse.json()

        setUserInfo({
          username: userData.username,
          name: userData.name || null,
          university: userData.university || null,
          biography: userData.biography || null,
          contactInfo: {
            email: userData.contact_info?.email || "",
            instagram: userData.contact_info?.instagram || "",
            discord: userData.contact_info?.discord || "",
          },
          meetingFrequency: userData.meeting_frequency || null,
          methodPreference: userData.meeting_preference || null,
          accountabilityAreas: accountabilityData.data || [],
          growthAreas: growthData.data || [],
        });

        console.log("Successfully fetched user data", userData);
        console.log("Successfully fetched growth data", growthData);
        console.log("Successfully fetched accountability data", accountabilityData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [username]);

  if (status === "loading" || loading) {
    return <LoadingUser />;
  }

  return (
    <>
      {session ? (
        <main className="flex justify-center w-screen">
          {userInfo && (
            <ProfileCard
              username={userInfo.username}
              name={userInfo.name || "Unknown"}
              university={userInfo.university || "University not specified"}
              contactInfo={userInfo.contactInfo || { email: "", instagram: "", discord: "" }}
              biography={userInfo.biography || "No biography provided."}
              meetingFrequency={userInfo.meetingFrequency || "Not specified"}
              methodPreference={userInfo.methodPreference || "Not specified"}
              accountabilityAreas={userInfo.accountabilityAreas}
              growthAreas={userInfo.growthAreas}
            />
          )}
        </main>
      ) : (
        <LoginReminder />
      )}
    </>
  );
}
