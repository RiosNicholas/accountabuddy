"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardLoading from "./DashboardLoading";

type User = {
  username: string;
  name: string;
};

export default function Accountabuddies() {
  const { data: session, status } = useSession();
  const [accountabuddies, setAccountabuddies] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountabuddies = async () => {
      if (!session?.user?.id) return;

      setLoading(true); // Start loading
      try {
        const response = await fetch(`/api/users/${session.user.id}/accountabuddies`);

        if (response.status === 404) {
          console.log("No matches found.");
          setAccountabuddies([]);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch accountabuddies");
        }

        const data: { Users: { username: string; name: string } }[] = await response.json();
        console.log("Fetched accountabuddies:", data);

        const profiles = data.map((match) => ({
          username: match.Users.username,
          name: match.Users.name,
        }));

        setAccountabuddies(profiles);
      } catch (err) {
        console.error("Error fetching accountabuddies:", err);
        setError("Unable to load accountabuddies. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (status === "authenticated") {
      fetchAccountabuddies();
    }
  }, [session?.user?.id, status]);

  if (loading) {
    return (<DashboardLoading/>);
  }

  return (
    <Card>
      <CardTitle className="text-xl font-extrabold p-3">Accountabuddies</CardTitle>
      <CardContent>
        <Link href="/discover">
          <Button className="w-full font-bold mb-2">Find Accountabuddies</Button>
        </Link>

        {error ? (
          <p className="text-center text-sm text-red-500">{error}</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4">
            {accountabuddies.length === 0 ? (
              <li className="flex justify-center font-light items-center p-3 text-sm text-muted-foreground">
                No accountabuddies yet.
              </li>
            ) : (
              accountabuddies.map((user, index) => (
                <Link key={index} href={`/user/${user.username}`}>
                  <li
                    key={index}
                    className="flex items-center space-x-4 my-2 py-1 px-2 bg-secondary rounded-md"
                  >
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png" // Placeholder for profile picture
                        alt={user.username || "User"}
                      />
                      <AvatarFallback>
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="capitalize font-semibold">{user.name}</div>
                      <div className="text-sm font-light lowercase text-muted-foreground">
                        @{user.username}
                      </div>
                    </div>
                  </li>
                </Link>
              ))
            )}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
