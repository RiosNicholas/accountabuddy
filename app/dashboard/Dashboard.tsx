"use client"

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

import DashboardLoading from './DashboardLoading';
import ChatList from './ChatList';
import Accountabuddies from './Accountabuddies';
import NotificationCenter from './NotificationCenter';
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const [needMatches, setNeedMatches] = useState(true);
  const router = useRouter();

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

    if (needMatches && status =="authenticated") {
      getMatches();
      setNeedMatches(false);
    }
  }, []);

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
    <div className="grid grid-cols-1 m-3">
      <Accountabuddies />
    </div>
  )
}