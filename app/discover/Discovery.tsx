"use client";

import React, { useState, useEffect } from "react";
import MatchmakingCard, { MeetingPreference, MethodPreference } from "@/components/MatchmakingCard";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import { HandIcon } from "lucide-react";

type Profile = {
  user_id: string;
  name: string;
  age: number;
  university: string;
  intro: string;
  accountabilityAreas: string[];
  goalBuckets: string[];
  meetingPreference: MeetingPreference;
  methodPreference: MethodPreference;
};


export default function Discovery() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [viewingProfile, setViewingProfile] = useState(false);

  // Fetch all profiles once when the component mounts
  useEffect(() => {
    const fetchUsersToDisplay = async () => {
      console.log("Fetching users to display...");

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/users/ids`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Successfully fetched users:", data.data);
        setProfiles(data.data); // Update state with fetched profiles
      } catch (e) {
        console.error("Failed to fetch users:", e);
      }
    };

    fetchUsersToDisplay();
  }, []);

  // Navigate to the next set of profiles
  const handleNext = () => {
    if (currentIndex + 2 < profiles.length) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  // Navigate to the previous set of profiles
  const handlePrevious = () => {
    if (currentIndex - 2 >= 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  return (
    <div id="ProfileDiscovery">
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

          <ProfileCard username="TestUsername" />
        </div>
      ) : (
        <div id="MatchMakingPage" className="flex flex-col justify-center items-center">
          <div id="MatchMakingBody" className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-4">
            {profiles.slice(currentIndex, currentIndex + 2).map((profile, index) => (
              <MatchmakingCard
                key={profile.user_id}
                name={profile.name || `User ${index + 1}`}
                age={profile.age || 0}
                university={profile.university || "Unknown University"}
                intro={profile.intro || "No intro provided."}
                accountabilityAreas={profile.accountabilityAreas || []}
                goalBuckets={profile.goalBuckets || []}
                meetingPreference={profile.meetingPreference || MeetingPreference.Weekly}
                methodPreference={profile.methodPreference || MethodPreference.Virtual}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
