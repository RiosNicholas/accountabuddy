"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LifeBuoy, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

import { signOut } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils";

interface HeaderProfileProps {
  user: {
    name: string;
    username: string;
    email: string;
    image?: string;
  };
}

export default function HeaderProfile({ user }: HeaderProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* FIXME: these components aren't being properly passed/displaying user metadata */}
        <Avatar className="w-8 h-8 hover:cursor-pointer hover:shadow-md">
          <AvatarImage src={user.image ?? "/default-avatar.png"} alt={user.username} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <Link href={`/user/${user.username}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer">
            <LifeBuoy className="mr-2 h-4 w-4" />
            <Link href="/support">Support</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => signOut({callbackUrl: 'http://localhost:3000/auth/login'})}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}