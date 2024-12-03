"use client"

import ChatList from './ChatList';
import DashboardMatchmaking from './Matchmaking';
import NotificationCenter from './NotificationCenter';

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

interface Notification {
  id: number;
  message: string;
}

export default function Dashboard() {
  const exampleChats: Chat[] = [];
  const exampleNotifications: Notification[] = [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-3">
        <ChatList chats={exampleChats}/>
        <DashboardMatchmaking />
        <NotificationCenter notifications={exampleNotifications}/>
      </div>
    </>
  )
}