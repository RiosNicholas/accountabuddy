import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {

    const { liker, likee, isLike } = await request.json();

    const supabase = createRouteHandlerClient({ cookies });

    let table = "";
    let params = {};

    if (isLike) {
      table = "Likes";
      params = {liker: liker, likee: likee};

      // Check for a match
      const {data, error:matchCheckError} = await supabase
      .from(table)
      .select("*")
      .eq("liker", likee)
      .eq("likee", liker)

      if (matchCheckError) {
        console.error(matchCheckError);
        return NextResponse.json({ message: "Failed to check for a match" }, { status: 500 });
      }

      if (data.length > 0) {
        let matchParams = {user1:liker, user2:likee}
        const {error: matchMadeError} = await supabase
        .from("Matches")
        .insert(matchParams)

        if (matchMadeError) {
          console.error(matchMadeError);
          return NextResponse.json({ message: "Failed to store match" }, { status: 500 });
        }
      }
    
    } else {
      table = "Dislikes";
      params = {disliker: liker, dislikee: likee};
    }
    const { error } = await supabase
    .from(table)
    .insert(params);

    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to store dis/like" }, { status: 500 });
    }

    return NextResponse.json({ message: "dis/like saved successfully" }, { status: 201 })
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
  }
}