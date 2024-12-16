"use client";

import React, { useState, useEffect } from "react";

import DiscoverSkeleton from "./DiscoverSkeleton";
import MatchmakingCard, { MeetingPreference, MethodPreference } from "@/components/MatchmakingCard";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";

import { Cross1Icon } from "@radix-ui/react-icons";
import { HandIcon } from "lucide-react";
import { useSession } from "next-auth/react";

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
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [compactView, setCompactView] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const [isDecisionMade, setIsDecisionMade] = useState(false);

  const toggleCompactView = () => {
    setCompactView((prevState) => !prevState);
  };

  useEffect(() => {
    if (isDecisionMade) {
      setCurrentIndex((prev) => prev + 1); 
      setIsDecisionMade(false);
    }
  }, [isDecisionMade]);

  // Fetch profiles when the component mounts
  useEffect(() => {
    const fetchUsersToDisplay = async () => {
      console.log("Fetching users to display...");
      setLoading(true);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

        // Fetch user IDs
        const userResponse = await fetch(`${baseUrl}/api/users/ids`);
        if (!userResponse.ok) throw new Error("Failed to fetch user IDs");

        const { data: userIds } = await userResponse.json();

        // Fetch individual profiles
        const enhancedProfiles = await Promise.all(
          userIds.map(async ({ user_id }: { user_id: string }) => {
            try {
              const [profileResponse, accountabilityResponse, growthResponse, universityResponse, bioResponse] =
                await Promise.all([
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
              return null; // Skip this user if there was an error
            }
          })
        );

        // Filter out null results
        setProfiles(enhancedProfiles.filter(Boolean));
        console.log("Successfully fetched profiles");
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersToDisplay();
  }, []);

  // Show only one or two profiles at a time based on the currentIndex
  const visibleProfiles = profiles.slice(currentIndex, currentIndex + 2);

  if (loading || status === "loading") {
    return <DiscoverSkeleton />;
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-muted-foreground font-medium">
          Please log in to view profiles.
        </p>
      </div>
    );
  }

  if (profiles.length === 0 || visibleProfiles.length === 0) {
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
      <div id="MatchMakingPage" className="flex flex-col justify-center items-center">
        <div id="MatchMakingBody" className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-4">
          {visibleProfiles.map((profile) => (
            <MatchmakingCard
              key={profile.user_id}
              name={profile.name || "Anonymous"}
              university={profile.university || "Unknown University"}
              biography={profile.biography || "No intro provided."}
              accountabilityAreas={profile.accountabilityAreas}
              growthAreas={profile.growthAreas}
              meetingPreference={profile.meetingPreference || MeetingPreference.Weekly}
              methodPreference={profile.methodPreference || MethodPreference.NoPreference}
              compact={compactView}
              loggedUserId={session?.user.id as string}
              cardUserId={profile.user_id}
              setIsDecisionMade={setIsDecisionMade}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
