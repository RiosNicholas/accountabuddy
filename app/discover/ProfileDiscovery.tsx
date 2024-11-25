import Image from 'next/image';
import myImage from '@/public/profile-picture.jpg';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ProfileDiscovery() {
  return (
    <div id="MatchMakingPage" className="flex flex-col justify-center items-center">
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
                                  <li key={0}>Self Development</li>
                                  <li key={1}>Health & Fitness</li>
                                  <li key={2}>Education</li>
                                  <li key={3}>Social</li>
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
  )
}