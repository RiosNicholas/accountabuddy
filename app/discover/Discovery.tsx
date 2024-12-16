"use client";

import React, { useState, useEffect } from "react";
import MatchmakingCard, { MeetingPreference, MethodPreference } from "@/components/MatchmakingCard";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import { HandIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DiscoverSkeleton from "./DiscoverSkeleton";


interface UserProfile {
  user_id: string;
  username: string;
  name?: string;
  age?: number;
  university?: string;
  biography?: string;
  accountabilityAreas: string[];
  growthAreas: string[];
  meetingPreference?: MeetingPreference;
  methodPreference?: MethodPreference;
}

export default function Discovery() {
  /* TODO: 
    - add compact view/detailed view from dashboard
    - add animations from sank?
    - redux store to track profile array. buttons in card component should pop the profile from the array and display the next one
    - matchmaking card component buttons should make API calls to update the matches in db. might need to add some more tables to db
  */
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  // TODO: Implement pagination for profiles using currentIndex
  // const [currentIndex, setCurrentIndex] = useState(0); 
  const [currentIndex] = useState(0); 
  const [viewingProfile, setViewingProfile] = useState(false);
  const [compactView, setCompactView] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const toggleCompactView = () => {
		setCompactView((prevState) => !prevState);
	}

  // Fetch all profiles once when the component mounts
  useEffect(() => {
    const fetchUsersToDisplay = async () => {
      console.log("Fetching users to display...");
      setLoading(true);
  
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  
        // Fetching user IDs
        const userResponse = await fetch(`${baseUrl}/api/users/ids`);
        const { data: userIds } = await userResponse.json();
  
        // Helper function to transform areas
        const transformAreas = (rawData: { GrowthAreas?: { growth_area: string } }[]) =>
          rawData?.map((item: { GrowthAreas?: { growth_area: string } }) => item.GrowthAreas?.growth_area).filter(Boolean) || ["N/A"];
  
        // Fetching individual profiles
        const enhancedProfiles = await Promise.all(
          userIds.map(async ({ user_id }: { user_id: string }) => {
            try {
              const [accountabilityResponse, growthResponse, profileResponse] = await Promise.all([
                fetch(`${baseUrl}/api/users/${user_id}/accountability-areas`),
                fetch(`${baseUrl}/api/users/${user_id}/growth-areas`),
                fetch(`${baseUrl}/api/users/${user_id}`)
              ]);

  
              const [rawAccountability, rawGrowthAreas, { data: profile }] = await Promise.all([
                accountabilityResponse.json(),
                growthResponse.json(),
                profileResponse.json()
              ]);

  
              return {
                user_id,
                ...profile,
                accountabilityAreas: transformAreas(rawAccountability.data),
                growthAreas: transformAreas(rawGrowthAreas.data),
              };
            } catch (error) {
              console.error(`Error fetching data for user ID ${user_id}:`, error);
              return null; // Skip this user if there was an error
            }
          })
        );
  
        // Set profiles and filter out null results
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

  if (loading) {
    return <DiscoverSkeleton />;
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
            <div id="profile-actions" className={`flex justify-around`}>
              <Button variant="destructive" id="reject-button" className={`bg-white border-none rounded-full w-10 h-10 text-2xl cursor-pointer shadow-md hover:shadow-lg text-red-500 hover:text-white`}>
                <Cross1Icon /> 
              </Button>
              <Button variant="default" id="connect-button" className={`bg-white border-none rounded-full w-10 h-10 text-2xl cursor-pointer shadow-md hover:shadow-lg text-green-500 hover:text-white`}>
                <HandIcon /> 
              </Button>
            </div>
          </div>

          <ProfileCard username="TestUsername" name={""} accountabilityAreas={[]} growthAreas={[]} />
        </div>
      ) : (
        <div id="MatchMakingPage" className="flex flex-col justify-center items-center">
          <div id="MatchMakingBody" className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-4">
            {loading && <Skeleton className="h-12 w-full" />}
            {profiles.slice(currentIndex, currentIndex + 2).map((profile, index) => (
              <MatchmakingCard
              onClick={() => setViewingProfile(true)}
              key={profile.user_id}
              name={profile.name || `User ${index + 1}`}
              age={profile.age} 
              university={profile.university || "Unknown University"}
              biography={profile.biography || "No intro provided."}
              accountabilityAreas={profile.accountabilityAreas?.length > 0 ? profile.accountabilityAreas : ["N/A"]}
              growthAreas={profile.growthAreas?.length > 0 ? profile.growthAreas : ["N/A"]}
              meetingPreference={profile.meetingPreference || MeetingPreference.Weekly}
              methodPreference={profile.methodPreference || MethodPreference.Virtual}
              compact={compactView}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
