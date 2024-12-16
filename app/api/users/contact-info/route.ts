import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET( request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  try {
    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
      .from("UserContactInfo")
      .select("email, discord, instagram")
      .eq("user_id", user_id)
      .single();

    if (!data) {
      return NextResponse.json(
        { error: "No contact information found" },
        { status: 404 }
      );
    }

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch contact information" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST( request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  try {
    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const { email, discord, instagram } = body;

    if (
      (discord && discord.length > 50) ||
      (instagram && instagram.length > 50) ||
      (email && email.length > 255)
    ) {
      return NextResponse.json(
        { error: "Invalid input. Check field lengths (discord/instagram max: 50, email max: 255).", },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    const { error } = await supabase
      .from("UserContacts")
      .upsert(
        { user_id, discord: discord, email, instagram: instagram },
        { onConflict: "user_id" }
      );

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.json(
        { error: "Failed to update contact information" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Contact information updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
