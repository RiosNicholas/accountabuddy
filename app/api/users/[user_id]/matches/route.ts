import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface User {
  user_id: string;
  name: string;
  username: string;
}

interface Match {
  user1: string;
  user2: string;
  Users: User[];           
  MatchedUsers: User[];    
}

// GET method to retrieve matched users by user_id
export async function GET(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  try {
    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Validate UUID format
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(user_id);
    if (!isValidUUID) {
      return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Query for matches involving the user_id
    const { data, error } = await supabase
      .from("Matches")
      .select(
        `
          user1,
          user2,
          Users:user1 (user_id, name, username),
          MatchedUsers:user2 (user_id, name, username)
        `
      )
      .or(`user1.eq.${user_id},user2.eq.${user_id}`);

    if (error) {
      console.error("Error fetching matches:", error);
      return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "No matches found" }, { status: 404 });
    }

    // Map the matched users by extracting the first user from arrays
    const matchedUsers = data
      .map((match: Match) => {
        if (match.user1 === user_id && match.MatchedUsers?.[0]) {
          return {
            user_id: match.MatchedUsers[0].user_id,
            name: match.MatchedUsers[0].name,
            username: match.MatchedUsers[0].username,
          };
        } else if (match.user2 === user_id && match.Users?.[0]) {
          return {
            user_id: match.Users[0].user_id,
            name: match.Users[0].name,
            username: match.Users[0].username,
          };
        }
        return null; // Handle unexpected structure
      })
      .filter(Boolean); // Remove null values

    return NextResponse.json(matchedUsers, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  try {
    // Validate UUID format
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(user_id);
    if (!isValidUUID) {
      return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
    }

    const body = await request.json();
    const { user2 } = body;

    if (!user2) {
      return NextResponse.json({ error: "user2 ID is required" }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Insert mutual matches: (user1 -> user2) and (user2 -> user1)
    const { error } = await supabase.from("Matches").insert([
      { user1: user_id, user2 }, // First match: user1 -> user2
      { user1: user2, user2: user_id } // Mutual match: user2 -> user1
    ]);

    if (error) {
      console.error("Error inserting mutual matches:", error);
      return NextResponse.json({ error: "Failed to insert mutual matches" }, { status: 500 });
    }

    return NextResponse.json({ message: "Mutual matches inserted successfully" }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

