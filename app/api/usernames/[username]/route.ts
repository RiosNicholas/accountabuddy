import { NextResponse } from "next/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"; 

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    // Initialize Supabase client with cookies for SSR
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data, error } = await supabase
      .from('Users')
      .select('user_id')
      .eq('username', username)
      .single(); 

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to fetch user", error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User fetched successfully", user_id: data.user_id }, { status: 200 });
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}
