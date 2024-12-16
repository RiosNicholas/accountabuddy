import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { liker, likee } = await request.json(); 

    const supabase = createRouteHandlerClient({ cookies });

    // Insert like into the Likes table
    const { error: likeInsertError } = await supabase
      .from("Likes")
      .insert({ liker, likee });

    if (likeInsertError) {
      console.error(likeInsertError);
      return NextResponse.json({ message: "Failed to store like" }, { status: 500 });
    }

    // Check if the likee likes the liker (mutual like)
    const { data: mutualLike, error: matchCheckError } = await supabase
      .from("Likes")
      .select("*")
      .eq("liker", likee)
      .eq("likee", liker)
      .maybeSingle();

    if (matchCheckError) {
      console.error(matchCheckError);
      return NextResponse.json({ message: "Failed to check for mutual like" }, { status: 500 });
    }

    // If mutual like exists, add two rows to the Matches table
    if (mutualLike) {
      const { error: matchInsertError } = await supabase
        .from("Matches")
        .insert([
          { user1: liker, user2: likee },
          { user1: likee, user2: liker },
        ]);

      if (matchInsertError) {
        console.error(matchInsertError);
        return NextResponse.json({ message: "Failed to store match" }, { status: 500 });
      }
    }

    return NextResponse.json(
      { message: mutualLike ? "Like and mutual match saved successfully" : "Like saved successfully" },
      { status: 201 }
    );
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
  }
}