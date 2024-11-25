import { Card, CardContent, CardTitle, } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Chat {
  profileImageUrl: string;
  username: string;
  name: string;
  lastMessage: string;
}

interface DashboardChatsProps {
  chats: Chat[];
}

export default function ChatList ({ chats }: DashboardChatsProps) {
  
  return (
    <Card>
      <CardTitle className="text-xl font-extrabold p-3">Chats</CardTitle>
      <CardContent className="p-0"> 
        <div className="grid grid-cols-1 w-full">
          {chats.length > 0 ? (
            chats.map((chat, index) => (
              <div 
                key={index} 
                className="flex justify-start items-center p-3 hover:bg-muted hover:cursor-pointer transition border-b border-muted gap-3 w-full last:border-none"
              >
                <Avatar>
                  <AvatarImage src={chat.profileImageUrl} alt={chat.username}/>
                  <AvatarFallback>{chat.name}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-secondary-foreground">{chat.name}</h3>
                  <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center font-light items-center px-3 py-6 text-muted-foreground">
              No chats to show.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}