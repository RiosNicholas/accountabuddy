import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { ModeToggle } from "./ui/mode-toggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center z-10"> 
      <div className="flex items-center px-2 mx-1 gap-2">
        <Image
          src="/icon.svg" 
          alt="Accountabuddy logo"
          width={32}
          height={32}
        />
        <h1 className="text-lg font-black">Accountabuddy</h1>
      </div>
      <div className="flex justify-end items-center">
        <Avatar className="w-8 h-8 hover:cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@username" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <ModeToggle/>
      </div>
    </header>
  )
}