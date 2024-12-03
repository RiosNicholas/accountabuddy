import Image from "next/image";
import { ModeToggle } from "./ui/mode-toggle";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import HeaderProfile from "./HeaderProfile";

export default async function Header() {
  const session = await getServerSession(authOptions);
  
  return (
    <header className="flex justify-between items-center z-10"> 
      <Link href={session ? "/dashboard" : "/"}>
        <div className="flex items-center px-2 mx-1 gap-2 hover:cursor-pointer">
          <Image
            src="/icon.svg" 
            alt="Accountabuddy logo"
            width={32}
            height={32}
          />
          <h1 className="text-lg font-black">Accountabuddy</h1>
        </div>
      </Link>
      <div className="flex justify-end items-center">
        {session ? (
          session.user && (
            <HeaderProfile user={{
              name: session.user.name || '',
              username: session.user.username || '',
              email: session.user.email || '',
              // image: session.user.image || undefined
            }} />
          )
        ) : (
          <>
            <Link href="/auth/login">
              <Button variant="link" className="text-primary">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="link" className="text-primary">
                Signup
              </Button>
            </Link>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  )
}