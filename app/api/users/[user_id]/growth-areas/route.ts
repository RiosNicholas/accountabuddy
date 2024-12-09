import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface GrowthArea {
  growth_area: string;
}

interface UserGrowthArea {
  growth_area_id: number;
  GrowthAreas: GrowthArea | null;
}

export async function GET(_: Request, { params }: { params: { user_id: string } }) {
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
        GrowthAreas (growth_area)
      `)
      .eq("user_id", user_id);

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: "Failed to fetch growth areas" }, { status: 500 });
    }

    const typedData = data as unknown as UserGrowthArea[];

    // Extract growth areas and handle null values
    const growthAreas = typedData
      .map((item) => item.GrowthAreas?.growth_area) 
      .filter((growth_area): growth_area is string => growth_area !== undefined && growth_area !== null);

    return NextResponse.json({ data: growthAreas });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
