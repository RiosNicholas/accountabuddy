import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Cross1Icon, HandIcon } from "@radix-ui/react-icons";

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

    <Card className="bg-muted text-background-foreground">
      <div className={`grid gap-4 lg:gap-1 ${compact ? 'lg:grid-cols-[4fr,7fr]' : 'grid-cols-1'} p-${compact ? '2' : '6'}`}>
        <div className="flex justify-center items-center">
          <Avatar className={`h-${compact ? '12' : '20'} w-${compact ? '12' : '20'} mr-4 ${compact ? "lg:mr-2" : ""}`}>
            <AvatarImage src="../../public/profile-picture.jpg"/>
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center text-left">
            <CardTitle className={`${compact ? "lg:text-base" : ""}`}>
              {name}
              {!compact && `, ${age}`}
            </CardTitle>
           <CardHeader className={`${compact ? "lg:text-xs" : ""} p-0 font-medium`}>{university}</CardHeader>
          </div>
        </div>

        <CardContent className={`flex flex-col justify-center items-center p-2 lg:p-0 lg:text-sm`}>
          {!compact && (
            <p className="text-center text-sm w-full text-muted-foreground">{intro}</p>
          )}
          <div className={`bg-primary text-primary-foreground ${compact ? "mt-0" : "mt-2"} rounded p-1 w-full`}>
            {accountability}
          </div>
          <div className="bg-primary text-primary-foreground mt-2 rounded p-1 w-full">
            {growth}
          </div>
        </CardContent>
      </div>

      <div id="profile-actions" className={`flex justify-around ${compact ? 'px-1 pt-1 pb-2' : 'p-3'}`}>
        <Button variant="destructive" id="reject-button" className={`bg-white border-none rounded-full ${compact ? 'w-10 h-10 text-xl' : 'w-12 h-12 text-2xl'} cursor-pointer shadow-md hover:shadow-lg text-red-500 hover:text-white`}>
          <Cross1Icon/> 
        </Button>
        <Button variant="default" id="connect-button" className={`bg-white border-none rounded-full ${compact ? 'w-10 h-10 text-xl' : 'w-12 h-12 text-2xl'} cursor-pointer shadow-md hover:shadow-lg text-green-500 hover:text-white`}>
          <HandIcon/> 
        </Button>
      </div>
    </Card>
  );
}
