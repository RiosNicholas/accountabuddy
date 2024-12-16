import { Skeleton } from "@/components/ui/skeleton";

export default function DiscoverSkeleton() {
  return (
    <div id="MatchMakingPage" className="flex flex-col justify-center items-center p-4">
      <div id="MatchMakingBody" className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Skeleton Card 1 */}
        <div className="bg-muted text-background-foreground p-6 rounded-md">
          <Skeleton className="h-10 w-3/4 mb-4" /> 
          <Skeleton className="h-6 w-1/2 mb-3" /> 
          <Skeleton className="h-6 w-2/3 mb-4" /> 
          <Skeleton className="h-14 w-full" /> 
        </div> 
        
        {/* Skeleton Card 2 */}
        <div className="bg-muted text-background-foreground p-6 rounded-md">
          <Skeleton className="h-10 w-3/4 mb-4" /> 
          <Skeleton className="h-6 w-1/2 mb-3" /> 
          <Skeleton className="h-6 w-2/3 mb-4" /> 
          <Skeleton className="h-14 w-full" /> 
        </div>
      </div>
    </div>
  );
}
