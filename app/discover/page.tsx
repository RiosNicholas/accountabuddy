"use client"

import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import PromptDisplay from "@/components/PromptDisplay";

export default function MatchMaking() {

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
        prompts,
        'blurb': "Hi! I'm Corbin, and I'm one of the people who made this web app!"
    }

    function ProfileCard() {
        return <div>Profile Card</div>
    }

    let viewingProfile = true;

    if (viewingProfile) {

        let promptComponents = []
        for (var prompt in dummyData.prompts) {
            promptComponents.push(<PromptDisplay prompt={prompt} response={dummyData.prompts[prompt]} />)

        }

        return (
            <div>
                <div>
                    <h1 className="w-80">{dummyData.name}'s Profile</h1>
                </div>
                <div>
                    <Avatar.Root>
                        <Avatar.Image
                            src="none"
                            alt={dummyData.name}
                        />
                        <Avatar.Fallback delayMs={600}>
                            CG
                        </Avatar.Fallback>
                    </Avatar.Root>
                    {promptComponents}
                </div>
            </div>
        );
    } else {
        return (
            <div id="MatchMakingPage">
                <div id="MatchMakingHeader">
                    <h1>Matchmaking</h1>
                </div>
                <div id="MatchMakingBody">
                    <ProfileCard />
                </div>
            </div>
        );
    }
}
