"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import DiscoverSkeleton from "./DiscoverSkeleton";
import MatchmakingCard, { MeetingPreference, MethodPreference } from "@/components/MatchmakingCard";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";

import { Cross1Icon } from "@radix-ui/react-icons";
import { HandIcon } from "lucide-react";

interface UserProfile {
  user_id: string;
  username: string;
  name?: string;
  university?: string;
  biography?: string;
  accountabilityAreas: string[];
  growthAreas: string[];
  meetingPreference?: MeetingPreference;
  methodPreference?: MethodPreference;
}

export default function Discovery() {
  const { data: session, status } = useSession();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [viewingProfile, setViewingProfile] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleCompactView = () => {
    setCompactView((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
        const userResponse = await fetch(`${baseUrl}/api/users/ids`);
        if (!userResponse.ok) throw new Error("Failed to fetch user IDs");

        const { data: userIds } = await userResponse.json();
        const profilesData = await Promise.all(
          userIds.map(async ({ user_id }: { user_id: string }) => {
            try {
              const [profileResponse, accountabilityResponse, growthResponse, universityResponse, bioResponse] = await Promise.all([
                fetch(`${baseUrl}/api/users/${user_id}`),
                fetch(`${baseUrl}/api/users/${user_id}/accountability-areas`),
                fetch(`${baseUrl}/api/users/${user_id}/growth-areas`),
                fetch(`${baseUrl}/api/users/${user_id}/university`),
                fetch(`${baseUrl}/api/users/${user_id}/bio`),
              ]);

              const profile = await profileResponse.json();
              const accountabilityAreas = await accountabilityResponse.json();
              const growthAreas = await growthResponse.json();
              const university = await universityResponse.json();
              const bio = await bioResponse.json();

              return {
                user_id,
                username: profile.username || `User_${user_id.slice(0, 8)}`,
                name: profile.name || `User ${user_id.slice(0, 8)}`,
                university: university.university || "Unknown University",
                biography: bio.biography || "No intro provided.",
                accountabilityAreas: accountabilityAreas.data || ["N/A"],
                growthAreas: growthAreas.data || ["N/A"],
                meetingPreference: profile.meetingPreference || MeetingPreference.Weekly,
                methodPreference: profile.methodPreference || MethodPreference.Virtual,
              };
            } catch (error) {
              console.error(`Error fetching data for user ID ${user_id}:`, error);
              return null;
            }
          })
        );

        setProfiles(profilesData.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (status === "loading" || loading) {
    return <DiscoverSkeleton />;
  }

  if (profiles.length === 0) {
    return (
      <div className="flex justify-center items-center font-medium text-center text-lg text-muted-foreground">
        <p>No profiles found. Please try again later.</p>
      </div>
    );
  }

  return (
    <main id="ProfileDiscovery">
      <div className="flex justify-start items-start">
        <Button variant="link" className="text-accent" onClick={toggleCompactView}>
          {compactView ? "Compact View" : "Detailed View"}
        </Button>
      </div>
      {viewingProfile ? (
        <div className="flex flex-col justify-center items-center p-3">
          <div className="flex justify-between items-center w-full lg:w-3/4 xl:w-2/3">
            <Button variant="link" onClick={() => setViewingProfile(false)}>Back</Button>
            <div id="profile-actions" className="flex justify-around">
              <Button
                variant="destructive"
                className="bg-white rounded-full w-10 h-10 text-2xl shadow-md hover:shadow-lg text-red-500 hover:text-white"
              >
                <Cross1Icon />
              </Button>
              <Button
                variant="default"
                className="bg-white rounded-full w-10 h-10 text-2xl shadow-md hover:shadow-lg text-green-500 hover:text-white"
              >
                <HandIcon />
              </Button>
            </div>
          </div>
          <ProfileCard username="TestUsername" name="" accountabilityAreas={[]} growthAreas={[]} isCurrentUser={false} />
        </div>
      ) : (
        <div id="MatchMakingPage" className="flex flex-col justify-center items-center">
          <div id="MatchMakingBody" className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-4">
            {profiles.map((profile) => (
              <Link key={profile.username} href={`/user/${profile.username}?ref=discover`} passHref>
                <MatchmakingCard
                  name={profile.name || "Anonymous"}
                  university={profile.university || "Unknown University"}
                  biography={profile.biography || "No intro provided."}
                  accountabilityAreas={profile.accountabilityAreas}
                  growthAreas={profile.growthAreas}
                  meetingPreference={profile.meetingPreference || MeetingPreference.Weekly}
                  methodPreference={profile.methodPreference || MethodPreference.NoPreference}
                  compact={compactView}
                  cardUserId={profile.user_id}
                  loggedUserId={session?.user.id || ""}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
