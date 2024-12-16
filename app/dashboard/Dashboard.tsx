"use client"

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import DashboardLoading from './DashboardLoading';
import Accountabuddies from './Accountabuddies';

export default function Dashboard() {
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
    <div className="grid grid-cols-1 m-3 h-full">
      <Accountabuddies />
    </div>
  )
}