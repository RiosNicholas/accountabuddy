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

export default function User() {
  const params = useParams();
  const username = params?.username;
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      console.error("No username provided in the URL.");
      setLoading(false);
      return;
    }

    async function fetchUserId() {
      try {
        const response = await fetch(`/api/usernames/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user ID");
        }
        const { user_id } = await response.json();
        setUserId(user_id);
      } catch (err) {
        console.error("Error fetching user ID:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserId();
  }, [username]);

  useEffect(() => {
    if (!userId) return;

    async function fetchUserData() {
      try {
        setLoading(true);

        // Fetching core user data by user_id
        const userResponse = await fetch(`/api/users/${userId}`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();

        // Fetching accountability areas
        const accountabilityResponse = await fetch(`/api/users/${userId}/accountability-areas`);
        if (!accountabilityResponse.ok) {
          throw new Error("Failed to fetch accountability areas");
        }
        const accountabilityData = await accountabilityResponse.json();

        // Fetching growth areas
        const growthResponse = await fetch(`/api/users/${userId}/growth-areas`);
        if (!growthResponse.ok) {
          throw new Error("Failed to fetch growth areas");
        }
        const growthData = await growthResponse.json();

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

        console.log("Successfully fetched user data");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [userId]);

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center w-full h-auto">
        <LoadingUser />
      </div>
    );
  }

  const isCurrentUser = session?.user?.id === userId;

  return (
    <>
      {session ? (
        <>
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
              isCurrentUser={isCurrentUser}
            />
          )}
        </>
      ) : (
        <LoginReminder />
      )}
    </>
  );
}
