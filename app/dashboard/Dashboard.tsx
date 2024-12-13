"use client"
import { useEffect, useState } from 'react';

import ChatList from './ChatList';
import DashboardMatchmaking from './Matchmaking';
import NotificationCenter from './NotificationCenter';
import { Session } from 'next-auth';
import store from '@/redux/store';

interface Chat {
	profileImageUrl: string;
	name: string;
	username: string;
	lastMessage: string;
}

// interface Matches {
// 	profileImageUrl: string;
// 	name: string;
// 	username: string;
// }

interface Profile {
  userId: string;
  name: string;
  growthAreas: string[];
  accountabilityAreas: string[];
  meetingFrequency: string;
  meetingLocation: string;
}

interface Notification {
  id: number;
  message: string;
}

interface DashboardProps {
  session: Session;
}

export default function Dashboard({ session }: DashboardProps ) {
  const exampleChats: Chat[] = [];
  const exampleNotifications: Notification[] = [];
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [numProfiles, setNumProfiles] = useState(0);
  const [isRemainingProfile, setIsRemainingProfile] = useState(true);

  async function getProfiles() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users?currentUserId=${session.user.id}&page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching user profiles: ${response.statusText}`);
      }

      const result = await response.json();
      setProfiles([...profiles, ...result.data]);
      if (result.data.length == 0) {
        setIsRemainingProfile(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setNumProfiles(profiles.length);
      setPage(page+1);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // if there are remaining profiles still
    if (numProfiles <= 3 && isRemainingProfile) {
      getProfiles()
    }
  }, [numProfiles, isRemainingProfile]);

  if (numProfiles <= 3 && isRemainingProfile) {
    getProfiles()
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-3">
        <ChatList chats={exampleChats}/>
        <DashboardMatchmaking profiles={profiles} setProfiles={setProfiles} isLoading={isLoading} numProfiles={numProfiles} setNumProfiles={setNumProfiles} session={session} />
        <NotificationCenter notifications={exampleNotifications}/>
      </div>
    </>
  )
}