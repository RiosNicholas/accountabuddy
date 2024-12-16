// import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, } from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  username: string;
  profilePicture?: string;
};

export default function Accountabuddies() {
  // TODO: Fetch accountabuddies from the API
  // const [accountabuddies, setAccountabuddies] = useState<User[]>([]);
  const accountabuddies: User[] = [];

  return (
    <Card>
      <CardTitle className="text-xl font-extrabold p-3">Accountabuddies</CardTitle>
      <CardContent>
        <Link href="/discover">
          <Button className="w-full font-bold mb-2">
            Find Accountabuddies
          </Button>
        </Link>
          <ul className="grid grid-cols-1 gap-4">
            {accountabuddies.length === 0 ? (
            <li className="flex justify-center font-light items-center p-3 text-sm text-muted-foreground">
              No accountabuddies yet.
            </li>
          ) : (
            accountabuddies.map(user => (
              <li key={user.id} className="flex items-center space-x-4 my-2 py-1 px-2 bg-secondary">
                <Image src="https://github.com/shadcn.png" alt={`${user.name}'s profile`} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="capitalize">{user.name}</div>
                  <div className="text-sm font-light lowercase">@{user.username}</div>
                </div>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  )
};