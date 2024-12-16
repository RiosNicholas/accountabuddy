"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import DiscoverSkeleton from "./DiscoverSkeleton";
import MatchmakingCard, { MeetingPreference, MethodPreference } from "@/components/MatchmakingCard";
import { Button } from "@/components/ui/button";
import LoginReminder from "@/components/LoginReminder";
import { motion } from "framer-motion";

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
  const [profilesLoaded, setProfilesLoaded] = useState(false);

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
        // Fetch user IDs
        const response = await fetch(`/api/recommended-users?user_id=${session?.user.id}`);

        const userIds = await response.json();
        console.log(userIds);

        // Fetch individual profiles
        const enhancedProfiles = await Promise.all(
          userIds.map(async ({ user_id }: { user_id: string }) => {
            try {
              const [profileResponse, accountabilityResponse, growthResponse, universityResponse, bioResponse] =
                await Promise.all([
                  fetch(`/api/users/${user_id}`),
                  fetch(`/api/users/${user_id}/accountability-areas`),
                  fetch(`/api/users/${user_id}/growth-areas`),
                  fetch(`/api/users/${user_id}/university`),
                  fetch(`/api/users/${user_id}/bio`),
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

        // Filter out null results and set profiles
        const validProfiles = enhancedProfiles.filter(Boolean) as UserProfile[];
        setProfiles(validProfiles);

        // Reset the currentIndex whenever profiles are fetched
        setCurrentIndex(0);
        setProfilesLoaded(true);
        console.log("Successfully fetched profiles");
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && !profilesLoaded) {
      fetchUsersToDisplay();
    }
  }, [status, profilesLoaded, session?.user.id]);

  // Show only one or two profiles at a time based on the currentIndex
  const visibleProfiles = profiles.slice(currentIndex, currentIndex + 2);

  if (loading || status === "loading") {
    return <DiscoverSkeleton />;
  }

  if (profiles.length === 0 || visibleProfiles.length === 0) {
    return (
      <div className="flex justify-center items-center font-medium text-center text-lg text-muted-foreground">
        <p>No profiles found. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      {session ? (
        <main id="ProfileDiscovery">
          <div className="flex justify-start items-start">
            <Button variant="link" className="text-accent" onClick={toggleCompactView}>
              {compactView ? "Compact View" : "Detailed View"}
            </Button>
          </div>
          <div id="MatchMakingPage" className="flex flex-col justify-center items-center">
            <div id="MatchMakingBody" className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-4">
              {visibleProfiles.map((profile) => (
                <motion.div
                  key={profile.user_id}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                >
                  <MatchmakingCard
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
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      ) : (
        <LoginReminder />
      )}
    </>
  );
}
