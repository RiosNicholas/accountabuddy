/* eslint-disable react/no-unescaped-entities */
"use client"

import {useSession} from "next-auth/react";


export default function HomePage() {
  const {data: session, status} = useSession();

  // TODO: if signed in, then redirect to dashboard
  return (
    <main className="flex flex-col items-center justify-center bg-background h-4/5">
      <h1 className="text-4xl font-bold mb-4 text-background-foreground">Coming Soon</h1>
      <p className="text-lg text-secondary-foreground">We're working hard to bring you something amazing. Stay tuned!</p>
    </main>
  );
}
