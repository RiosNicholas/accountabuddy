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
      .from("UserUniversities")
      .select("university_name")
      .eq("user_id", user_id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching university_name:", error);
      return NextResponse.json({ error: "Failed to fetch university name" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT method to upsert university_name by user_id
export async function PUT(request: Request, { params }: { params: { user_id: string } }) {
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

    const body = await request.json();
    const { university_name } = body;

    // Validate university_name
    if (!university_name || typeof university_name !== "string" || university_name.trim().length === 0) {
      return NextResponse.json({ error: "Invalid university name" }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Perform upsert operation
    const { error } = await supabase
      .from("UserUniversities")
      .upsert(
        { user_id, university_name },
        { onConflict: "user_id" } // Ensure we only upsert by user_id
      );

    if (error) {
      console.error("Error upserting university_name:", error);
      return NextResponse.json({ error: "Failed to upsert university name" }, { status: 500 });
    }

    return NextResponse.json({ message: "University name updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
