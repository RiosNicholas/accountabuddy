import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function DashboardLoading() {
  return (
    <Card className="m-3">
      <CardTitle className="text-xl font-extrabold p-3">Accountabuddies</CardTitle>
      <CardContent>
        <Button className="w-full font-bold mb-2" disabled>
          <Skeleton className="h-8 w-full" />
        </Button>
        <ul className="grid grid-cols-1 gap-4">
          {/* Placeholder for accountabuddies list */}
          {[...Array(1)].map((_, idx) => (
            <li
              key={idx}
              className="flex items-center space-x-4 my-2 p-2 bg-secondary rounded-md"
            >
              {/* Skeleton avatar */}
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                {/* Skeleton name */}
                <Skeleton className="h-4 w-2/3" />
                {/* Skeleton username */}
                <Skeleton className="h-3 w-1/2" />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
