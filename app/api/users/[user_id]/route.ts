import { NextResponse } from "next/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";

// Handle GET request
export async function GET(request: Request, props: { params: Promise<{ user_id: string }> }) {
  const params = await props.params;
  try {
    const user_id = params.user_id;

    if (!user_id) {
      return NextResponse.json(
        { message: "user_id is required" },
        { status: 400 }
      );
    }

    // Validating UUID format for user_id
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(user_id);
    if (!isValidUUID) {
      return NextResponse.json({ error: "Invalid UUID format" }, { status: 400 });
    }

    // Initializing Supabase client
    const supabase = createRouteHandlerClient({ cookies });

    // Fetch user by user_id
    const { data, error } = await supabase
      .from('Users')
      .select(`
        name,
        username,
        meeting_preference,
        meeting_frequency
      `)
      .eq('user_id', user_id)
      .single();

    if (error) {
      console.error('Error fetching user by user_id:', error);
      return NextResponse.json(
        { message: "Failed to fetch user" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });

  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    );
  }
}

// Handle PUT request
export async function PUT(request: Request, props: { params: Promise<{ user_id: string }> }) {
  const params = await props.params;

  try {
    const user_id = params.user_id;

    if (!user_id) {
      return NextResponse.json(
        { message: "user_id is required" },
        { status: 400 }
      );
    }

    // Validate UUID format for user_id
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(user_id);
    if (!isValidUUID) {
      return NextResponse.json({ error: "Invalid UUID format" }, { status: 400 });
    }

    const body = await request.json();
    const { name } = body;

    // Validate name
    if (name && (typeof name !== "string" || name.trim().length === 0 || name.length > 100)) {
      return NextResponse.json(
        { error: "Invalid name. Must be a non-empty string and less than 100 characters." },
        { status: 400 }
      );
    }

    // Initializing Supabase client
    const supabase = createRouteHandlerClient({ cookies });

    // Update only the name while keeping other fields intact
    const { error: updateError } = await supabase
      .from("Users")
      .update({ name }) // Only update the `name` field
      .eq("user_id", user_id);

    if (updateError) {
      console.error("Error updating user data:", updateError);
      return NextResponse.json(
        { message: "Failed to update user data" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User data updated successfully" },
      { status: 200 }
    );

  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    return NextResponse.json(
      { message: "An error occurred" },
      { status: 500 }
    );
  }
}
