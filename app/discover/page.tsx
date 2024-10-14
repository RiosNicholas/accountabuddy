"use client"

import React, { ReactElement } from "react";
import PromptDisplay from "@/components/PromptDisplay";
import Image from 'next/image';
import myImage from '@/public/profile-picture.jpg';


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



export default function MatchMaking({}) {

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

    let viewingProfile = true;

    if (viewingProfile) {

        let infoCards = []
        let aboutPrompt = []
        for (var prompt in dummyData.prompts) {
            aboutPrompt.push(<p><b>{prompt}:</b> {dummyData.prompts[prompt]}</p>)
        }
        infoCards.push(<PromptDisplay prompt={"About"} response={aboutPrompt} />)

        infoCards.push(<PromptDisplay prompt={"Bio"} response={dummyData["Bio"]} />)
        infoCards.push(<PromptDisplay prompt={"test1"} response={dummyData["test1"]} />)
        infoCards.push(<PromptDisplay prompt={"test2"} response={dummyData["test2"]} />)
        infoCards.push(<PromptDisplay prompt={"test3"} response={dummyData["test3"]} />)
        
        return (
            <div className="flex flex-col items-center">
                <div>
                    <h1 className="w-380 text-2xl">{dummyData.name}'s Profile</h1>
                </div>
                <div className="flex flex-col items-center w-3/4">
                    <Avatar className="m-4">
                        <AvatarImage
                            src="none"
                            alt={dummyData.name}
                        />
                        <AvatarFallback delayMs={600}>
                            CG
                        </AvatarFallback>
                    </Avatar>
                    <div className="">
                        {infoCards}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id="MatchMakingPage" className="flex flex-col justify-center items-center">
                <h1 className="text-center font-bold text-4xl pb-16">Matchmaking</h1>
                <div id="MatchMakingBody" className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div id="profile-card1" className="grid w-[40rem] rounded-lg overflow-hidden bg-primary shadow-lg text-center">

                            <div id="profile-details">

                            <div className="p-8">
                                <Image
                                    className="w-64 h-64  object-cover rounded-2xl float-left "
                                    src={myImage}  
                                    alt="My Image"
                                />
                            </div>
                            
                            <div id="profile-college" className="p-4 text-2xl font-bold text-black">Rutgers University </div>
                                <div id="profile-name" className=" text-2xl font-bold text-black">John Doe ,25</div>
                                <div id="profile-bio" className="clear-both p-5 text-base font-[family-name:var(--font-geist-sans)] mt-2 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue pellentesque auctor. 
                                    Curabitur malesuada volutpat odio, vel luctus tortor iaculis id. Duis rhoncus ornare purus, vel rutrum mi elementum 
                                    pharetra. Donec posuere ac risus nec viverra. Morbi sed metus a diam tristique pellentesque. Proin volutpat erat eget 
                                    sapien luctus, vitae consequat tortor tristique. Duis id vulputate diam, ac dictum justo. Ut laoreet dictum massa, 
                                    nec scelerisque leo tristique vitae. Donec ullamcorper congue euismod. Aenean tristique bibendum dolor molestie eleifend. 
                                    In vel est non arcu tempor eleifend et non urna. Mauris ullamcorper nisi scelerisque lacus pellentesque iaculis. Suspendisse vulputate nec ni
                                    sl vel accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in nibh quam.</div>
                            </div>
        
                            
                            <div id="profile-interests" className="flex justify-around mt-4 p-4">
                                <div className="bg-white py-2 px-6 rounded-full shadow-md text-gray-700 font-semibold">
                                    method-preference: Virtual
                                </div>
                                <div className="bg-white py-2 px-6 rounded-full shadow-md text-gray-700 font-semibold">
                                    meeting Frequency: Bi-Weekly
                                </div>
                            </div>
        
                            <div id="areas-growth" className="p-5 flex justify-center">
                            <div className="w-[15rem] bg-white py-2 px-6 rounded-full shadow-md text-gray-700 font-semibold ">
                                    <div>
                                        Areas of Growth:
                                        <ul className="py-4 px-4">
                                            <li>Self Development</li>
                                            <li>Health & Fitness</li>
                                            <li>Education</li>
                                            <li>Social</li>
                                        </ul>
                                    </div>
                            </div>
                            </div>
                            
        
        
        
                            <div id="profile-actions" className="flex justify-around p-4">
                            <button id="like-button" className="bg-white border-none rounded-full w-12 h-12 text-2xl cursor-pointer shadow-md hover:shadow-lg text-green-500">✖</button>
                            <button id="dislike-button" className="bg-white border-none rounded-full w-12 h-12 text-2xl cursor-pointer shadow-md hover:shadow-lg text-red-500">✋</button>
                            </div>
                    </div>
                    <Card className="bg-secondary text-secondary-foreground">
                        <div className="flex justify-center p-6 gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="../../public/profile-picture.jpg"/>
                                <AvatarFallback>Member</AvatarFallback>
                            </Avatar>
                            {/* TODO:  Make text be left-aligned */}
                            <div className="flex flex-col content-start text-left">
                                <CardTitle>Name Prop, Age Prop</CardTitle>
                                <CardHeader className="font-medium">University Name Props</CardHeader>
                            </div>
                        </div>
                        <CardContent>
                            <p className="text-center">Intro Prop</p>
                            <div className="bg-primary text-primary-foreground">
                                stuff
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}
