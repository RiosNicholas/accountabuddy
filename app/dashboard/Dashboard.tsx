"use client"

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

interface Chat {
	profileImageUrl: string;
	name: string;
	username: string;
	lastMessage: string;
}

interface User {
  id: string;
	name: string;
	username: string;
  profilePicture?: string;
}


export default function Dashboard() {
  const exampleChats: Chat[] = [];
  const exampleNotifications: Notification[] = [];
  const [matches, setMatches] = useState<User[]>([]);

  useEffect(() => {
    async function getMatches() {
      try{
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
        const matchesResponse = await fetch(`${baseUrl}/api/users/${session?.user.id}/matches`);
        const matches = await matchesResponse.json();

        setMatches(matches);

      } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
      }
    }

    getMatches();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const router = useRouter();

  // Refreshes page when session changes (i.e. user logs in)
  useEffect(() => {
    if (status === 'authenticated') {
      router.refresh();
    }
  }, [status, router]);

  if (status === 'loading') {
    return (<DashboardLoading />);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-3">
        <ChatList chats={exampleChats}/>
        <Accountabuddies accountabuddies={matches} />
        <NotificationCenter notifications={exampleNotifications}/>
      </div>
    </>
  )
}