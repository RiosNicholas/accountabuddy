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

    // Query to join UserGrowthAreas with GrowthAreas table
    const { data, error } = await supabase
      .from("UserGrowthAreas")
      .select(`
        growth_area_id,
        GrowthAreas (id, growth_area)
      `)
      .eq("user_id", user_id);

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: "Failed to fetch growth areas" }, { status: 500 });
    }

    const formattedData = data
      .map((item) => item.GrowthAreas[0]?.growth_area)
      .filter((growth_area) => growth_area !== undefined && growth_area !== null);

    return NextResponse.json({ data: formattedData });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
