import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Extract the user_id from query parameters
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch users the logged-in user has liked or disliked
    const { data: likedUsers, error: likesError } = await supabase
      .from('Likes')
      .select('likee')
      .eq('liker', user_id);

    const { data: dislikedUsers, error: dislikesError } = await supabase
      .from('Dislikes')
      .select('dislikee')
      .eq('disliker', user_id);

    if (likesError || dislikesError) {
      return NextResponse.json(
        { error: 'Failed to fetch liked or disliked users' },
        { status: 500 }
      );
    }

    // Combine liked and disliked user IDs into a single array
    const excludedUserIds = [
      user_id, // Exclude the current user
      ...(likedUsers?.map((item) => item.likee) || []),
      ...(dislikedUsers?.map((item) => item.dislikee) || []),
    ];

    // Fetch users excluding those in the excludedUserIds list
    const { data: recommendedUsers, error: usersError } = await supabase
      .from('Users')
      .select('user_id') // Select only the user_id column
      .not('user_id', 'in', "(" + excludedUserIds.join(',') + ")");

    if (usersError) {
      return NextResponse.json(
        { error: 'Failed to fetch recommended users' },
        { status: 500 }
      );
    }

    // Format the output as a list of objects with a single element (user_id)
    const formattedUsers = recommendedUsers?.map((user) => ({ user_id: user.user_id })) || [];

    // Return the formatted list
    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Unexpected Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
