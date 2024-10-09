"use client"

import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import PromptDisplay from "@/components/PromptDisplay";
import Image from 'next/image';
import myImage from '@/public/profile-picture.jpg';

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

    let viewingProfile = false;

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
                   
                <div id="profile-card1" className="w-[40rem] rounded-[5rem] overflow-hidden bg-primary shadow-lg text-center"> 
    
    
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
    
    
                    <div id="profile-card2" className="w-[40rem]  rounded-[4rem] overflow-hidden bg-primary shadow-lg text-center"> 
    
    
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
    
    
                    
    
    
    
    
                </div>
            </div>
        );
    }
}
