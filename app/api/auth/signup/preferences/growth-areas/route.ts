import { NextResponse } from "next/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    // Initializing Supabase client with request and response for SSR
    const supabase = createRouteHandlerClient({ cookies });

    // Getting data from the GrowthAreas table
    const { data, error } = await supabase
      .from('GrowthAreas')
      .select('id, area:growth_area');

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to get growth areas" }, { status: 500 });
    }

    return NextResponse.json({ message: "Growth areas gotten successfully", data }, { status: 201 });
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
  }
}