"use client"

import React, { ReactElement } from "react";
import PromptDisplay from "@/components/PromptDisplay";
import Image from 'next/image';
import myImage from '@/public/profile-picture.jpg';
import MatchmakingCard, { MeetingPreference, MethodPreference } from "@/components/MatchmakingCard";


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



export default function Matchmaking({}) {

    interface promptData {
        [key: string]: string | ReactElement
    }

    const prompts: promptData = {
        'School': 'Rutgers University - Newark',
        "Meeting Preference": "Virtual",
        "Major": "Computer Science",
        "Biggest Challenge": <b>Time Management</b>
    }

    const dummyData = {
        'name': "Corbin Grosso",
        prompts,
        'blurb': "Hi! I'm Corbin, and I'm one of the people who made this web app!"
    }

    const viewingProfile = false;

    if (viewingProfile) {

        const promptComponents = []
        for (const prompt in dummyData.prompts) {
            promptComponents.push(<PromptDisplay prompt={prompt} response={dummyData.prompts[prompt]} />)
        }

        return (
            <div className="flex flex-col items-center">
                <div>
                    <h1 className="w-80 text-2xl">{dummyData.name}'s Profile</h1> {/* eslint-disable-line react/no-unescaped-entities */}
                </div>
                <div>
                    <Avatar>
                        <AvatarImage src="none" alt={dummyData.name} />
                        <AvatarFallback delayMs={600}>CG</AvatarFallback>
                    </Avatar>
                    {promptComponents}
                </div>
            </div>
        );
    } else {
        return (
            <div id="MatchMakingPage" className="flex flex-col justify-center items-center">
                <h1 className="text-center font-bold text-4xl pb-16">Matchmaking</h1>
                <div id="MatchMakingBody" className="grid grid-cols-1 lg:grid-cols-2 gap-20 px-4">
                    
                        <MatchmakingCard
							name="John Doe"
							age={22}
							university="Rutgers University"
							intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue pellentesque auctor. 
                                    Curabitur malesuada volutpat odio, vel luctus tortor iaculis id. Duis rhoncus ornare purus, vel rutrum mi elementum 
                                    pharetra. Donec posuere ac risus nec viverra. Morbi sed metus a diam tristique pellentesque. Proin volutpat erat eget 
                                    sapien luctus, vitae consequat tortor tristique. Duis id vulputate diam, ac dictum justo. Ut laoreet dictum massa, 
                                    nec scelerisque leo tristique vitae. Donec ullamcorper congue euismod. Aenean tristique bibendum dolor molestie eleifend. 
                                    In vel est non arcu tempor eleifend et non urna. Mauris ullamcorper nisi scelerisque lacus pellentesque iaculis. Suspendisse vulputate nec ni
                                    sl vel accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in nibh quam."
							accountabilityAreas={['Setting and Reaching Goals', 'Managing Time Effectively']}
							goalBuckets={['Education', 'Career']}
							meetingPreference={MeetingPreference.Weekly}
							methodPreference={MethodPreference.InPerson}
						/>

                        <MatchmakingCard
							name="Jane Smith"
							age={24}
							university="Rutgers University"
							intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue pellentesque auctor. 
                                    Curabitur malesuada volutpat odio, vel luctus tortor iaculis id. Duis rhoncus ornare purus, vel rutrum mi elementum 
                                    pharetra. Donec posuere ac risus nec viverra. Morbi sed metus a diam tristique pellentesque. Proin volutpat erat eget 
                                    sapien luctus, vitae consequat tortor tristique. Duis id vulputate diam, ac dictum justo. Ut laoreet dictum massa, 
                                    nec scelerisque leo tristique vitae. Donec ullamcorper congue euismod. Aenean tristique bibendum dolor molestie eleifend. 
                                    In vel est non arcu tempor eleifend et non urna. Mauris ullamcorper nisi scelerisque lacus pellentesque iaculis. Suspendisse vulputate nec ni
                                    sl vel accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in nibh quam."
							accountabilityAreas={['Focusing on Wellness', 'Habit Building']}
							goalBuckets={['Health & Fitness', 'Self Development']}
							meetingPreference={MeetingPreference.Daily}
							methodPreference={MethodPreference.Virtual}
							
						/>
                    
                </div>
            </div>
        );
    }
}
