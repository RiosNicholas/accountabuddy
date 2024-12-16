import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Cross1Icon, HandIcon } from "@radix-ui/react-icons";
import { Badge } from "./ui/badge";
import store from "@/redux/store";

interface MatchmakingCardProps {
  name: string;
  // age: number;
  // university: string;
  // intro: string;
  accountabilityAreas: string[]; 
  goalBuckets: string[]; 
  meetingPreference: string;
  methodPreference: string;
  cardUserId: string;
  loggedUserId: string;
  setIsDecisionMade: Function;
  compact?: boolean;
  onClick?: () => void;
}

export default function MatchmakingCard({ name, university, biography, accountabilityAreas, growthAreas, meetingPreference, methodPreference, compact = false, }: MatchmakingCardProps) {
  return (
    <Card className="bg-muted text-background-foreground hover:cursor-pointer">
      <div className={`grid gap-4 lg:gap-1 ${compact ? 'lg:grid-cols-[1fr,1fr]' : 'grid-cols-1'} p-${compact ? '2' : '6'}`}>
        {/* PERSONAL INFO */}
        <div className="flex justify-center items-center">
          <Avatar 
            className={`${compact ? 'h-12 w-12 mr-4 lg:mr-2' : 'h-16 w-16 mr-4'} ${compact ? 'hidden lg:block' : ''} flex-none`}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@username" />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center text-left">
            <CardTitle className={`${compact ? 'lg:text-lg' : ''} font-bold`}>
              {name}
            </CardTitle>
            <CardHeader className={`${compact ? 'text-sm' : ''} p-0 font-semibold`}>
              {university}
            </CardHeader>
          </div>
        </div>
         

        {/* PREFERENCES */}
        <CardContent className={`flex flex-col justify-center items-center p-2 lg:p-0 lg:text-sm text-center`}>
          {/*!compact && (
            <p className="text-center text-sm font-medium w-full text-secondary-foreground">{intro}</p>
          )*/}
          <div className={`${compact ? " lg:flex-col" : "lg:flex w-full "}justify-center items-center gap-1`}>
            <div className={`flex flex-col w-full ${compact ? "mt-0" : "mt-2"} gap-1`}>
              <h4 className={`text-muted-foreground font-semibold ${compact ? "text-right text-sm md:text-base" : "text-left"}`}>Meeting Preference</h4>
              <p className={`bg-secondary text-secondary-foreground w-full ${compact ? "text-xs" : "text-sm"} font-normal rounded p-1`}>
                {meetingPreference}
              </p>
            </div>
            <div className={`flex flex-col w-full ${compact ? "mt-0" : "mt-2"} gap-1`}>
              <h4 className={`text-muted-foreground font-semibold ${compact ? "text-right text-sm md:text-base" : "text-left"}`}>Method Preference</h4>
              <p className={`bg-secondary text-secondary-foreground w-full ${compact ? "text-xs" : "text-sm"} font-normal rounded p-1`}>
                {methodPreference}
              </p>
            </div>
          </div>
        </CardContent>

        {/* GOALS AND ACCOUNTABILITY */}
        <CardContent className={`flex flex-col justify-center items-center p-2 lg:p-0 lg:text-sm ${compact ? "lg: col-span-2" : "col-span-1"} gap-1`}>
          <div className={`flex flex-col w-full ${compact ? "mt-0" : "mt-2"} gap-1`}>
            <h4 className="text-muted-foreground text-left font-semibold">Accountability Areas</h4>
            <div className="flex flex-wrap gap-3">
              {accountabilityAreas.map((area, index) => (
                <Badge key={index} className={`bg-primary text-primary-foreground ${compact ? "text-xs" : "text-sm"} font-normal`}>
                  {area}
                </Badge>
              ))}
            </div>
          </div>
          <div className={`flex flex-col w-full ${compact ? "mt-0" : "mt-2"} gap-1`}>
            <h4 className="text-muted-foreground text-left font-semibold">Goal Buckets</h4>
            <div className="flex flex-wrap gap-3">
              {growthAreas.map((area, index) => (
                <Badge key={index} className={`bg-primary text-primary-foreground ${compact ? "text-xs" : "text-sm"} font-normal`}>
                  {area}
                </Badge>
              ))}
            </div>
          </div> 
        </CardContent>
      </div>

      {/* PROFILE ACTIONS */}
      <div id="profile-actions" className={`flex justify-around ${compact ? 'px-1 pt-1 pb-2' : 'p-3'}`}>
        <Button onClick={onDislike} variant="destructive" id="reject-button" className={`bg-white border-none rounded-full ${compact ? 'w-10 h-10 text-xl' : 'w-12 h-12 text-2xl'} cursor-pointer shadow-md hover:shadow-lg text-red-500 hover:text-white`}>
          <Cross1Icon/> 
        </Button>
        <Button onClick={onLike} variant="default" id="connect-button" className={`bg-white border-none rounded-full ${compact ? 'w-10 h-10 text-xl' : 'w-12 h-12 text-2xl'} cursor-pointer shadow-md hover:shadow-lg text-green-500 hover:text-white`}>
          <HandIcon/> 
        </Button>
      </div>
    </Card>
  );
}
