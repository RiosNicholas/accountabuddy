"use client"

import UserBio from "./UserInfo"
import UserContact from "./UserContact"

export default function UserSettings() { 
  return (
    <div className="flex flex-col justify-center items-start w-full md:w-3/4 lg:w-3/5 xl:w-2/5">
      <h1 className="text-left text-xl font-bold mb-2">
        Edit Profile
      </h1>
      <UserBio />
      <UserContact />
    </div>
  )
}