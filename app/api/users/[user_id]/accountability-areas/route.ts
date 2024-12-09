import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface AccountabilityArea {
  accountability_area: string;
}

interface UserAccountabilityArea {
  accountability_area_id: number;
  AccountabilityAreas: AccountabilityArea | null;
}

export async function GET(request: Request, { params }: { params: { user_id: string } }) {
  const { user_id } = params;
  try {

    if (!user_id) {
      console.error("User ID is missing");
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });

    // Query to join UserAccountabilityAreas with AccountabilityAreas table
    const { data, error } = await supabase
      .from("UserAccountabilityAreas")
      .select(`
        accountability_area_id,
        AccountabilityAreas (accountability_area)
      `)
      .eq("user_id", user_id);

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: "Failed to fetch accountability areas" }, { status: 500 });
    }

    const typedData = data as unknown as UserAccountabilityArea[];

    // Extract accountability areas and handle null values
    const growthAreas = typedData
      .map((item) => item.AccountabilityAreas?.accountability_area) 
      .filter((accountability_area): accountability_area is string => accountability_area !== undefined && accountability_area !== null);

    return NextResponse.json({ data: growthAreas });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


