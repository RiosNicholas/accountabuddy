import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, } from "@/components/ui/card"
import Image from "next/image";

type User = {
  id: string;
  name: string;
  username: string;
  profilePicture?: string;
};

export default function DashboardMatchmaking() {
  const [accountabuddies, setAccountabuddies] = useState<User[]>([]);

  return (
    <Card>
      <CardTitle className="text-xl font-extrabold p-3">Accountabuddies</CardTitle>
      <CardContent>
        <Button className="w-full font-bold mb-2">Find Accountabuddies</Button>
          <ul className="grid grid-cols-1 gap-4">
            {accountabuddies.length === 0 ? (
            <li className="flex justify-center font-light items-center p-3 text-sm text-muted-foreground">
              No accountabuddies yet.
            </li>
          ) : (
            accountabuddies.map(user => (
              <li key={user.id} className="flex items-center space-x-4 my-2 py-1 px-2 bg-secondary">
                <Image src={user.profilePicture} alt={`${user.name}'s profile`} className="w-12 h-12 rounded-full" />
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