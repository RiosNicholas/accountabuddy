import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// GET method to retrieve matched users by user_id
export async function GET(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  try {
    if (!user_id) {
      console.error("Error: User ID is required");
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Validate UUID format
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(user_id);
    if (!isValidUUID) {
      console.error("Error: Invalid User ID format");
      return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Query for matches where user1 equals user_id
    const { data, error } = await supabase
      .from("Matches")
      .select(`
        user2,
        Users:user2 (username, name)
      `)
      .eq("user1", user_id); 

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.log("No matches found for user_id:", user_id);
      return NextResponse.json({ error: "No accountabuddies" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
