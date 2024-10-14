import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Cross1Icon, HandIcon } from "@radix-ui/react-icons";

export enum MethodPreference {
  InPerson = "In-Person",
  Virtual = "Virtual",
  NoPreference = "No Preference",
}

export enum MeetingPreference {
  Daily = "Daily",
  Weekly = "Weekly",
  BiWeekly = "Bi-Weekly",
  Monthly = "Monthly",
}

interface MatchmakingCardProps {
  name: string;
  age: number;
  university: string;
  intro: string;
  accountabilityAreas: string[]; 
  goalBuckets: string[]; 
  meetingPreference: MeetingPreference;
  methodPreference: MethodPreference;
  compact?: boolean;
}
 
const accountabilityAreas = [
  'Habit Building',
  'Setting and Reaching Goals',
  'Managing Time Effectively',
  'Boosting Productivity',
  'Focusing on Wellness',
  'Developing Skills',
  'Building Relationships',
  'Planning Finances',
  'Advancing Your Career',
];

const goalBuckets = [
  'Education',
  'Health & Fitness',
  'Finance',
  'Career',
  'Self Development',
  'Social',
];

export default function MatchmakingCard({
  name,
  age,
  university,
  intro,
  accountabilityAreas,
  goalBuckets,
  meetingPreference,
  methodPreference,
  compact = false,
}: MatchmakingCardProps) {
  return (

    <Card className="bg-muted text-background-foreground">
      <div className={`grid gap-4 lg:gap-1 ${compact ? 'lg:grid-cols-[4fr,7fr]' : 'grid-cols-1'} p-${compact ? '2' : '6'}`}>
        <div className="flex justify-center items-center">
          {!compact ?? (
            <Avatar className={`h-${compact ? '12' : '20'} w-${compact ? '12' : '20'} mr-4 ${compact ? "lg:mr-2" : ""}`}>
              <AvatarImage src="../../public/profile-picture.jpg"/>
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          )}
          <div className="flex flex-col justify-center text-left">
            <CardTitle className={`${compact ? "lg:text-lg" : ""}`}>
              {name}
              {!compact && `, ${age}`}
            </CardTitle>
           <CardHeader className={`${compact ? "lg:text-sm" : ""} p-0 font-medium`}>{university}</CardHeader>
          </div>
        </div>

        <CardContent className={`flex flex-col justify-center items-center p-2 lg:p-0 lg:text-sm`}>
          {!compact && (
            <p className="text-center text-sm w-full text-muted-foreground">{intro}</p>
          )}
          <div className={`flex flex-col w-full ${compact ? "mt-0" : "mt-2"} gap-1`}>
            <h4 className="text-left font-semibold">Meeting Preference</h4>
            <p className={`bg-secondary text-secondary-foreground rounded p-1 w-full ${compact ? "text-xs" : "text-sm"}`}>
              {meetingPreference}
            </p>
          </div>
          <div className={`flex flex-col w-full ${compact ? "mt-0" : "mt-2"} gap-1`}>
            <h4 className="text-left font-semibold">Method Preference</h4>
            <p className={`bg-secondary text-secondary-foreground rounded p-1 w-full ${compact ? "text-xs" : "text-sm"}`}>
              {methodPreference}
            </p>
          </div>
        </CardContent>
        <CardContent className={`flex flex-col justify-center items-center p-2 lg:p-0 lg:text-sm ${compact ? "lg: col-span-2" : "col-span-1"}`}>
          <div className={`flex flex-col w-full ${compact ? "mt-0" : "mt-2"} gap-1`}>
            <h4 className="text-left font-semibold">Accountability Areas</h4>
            <div className="flex flex-wrap gap-3">
              {accountabilityAreas.map((area, index) => (
                <p key={index} className={`bg-primary text-primary-foreground rounded p-1 ${compact ? "text-xs" : "text-sm"}`}>
                  {area}
                </p>
              ))}
            </div>
          </div>
          <div className={`flex flex-col w-full ${compact ? "mt-0" : "mt-2"} gap-1`}>
            <h4 className="text-left font-semibold">Goal Buckets</h4>
            <div className="flex flex-wrap gap-3">
              {goalBuckets.map((area, index) => (
                <p key={index} className={`bg-primary text-primary-foreground rounded p-1 ${compact ? "text-xs" : "text-sm"}`}>
                  {area}
                </p>    
              ))}
            </div>
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
