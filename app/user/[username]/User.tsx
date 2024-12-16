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
  name?: string | null;
  university?: string | null;
  biography?: string | null;
  contactInfo: {
    email?: string | null;
    instagram?: string | null;
    discord?: string | null;
  };
  meetingFrequency?: string | null;
  methodPreference?: string | null;
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

  // Fetch user ID based on username
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

  // Fetch user data based on userId
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

        // Main user fetch (critical data)
        const userData =
          userResult.status === "fulfilled" && userResult.value.ok
            ? await userResult.value.json()
            : null;

        if (!userData) {
          setError("User does not exist.");
          setLoading(false);
          return;
        }

        // Optional fields with fallback values
        const biographyData =
          bioResult.status === "fulfilled" && bioResult.value.status !== 404
            ? await bioResult.value.json()
            : { biography: null };

        const universityData =
          universityResult.status === "fulfilled" && universityResult.value.status !== 404
            ? await universityResult.value.json()
            : { university_name: null };

        const contactData =
          contactResult.status === "fulfilled" && contactResult.value.status !== 404
            ? (await contactResult.value.json()) || { email: null, instagram: null, discord: null }
            : { email: null, instagram: null, discord: null };

        const accountabilityData =
          accountabilityResult.status === "fulfilled" && accountabilityResult.value.ok
            ? (await accountabilityResult.value.json()) || { data: [] }
            : { data: [] };

        const growthData =
          growthResult.status === "fulfilled" && growthResult.value.ok
            ? (await growthResult.value.json()) || { data: [] }
            : { data: [] };

        // Set user info with defaults applied
        setUserInfo({
          username: userData.username || "Unknown",
          name: userData.name || "Anonymous User",
          university: universityData.university_name || "University not specified",
          biography: biographyData.biography || "No biography provided.",
          contactInfo: {
            email: contactData?.email || "Email not provided",
            instagram: contactData?.instagram || "Instagram not provided",
            discord: contactData?.discord || "Discord not provided",
          },
          meetingFrequency: userData.meeting_frequency || "Not specified",
          methodPreference: userData.meeting_preference || "Not specified",
          accountabilityAreas: accountabilityData.data || [],
          growthAreas: growthData.data || [],
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An error occurred while fetching user data.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [userId]);

  // Handle loading and error states
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
            contactInfo={{
              email: userInfo.contactInfo.email || "Email not provided",
              instagram: userInfo.contactInfo.instagram || "Instagram not provided",
              discord: userInfo.contactInfo.discord || "Discord not provided",
            }}
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
