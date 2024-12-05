import { NextResponse } from "next/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"; // required for SSR in `app` directory


export async function GET() {
  try {
    // Initializing Supabase client with request and response for SSR
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data, error } = await supabase
      // Fetching all users
      .from('Users')
      .select('*')

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
    }

    return NextResponse.json({ message: "Users fetched successfully", data }, { status: 200 });
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
  }
}