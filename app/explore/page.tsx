import MatchmakingCard from "@/components/MatchmakingCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"

interface Chat {
	profileImageUrl: string;
	name: string;
	username: string;
	lastMessage: string;
}

interface Matches {
	profileImageUrl: string;
	name: string;
	username: string;
}

interface Notifications {
}

export default function Explore() {
	const exampleChats: Chat[] = [
		{
			profileImageUrl: "https://via.placeholder.com/150",
			name: "Alice Johnson",
			username: "@alice_j",
			lastMessage: "Hey, did you finish the draft for the project report?",
		},
		{
			profileImageUrl: "https://via.placeholder.com/150",
			name: "Bob Smith",
			username: "@bob_smith",
			lastMessage: "We need to review our goals for this week. Are you free later?",
		},
		{
			profileImageUrl: "https://via.placeholder.com/150",
			name: "Charlie Davis",
			username: "@charlie_d",
			lastMessage: "Remember to submit your thesis outline by Friday!",
		},
		{
			profileImageUrl: "https://via.placeholder.com/150",
			name: "Diana Miller",
			username: "@diana_miller",
			lastMessage: "Let's schedule our study session for tomorrow afternoon.",
		},
		{
			profileImageUrl: "https://via.placeholder.com/150",
			name: "Ethan Brown",
			username: "@ethan_brown",
			lastMessage: "Great job staying on track with your assignments this week!",
		},
		{
			profileImageUrl: "https://via.placeholder.com/150",
			name: "Fiona Wilson",
			username: "@fiona_wilson",
			lastMessage: "I just updated my progress on the shared document. Check it out!",
		},
		{
			profileImageUrl: "https://via.placeholder.com/150",
			name: "George Clark",
			username: "@george_clark",
			lastMessage: "Don't forget, we have a group accountability check-in on Monday.",
		}
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-3">
			<Card>
				<CardTitle className="text-xl font-bold p-3">Chats</CardTitle>
				<CardContent className="p-0"> 
					<div className="grid grid-cols-1 w-full">
						{exampleChats.map((chat, index) => (
							<div 
								key={index} 
								className="flex justify-start items-center p-3 hover:bg-muted hover:cursor-pointer transition border-b border-muted gap-3 w-full last:border-none"
							>
								<Avatar>
									<AvatarImage src={chat.profileImageUrl} alt={chat.username}/>
									<AvatarFallback>{chat.name}</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="font-semibold">{chat.name}</h3>
									<p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardTitle className="text-xl font-bold p-3">Find Accountabuddies</CardTitle>
				<CardContent>
					<div className="grid">
						<MatchmakingCard
							name="John Doe"
							age={22}
							university="Rutgers University"
							intro="I'm passionate about self-growth and looking for a partner to hold me accountable."
							accountability="Seek accountability for time management"
							growth="I want to grow in leadership skills"
							compact={true} 
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardTitle className="text-xl font-bold p-3">Notification Center</CardTitle>
				<CardContent>
					<div className="grid">
						test.
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
