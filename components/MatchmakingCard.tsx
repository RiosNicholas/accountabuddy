import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
      <div className={`flex p-6 gap-4`}>
        <Avatar className={`h-${compact ? '12' : '20'} w-${compact ? '12' : '20'}`}>
          <AvatarImage src="../../public/profile-picture.jpg" />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center text-left">
          <CardTitle>{name}, {age}</CardTitle>
          <CardHeader className="p-0 font-medium">{university}</CardHeader>
        </div>
      </div>
      {!compact && (
        <CardContent>
          <p className="text-center">{intro}</p>
          <div className="bg-primary text-primary-foreground mt-2 rounded p-1 ">
            {accountability}
          </div>
          <div className="bg-primary text-primary-foreground mt-2 rounded p-1">
            {accountability}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
