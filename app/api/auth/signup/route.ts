import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"; 


export async function POST(request: Request) {
  try {
    const { name, username, email, password } = await request.json();
    const created_at = new Date();

    if (!name || !username || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    // Initializing Supabase client with request and response for SSR
    const supabase = createRouteHandlerClient({ cookies });

    // Inserting user data into the Users table
    const { error } = await supabase
      .from('Users')
      .insert([{ created_at, name, username, email, password: hashedPassword }]);

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
  }
}

export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const email = searchParams.get("email");

    if (!username || !email) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Initializing Supabase client with request and response for SSR
    const supabase = createRouteHandlerClient({ cookies });

    // Finding data in the Users table
    const { data, error } = await supabase
      .from('Users')
      .select('user_id, username, name, email')
      .eq("username", username)
      .eq("email", email)
      .single()
      
    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to find user" }, { status: 500 });
    }

    return NextResponse.json({ message: "User found successfully", data }, { status: 201 });
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
  }
}
