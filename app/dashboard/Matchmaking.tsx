import MatchmakingCard, { MeetingPreference, MethodPreference } from "@/components/MatchmakingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, } from "@/components/ui/card"
import { useState } from "react";

export default function DashboardMatchmaking() {
	const [compactView, setCompactView] = useState<boolean>(false);

  const toggleCompactView = () => {
		setCompactView((prevState) => !prevState);
	}
  
  return (
    <Card>
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-extrabold p-3">Find Accountabuddies</CardTitle>
        <Button variant="link" className="text-accent" onClick={toggleCompactView}>
          {compactView ? "Compact View" : "Detailed View"}
        </Button>
      </div>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <MatchmakingCard
            name="John Doe"
            age={22}
            university="Rutgers University"
            intro="I'm passionate about self-growth and looking for a partner to hold me accountable."
            accountabilityAreas={['Setting and Reaching Goals', 'Managing Time Effectively']}
            goalBuckets={['Education', 'Career']}
            meetingPreference={MeetingPreference.Weekly}
            methodPreference={MethodPreference.InPerson}
            compact={compactView}
          />
          
          <MatchmakingCard
            name="Jane Smith"
            age={24}
            university="Rutgers University"
            intro="Excited to find someone who can help me stay consistent with my fitness goals."
            accountabilityAreas={['Focusing on Wellness', 'Habit Building']}
            goalBuckets={['Health & Fitness', 'Self Development']}
            meetingPreference={MeetingPreference.Daily}
            methodPreference={MethodPreference.Virtual}
            compact={compactView}
          />
        </div>
      </CardContent>
    </Card>
  )
}