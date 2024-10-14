import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";

interface MatchmakingCardProps {
  name: string;
  age: number;
  university: string;
  intro: string;
  accountability: string;  
  growth: string;          
  compact?: boolean;
}

export default function MatchmakingCard({
  name,
  age,
  university,
  intro,
  accountability,
  growth,
  compact = false,
}: MatchmakingCardProps) {
  return (
    <Card className="bg-secondary text-secondary-foreground">
      <div className={`flex p-${compact ? 2 : 6} gap-4 justify-${compact ? 'start' : 'center'}`}>
        <Avatar className={`h-${compact ? '12' : '20'} w-${compact ? '12' : '20'}`}>
          <AvatarImage src="../../public/profile-picture.jpg" />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center text-left">
          <CardTitle>{name}, {age}</CardTitle>
          <CardHeader className="p-0 font-medium">{university}</CardHeader>
        </div>
      </div>
      <CardContent className={`p-${compact ? 2 : 6}`}>
        {!compact && (
          <p className="text-center text-sm">{intro}</p>
        )}
        <div className="bg-primary text-primary-foreground mt-2 rounded p-1 ">
          {accountability}
        </div>
        <div className="bg-primary text-primary-foreground mt-2 rounded p-1">
          {growth}
        </div>
      </CardContent>
      <div id="profile-actions" className={`flex justify-around p-${compact ? "1" : "4"}`}>
        <Button variant="destructive" id="reject-button" className={`bg-white border-none rounded-full ${compact ? "w-10 h-10 text-xl" : "w-12 h-12 text-2xl"} cursor-pointer shadow-md hover:shadow-lg text-red-500 hover:text-white`}>
          ✖
        </Button>
        <Button variant="default" id="connect-button" className={`bg-white border-none rounded-full w-12 h-12 text-2xl cursor-pointer shadow-md hover:shadow-lg text-green-500 ${compact ? "w-10 h-10 text-xl" : "w-12 h-12 text-2xl"}`}>
          ✋ 
        </Button>
      </div>
    </Card>
  );
}
