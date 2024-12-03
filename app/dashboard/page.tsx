import Dashboard from './Dashboard';
import LoginReminder from '@/components/LoginReminder';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';


// interface Matches {
// 	profileImageUrl: string;
// 	name: string;
// 	username: string;
// }

// interface Notifications {
// TODO 
// }

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
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