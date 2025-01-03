import Dashboard from './Dashboard';
import LoginReminder from '@/components/LoginReminder';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';

// interface Profile {
//   userId: string;
//   name: string;
//   growthAreas: string[];
//   accountabilityAreas: string[];
//   meetingFrequency: string;
//   meetingLocation: string;
// }

// interface getProfilesProps {
//   profiles: Profile[];
//   setProfiles: Function;
//   page: number;
//   setPage: Function;
// }

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session ? (
        <Dashboard />
      ) : (
        <LoginReminder />
      )}
    </>
  )
}