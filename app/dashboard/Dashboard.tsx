"use client"

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DashboardLoading from './DashboardLoading';
import Accountabuddies from './Accountabuddies';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const [needMatches, setNeedMatches] = useState(true);
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
    <div className="grid grid-cols-1 m-3 h-full">
      <Accountabuddies />
    </div>
  )
}