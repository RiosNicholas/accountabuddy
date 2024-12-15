import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// GET handler
export async function GET(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  try {
    if (!user_id) {
      console.error("User ID is missing");
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
      .from("UserContactInfo")
      .select(`
        email,
        discord,
        instagram
      `)
      .eq("user_id", user_id)
      .maybeSingle();

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: "Failed to fetch contact information" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST handler for upserting contact info
export async function POST(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  try {
    if (!user_id) {
      console.error("User ID is missing");
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const { email, discord, instagram } = body;

    console.log("Received payload:", { email, discord, instagram });

    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
      .from("UserContactInfo")
      .upsert(
        { user_id, email, discord, instagram },
        { onConflict: "user_id" }
      );

    console.log("Supabase upsert result:", { data, error });

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.json({ error: "Failed to update contact information" }, { status: 500 });
    }

    return NextResponse.json({ message: "Contact information updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
