
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ProfileDiscovery from "./ProfileDiscovery";

export default function DiscoverPage() {
  return (
    <Card className="m-3 h-full">
      <CardTitle className="text-xl font-extrabold p-3">Matchmaking</CardTitle>
      <CardContent className="p-0"> 
        <ProfileDiscovery />
      </CardContent>
    </Card>
  )
}


