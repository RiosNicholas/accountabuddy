"use client"
import Image from "next/image";
export default function MatchMaking() {
    const dummyData = {
        'name': "Corbin Grosso",
        'school': 'Rutgers University - Newark',
        'prompts': [
            {"Favorite Color": "Red"},
            {"Meeting Preference": "Virtual"}
        ],
        'blurb': "Hi! I'm Corbin, and I'm one of the people who made this web app!"
    }

    function ProfileCard() {
        return <div>Profile Card</div>
    }

    return (
        <div id="MatchMakingPage">
            <div id="MatchMakingHeader">
                <h1>Matchmaking</h1>
            </div>
            <div id="MatchMakingBody">
               
            <div id="profile-card1" className="w-[40rem] rounded-[5rem] overflow-hidden bg-primary shadow-lg text-center"> 


                    <div id="profile-details">
                    <div id="profile-college" className="p-4 text-2xl font-bold text-black">Rutgers University </div>
                        <div id="profile-name" className=" text-2xl font-bold text-black">John Doe ,25</div>
                        <div id="profile-bio" className="p-5 text-base mt-2 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue pellentesque auctor. 
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
                    <div id="profile-college" className="p-6 text-2xl font-bold text-black">Rutgers University </div>
                        <div id="profile-name" className="text-2xl font-bold text-black">John Doe ,25</div>
                        <div id="profile-bio" className=" p-5 text-base mt-2 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue pellentesque auctor. 
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
