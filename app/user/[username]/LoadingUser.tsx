import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileCardSkeleton() {
  return (
    <Card className="bg-background text-background-foreground border-muted border2 p-6 m-2 w-full lg:w-3/4 xl:w-2/3 max-w-screen-xl">
      <div className="flex flex-col justify-center items-start mt-6 mx-6 mb-3">
        <Skeleton className="h-20 w-20 rounded-full mb-3" />
        <div className="flex flex-col justify-center text-left">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <CardContent>
        <div className="mb-4">
          <Skeleton className="h-5 w-24 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="mb-4">
          <Skeleton className="h-5 w-36 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-1" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </CardContent>
      <CardContent>
        <Skeleton className="h-5 w-40 mb-3" />
        <Skeleton className="h-8 w-full rounded" />
      </CardContent>
      <CardContent>
        <Skeleton className="h-5 w-40 mb-3" />
        <Skeleton className="h-8 w-full rounded" />
      </CardContent>
      <CardContent>
        <Skeleton className="h-5 w-40 mb-3" />
        <Skeleton className="h-8 w-full rounded" />
      </CardContent>
      <CardContent>
        <Skeleton className="h-5 w-40 mb-3" />
        <Skeleton className="h-8 w-full rounded" />
      </CardContent>
    </Card>
  );
}
