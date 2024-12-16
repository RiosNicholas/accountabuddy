// import SupabaseClient from '@supabase/supabase-js';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Initializing Supabase client with request and response for SSR
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data, error } = await supabase
      .from('Users')
      .select('*');
    
    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
  }
}
