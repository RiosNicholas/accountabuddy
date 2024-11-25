import Dashboard from './Dashboard';
import LoginReminder from '@/components/LoginReminder';
import { getServerSession } from 'next-auth';


// interface Matches {
// 	profileImageUrl: string;
// 	name: string;
// 	username: string;
// }

// interface Notifications {
// TODO 
// }

export default async function DashboardPage() {
  const session = await getServerSession();
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