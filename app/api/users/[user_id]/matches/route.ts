import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// GET method to retrieve university_name by user_id
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

    // Query for university_name by user_id
    const { data, error } = await supabase
    .from('Matches')
    .select(`
      user1,
      user2,
      Users:user1 (user_id, name, username),
      MatchedUsers:user2 (user_id, name, username)
    `)
    .or(`user1.eq.${user_id},user2.eq.${user_id}`);

    if (error) {
      console.error("Error fetching university_name:", error);
      return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Matches not found" }, { status: 404 });
    }

    const matchedUsers = data.map(match => {
      // If user1 is the current user, return user2's details
      if (match.user1 === user_id) {
        return {
          user_id: match.MatchedUsers.user_id,
          name: match.MatchedUsers.name,
          username: match.MatchedUsers.username,
        };
      }
      // If user2 is the current user, return user1's details
      return {
        user_id: match.Users.user_id,
        name: match.Users.name,
        username: match.Users.username,
      };
    });



    return NextResponse.json(matchedUser, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT method to upsert university_name by user_id
export async function PUT(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  try {

    // Validate UUID format
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(user_id);
    if (!isValidUUID) {
      return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
    }

    const body = await request.json();
    const { user2 } = body;

    const supabase = createRouteHandlerClient({ cookies });

    // Perform upsert operation
    const { error } = await supabase
      .from("Matches")
      .insert(
        { user1: user_id, user2 }
      );

    if (error) {
      console.error("Error inserting match:", error);
      return NextResponse.json({ error: "Failed to insert match" }, { status: 500 });
    }

    return NextResponse.json({ message: "Match inserted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
