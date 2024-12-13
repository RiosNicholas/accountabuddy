import MatchmakingCard from "@/components/MatchmakingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { StringValidation } from "zod";
import { Session } from "next-auth";

interface Profile {
  user_id: string;
  name: string;
  growthAreas: string[];
  accountabilityAreas: string[];
  meetingFrequency: string;
  meetingLocation: string;
}

interface DashboardMatchmakingProps {
  profiles: Profile[];
  setProfiles: Function;
  isLoading: boolean;
  numProfiles: number;
  setNumProfiles: Function;
  session: Session;
}

export default function DashboardMatchmaking({ profiles, setProfiles, isLoading, numProfiles, setNumProfiles, session }: DashboardMatchmakingProps) {
	const [compactView, setCompactView] = useState<boolean>(false);
  const [isDecisionMade, setIsDecisionMade] = useState(false);

  const toggleCompactView = () => {
		setCompactView((prevState) => !prevState);
	}

  useEffect(() => {
    if (isDecisionMade) {
      setNumProfiles(profiles.length-1);
      setProfiles(profiles.slice(1));
      setIsDecisionMade(false);
    }
  }, [isDecisionMade, profiles])
  
  return (
    <Card>
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-extrabold p-3">Find Accountabuddies</CardTitle>
        <Button variant="link" className="text-accent" onClick={toggleCompactView}>
          {compactView ? "Compact View" : "Detailed View"}
        </Button>
      </div>
      { !isLoading && numProfiles > 0 &&
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <MatchmakingCard
            name={profiles[0].name}
            accountabilityAreas={profiles[0].accountabilityAreas}
            goalBuckets={profiles[0].growthAreas}
            meetingPreference={profiles[0].meetingFrequency}
            methodPreference={profiles[0].meetingLocation}
            cardUserId={profiles[0].user_id}
            loggedUserId={session.user.id}
            setIsDecisionMade={setIsDecisionMade}
            compact={compactView}
          />
        </div>
      </CardContent>}
      {!isLoading && numProfiles == 0 && // In case the user has gone through every profile
      <div>Check back later for more profiles!</div>}
      {isLoading && <div>Loading...</div>}
    </Card>
  )
}