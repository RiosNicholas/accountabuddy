import { NextResponse } from "next/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const username = url.searchParams.get('username');
  const id = url.searchParams.get('id');

  // Initializing Supabase client
  const supabase = createRouteHandlerClient({ cookies });

  // Helper function to fetch a single user by key
  const fetchUser = async (key: 'id' | 'username', value: string) => {
    try {
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
        .eq(key, value)
        .single();

      if (error) {
        throw new Error(error.message || `Failed to fetch user by ${key}`);
      }
      return data;
    } catch (e: unknown) {
      console.error(`Error fetching user by ${key}:`, e);
      throw new Error("Failed to fetch user");
    }
  };

  try {
    if (username) {
      // Fetch user by username
      const data = await fetchUser('username', username);
      return NextResponse.json(data, { status: 200 });
    } else if (id) {
      // Fetch user by ID
      const data = await fetchUser('id', id);
      return NextResponse.json(data, { status: 200 });
    } else {
      // Fetch all users
      const { data, error } = await supabase
        .from('Users')
        .select(`
          id,
          name,
          username,
          email,
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
        `);

      if (error) {
        console.error('Error fetching all users:', error);
        return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
      }

      return NextResponse.json({ message: "Users fetched successfully", data }, { status: 200 });
    }
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}
