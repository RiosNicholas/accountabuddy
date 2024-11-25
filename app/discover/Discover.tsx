"use client"

import React, { useState } from "react";

import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import ProfileDiscovery from "./ProfileDiscovery";
import { Cross1Icon } from "@radix-ui/react-icons";
import { HandIcon } from "lucide-react";

interface promptData {
  [key: string]: string
}

const prompts: promptData = {
  'School': 'Rutgers University - Newark',
  "Meeting Preference": "Virtual",
  "Major": "Computer Science",
  "Biggest Challenge": "Time Management"
}

const dummyData = {
  'name': "Corbin Grosso",
  "prompts": prompts,
  'Bio': "Hi! I'm Corbin, and I'm one of the people who made this web app!",
  "test1": "content for test 1",
  "test2": "content for test 2",
  "test3": "content for test 3"
}
export default function Discover({}) {
  const [viewingProfile, setViewingProfile] = useState(true);

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


  if (viewingProfile) {
    let infoCards = []
    let aboutPrompt = []
    for (var prompt in dummyData.prompts) {
      let infoCards = []
    }
    // infoCards.push(<PromptDisplay prompt={"About"} response={aboutPrompt} />)

    // infoCards.push(<PromptDisplay prompt={"Bio"} response={dummyData["Bio"]} />)
    // infoCards.push(<PromptDisplay prompt={"test1"} response={dummyData["test1"]} />)
    // infoCards.push(<PromptDisplay prompt={"test2"} response={dummyData["test2"]} />)
    // infoCards.push(<PromptDisplay prompt={"test3"} response={dummyData["test3"]} />)
  } 

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
      <ProfileDiscovery />
    )
  );
}