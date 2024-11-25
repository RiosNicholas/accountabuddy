import { NextResponse } from "next/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"; // required for SSR in `app` directory


export async function GET({ params }: { params: { username: string } }) {

  const username = params.username;

  if (!username) {
    return NextResponse.json({ message: "username is required" }, { status: 400 });
  }

  try {

    // Initializing Supabase client with request and response for SSR
    const supabase = createRouteHandlerClient({ cookies });
    
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
    .eq('username', username)
    .single()

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to fetch user profile" }, { status: 500 });
    }

    return NextResponse.json({ message: "User profile fetched successfully", data }, { status: 200 });
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
  }
}