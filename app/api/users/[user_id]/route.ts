import { NextResponse } from "next/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";

export async function GET(request: Request, { params }: { params: { user_id: string } }) {
  const userId = params.user_id;

  // Initializing Supabase client
  const supabase = createRouteHandlerClient({ cookies });

  try {
    if (userId) {
      // Fetch user by user_id
      const { data, error } = await supabase
        .from('Users')
        .select(`
          name,
          meeting_preference,
          meeting_frequency,
          UserGrowthAreas (
            GrowthAreas (
              growth_area
            )
          ),
          UserAccountabilityAreas (
            AccountabilityAreas (
              accountability_area
            )
          )
        `)
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user by user_id:', error);
        return NextResponse.json({ message: "Failed to fetch user" }, { status: 500 });
      }
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ message: "user_id is required" }, { status: 400 });
    }
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}
