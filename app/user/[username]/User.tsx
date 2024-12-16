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
  contactInfo: {
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
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setError("No username provided in the URL.");
      setLoading(false);
      return;
    }

    async function fetchUserId() {
      try {
        const response = await fetch(`/api/usernames/${username}`);
        if (!response.ok) throw new Error("Failed to fetch user ID");
        const { user_id } = await response.json();
        setUserId(user_id);
      } catch (err) {
        console.error("Error fetching user ID:", err);
        setError("Unable to fetch user ID. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserId();
  }, [username]);

  useEffect(() => {
    if (!userId) return;

    async function fetchUserData() {
      setLoading(true);
      setError(null);

      try {
        const results = await Promise.allSettled([
          fetch(`/api/users/${userId}`),
          fetch(`/api/users/${userId}/bio`),
          fetch(`/api/users/${userId}/university`),
          fetch(`/api/users/${userId}/contact-info`),
          fetch(`/api/users/${userId}/accountability-areas`),
          fetch(`/api/users/${userId}/growth-areas`),
        ]);

        const [userResult, bioResult, universityResult, contactResult, accountabilityResult, growthResult] = results;

        if (userResult.status === "rejected" || !userResult.value.ok)
          throw new Error("Failed to fetch user data");
        if (bioResult.status === "rejected" || !bioResult.value.ok)
          throw new Error("Failed to fetch user biography");
        if (universityResult.status === "rejected" || !universityResult.value.ok)
          throw new Error("Failed to fetch user university");
        if (contactResult.status === "rejected" || !contactResult.value.ok)
          throw new Error("Failed to fetch user contact info");
        if (accountabilityResult.status === "rejected" || !accountabilityResult.value.ok)
          throw new Error("Failed to fetch accountability areas");
        if (growthResult.status === "rejected" || !growthResult.value.ok)
          throw new Error("Failed to fetch growth areas");

        const userData = await userResult.value.json();
        const biographyData = await bioResult.value.json();
        const universityData = await universityResult.value.json();
        const contactData = await contactResult.value.json();
        const accountabilityData = await accountabilityResult.value.json();
        const growthData = await growthResult.value.json();

        setUserInfo({
          username: userData.username,
          name: userData.name || null,
          university: universityData.university_name || null,
          biography: biographyData.biography || null,
          contactInfo: {
            email: contactData.email || "",
            instagram: contactData.instagram || "",
            discord: contactData.discord || "",
          },
          meetingFrequency: userData.meeting_frequency || null,
          methodPreference: userData.meeting_preference || null,
          accountabilityAreas: accountabilityData.data || [],
          growthAreas: growthData.data || [],
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        if (err instanceof Error) {
          setError(err.message || "An unexpected error occurred.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [userId]);

  if (loading || status === "loading") {
    return (
      <div className="flex justify-center w-full h-auto">
        <LoadingUser />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center font-medium text-center text-lg text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const isCurrentUser = session?.user?.id === userId;

  return (
    <>
      {session ? (
        userInfo && (
          <ProfileCard
            username={userInfo.username}
            name={userInfo.name || "Unknown"}
            university={userInfo.university || "University not specified"}
            contactInfo={userInfo.contactInfo}
            biography={userInfo.biography || "No biography provided."}
            meetingFrequency={userInfo.meetingFrequency || "Not specified"}
            methodPreference={userInfo.methodPreference || "Not specified"}
            accountabilityAreas={userInfo.accountabilityAreas}
            growthAreas={userInfo.growthAreas}
            isCurrentUser={isCurrentUser}
          />
        )
      ) : (
        <LoginReminder />
      )}
    </>
  );
}
