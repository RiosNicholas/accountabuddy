import { Skeleton } from "@/components/ui/skeleton";

export default function UserSettingsLoading() {
  return (
    <div className="flex flex-col justify-start items-start w-full md:w-3/4 lg:w-3/5 xl:w-2/5 mx-auto">
      <h1 className="text-left text-xl font-bold w-4/5">
        Edit Profile
      </h1>
      <div className="flex justify-center w-full mb-6">
        <Skeleton className="w-20 h-20 rounded-full" />
      </div>

      <div className="w-full space-y-4 my-6">
        <Skeleton className="h-6 w-1/4 mb-2" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>

      <div className="w-full space-y-4 my-6">
        <Skeleton className="h-6 w-1/4 mb-2" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}
