"use client"

import React, { useState } from "react";
import MatchmakingCard, { MeetingPreference, MethodPreference } from "@/components/MatchmakingCard";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import { HandIcon } from "lucide-react";

}
export default function ProfileDiscovery() {
  const [viewingProfile, setViewingProfile] = useState(false);
  const [matches, setMatches] = useState([]);

  const fetchUsersToDisplay = async () => {
    console.log("Fetching users to display...");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/users/ids`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Successfully fetched users:", data.data);
      return data.data;
    } catch (e) {
      console.error("Failed to fetch users:", e);
    }
  };

  const fetchUserProfile = async (userId:string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Successfully fetched user profile: ", data.data);
      return data.data;
    } catch (e) {
      console.error("Failed to fetch user profile:", e);
    }
  };

  
  fetchUsersToDisplay()
    .then(userList => {
        var currUser = userList[0].user_id;
        console.log(typeof(currUser))
        fetchUserProfile(currUser)
      .then(profile => {
        console.log(profile)
      })
      .catch(error => {
        console.error("Error fetching user profile:", error);
      })
    })
    .catch(error => {
      console.error("Error fetching users:", error);
    }); 

  return (
    ( viewingProfile ) ? (
      <div className="flex flex-col justify-center items-center p-3">
        <div className="flex justify-between items-center bg-red w-full lg:w-3/4 xl:w-2/3">
          <Button variant="link" onClick={() => setViewingProfile(false)}>Back</Button>
          <div id="profile-actions" className={`flex justify-around`}>
            <Button variant="destructive" id="reject-button" className={`bg-white border-none rounded-full w-10 h-10 text-2xl cursor-pointer shadow-md hover:shadow-lg text-red-500 hover:text-white`}>
              <Cross1Icon/> 
            </Button>
            <Button variant="default" id="connect-button" className={`bg-white border-none rounded-full w-10 h-10 text-2xl cursor-pointer shadow-md hover:shadow-lg text-green-500 hover:text-white`}>
              <HandIcon/> 
            </Button>
          </div>
        </div>

        <ProfileCard username="TestUsername" />
      </div>
    ) : (
      <div id="MatchMakingPage" className="flex flex-col justify-center items-center">
        <div id="MatchMakingBody" className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-4">
          <MatchmakingCard
            name="John Doe"
            age={22}
            university="Rutgers University"
            intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue pellentesque auctor. Curabitur malesuada volutpat odio, vel luctus tortor iaculis id. Duis rhoncus ornare purus, vel rutrum mi elementum pharetra. Donec posuere ac risus nec viverra. Morbi sed metus a diam tristique pellentesque. Proin volutpat erat eget sapien luctus, vitae consequat tortor tristique. Duis id vulputate diam, ac dictum justo. Ut laoreet dictum massa, nec scelerisque leo tristique vitae. Donec ullamcorper congue euismod. Aenean tristique bibendum dolor molestie eleifend. In vel est non arcu tempor eleifend et non urna. Mauris ullamcorper nisi scelerisque lacus pellentesque iaculis. Suspendisse vulputate nec ni sl vel accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in nibh quam."
            accountabilityAreas={['Setting and Reaching Goals', 'Managing Time Effectively']}
            goalBuckets={['Education', 'Career']}
            meetingPreference={MeetingPreference.Weekly}
            methodPreference={MethodPreference.InPerson}
          />

          <MatchmakingCard
            name="Jane Smith"
            age={24}
            university="Rutgers University"
            intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue pellentesque auctor. Curabitur malesuada volutpat odio, vel luctus tortor iaculis id. Duis rhoncus ornare purus, vel rutrum mi elementum pharetra. Donec posuere ac risus nec viverra. Morbi sed metus a diam tristique pellentesque. Proin volutpat erat eget sapien luctus, vitae consequat tortor tristique. Duis id vulputate diam, ac dictum justo. Ut laoreet dictum massa, nec scelerisque leo tristique vitae. Donec ullamcorper congue euismod. Aenean tristique bibendum dolor molestie eleifend. In vel est non arcu tempor eleifend et non urna. Mauris ullamcorper nisi scelerisque lacus pellentesque iaculis. Suspendisse vulputate nec ni sl vel accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in nibh quam."
            accountabilityAreas={['Focusing on Wellness', 'Habit Building']}
            goalBuckets={['Health & Fitness', 'Self Development']}
            meetingPreference={MeetingPreference.Daily}
            methodPreference={MethodPreference.Virtual}
          />
        </div>
      </div>
    )
  );
}