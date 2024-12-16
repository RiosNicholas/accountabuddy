import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { disliker, dislikee } = await request.json();

    const supabase = createRouteHandlerClient({ cookies });

    // Insert dislike data into the "Dislikes" table
    const { error } = await supabase
      .from("Dislikes")
      .insert({ disliker, dislikee });

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to store dislike" }, { status: 500 });
    }

    return NextResponse.json({ message: "Dislike saved successfully" }, { status: 201 });
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
  }
}
