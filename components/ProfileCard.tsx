import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  username: string;
}

export default function ProfileCard({ username }: ProfileCardProps) {
  return (
    <Card className="bg-background text-background-foreground border-muted border2 p-6 m-2 w-full lg:w-3/4 xl:w-2/3 max-w-screen-xl">
      <div className="flex flex-col justify-center items-start mt-6 mx-6 mb-3">
        <Avatar className="h-20 w-20">
          <AvatarImage src="profile-picture.jpg" alt={`@username`} />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center text-left">
          <CardTitle className="text-xl font-bold">@{username}</CardTitle>
          <CardHeader className="text-base p-0 font-semibold">
            name | university
          </CardHeader>
        </div>
      </div>
      <CardContent>
        <div className="mb-1">
          <h4 className="text-muted-foreground font-medium text-base">About Me</h4>
          <p className="text-sm p-1">Bio goes here</p>
        </div>
        <div className="mb-1">
          <h4 className="text-muted-foreground font-medium text-base">Contact Information</h4>
          <ul className="text-xs p-1"> 
            {/* TODO: add symbols here */}
            <li>Email</li>
            <li>Instagram</li>
            <li>Discord</li>
          </ul>
        </div>
      </CardContent>
      <CardContent>
        <h4 className="text-muted-foreground font-semibold mb-2">Method Preference</h4>
        <div className="rounded bg-muted text-muted-foreground p-3"> 
          methodPreference
        </div>
      </CardContent>  
      <CardContent>
        <h4 className="text-muted-foreground font-semibold mb-2">Method Preference</h4>
        <div className="rounded bg-muted text-muted-foreground p-3"> 
          methodPreference
        </div>
      </CardContent>
      <CardContent>
        <h4 className="text-accent font-semibold mb-2">Accountability Areas</h4>
        <div className="rounded bg-accent text-accent-foreground p-3"> 
          accountabilityAreas
        </div>
      </CardContent>       
      <CardContent>
        <h4 className="text-accent font-semibold mb-2">Growth Areas</h4>
        <div className="rounded bg-accent text-accent-foreground p-3"> 
          growthAreas
        </div>
      </CardContent>
    </Card>
  );
}