import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  try {
    if (!user_id) {
      console.error("User ID is missing");
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
      .from("UserBiographies")
      .select("biography")
      .eq("user_id", user_id)
      .maybeSingle(); 

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: "Failed to fetch user biography" }, { status: 500 });
    }

    if (!data || data.biography === undefined || data.biography === null) {
      console.error(`Biography not found for user_id: ${user_id}`);
      return NextResponse.json({ error: "Biography not found" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function PUT(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;

  try {
    const body = await request.json();
    const { biography } = body;

    if (!biography) {
      return NextResponse.json({ error: "Biography is required" }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    const { error } = await supabase
      .from("UserBiographies")
      .update({ biography })
      .eq("user_id", user_id);

    if (error) {
      return NextResponse.json({ error: "Failed to update biography" }, { status: 500 });
    }

    return NextResponse.json({ message: "Biography updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
