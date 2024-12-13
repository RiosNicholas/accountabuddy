// import SupabaseClient from '@supabase/supabase-js';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { error } from 'console';
import { UUID } from 'crypto';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { searchParams } = new URL(request.url);
    const currUserId = searchParams.get('currentUserId');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = 5;

    if (!currUserId) {
      return NextResponse.json({ error: 'currentUserId is required' }, { status: 400 })
    }

    // calculate pagination range
    const start = (page-1) * pageSize;
    const end = start + pageSize - 1;
    
    // Fetch IDs of liked and disliked users
    const { data: likedUsers, error: likesError } = await supabase
      .from('Likes')
      .select('likee')
      .eq('liker', currUserId);

    const { data: dislikedUsers, error: dislikesError } = await supabase
      .from('Dislikes')
      .select('dislikee')
      .eq('disliker', currUserId);

    if (likesError || dislikesError) {
      console.error("Error fetching liked/disliked users", likesError || dislikesError);
      return NextResponse.json({ message: "Failed to fetch liked/disliked users" }, { status: 500 });
    }
    
    const likedIds = likedUsers?.map((entry) => String(entry.likee)).filter((id) => id !== null) || [];
    const dislikedIds = dislikedUsers?.map((entry) => String(entry.dislikee)).filter((id) => id !== null) || [];
    
    let query = supabase
    .from('Users')
    .select(`
      user_id,
      name,
      meeting_frequency,
      meeting_preference,
      UserGrowthAreas (
        GrowthAreas ( growth_area )
      ),
      UserAccountabilityAreas (
        AccountabilityAreas ( accountability_area )
      )
      `)
      .not('user_id', 'eq', currUserId); // exclude the current user

    // exclude liked users
    if (likedIds.length > 0) {
      query = query.not('user_id', 'in', "(" + likedIds.join(',')+ ")")
    }

    // exclude disliked users
    if (dislikedIds.length > 0) {
      query = query.not('user_id', 'in', "(" + dislikedIds.join(',')+ ")")
    }

    query = query.range(start, end);

    const { data, error } = await query;
    
    if (error) {
      console.error(error);
      return NextResponse.json({ message: "Failed to retrieve users" }, { status: 500 });
    }

    // Format data for ease of use
    const formattedData = data.map((user) => ({
      user_id: user.user_id,
      name: user.name,
      growthAreas: user.UserGrowthAreas?.map((ga) => ga.GrowthAreas.growth_area),
      accountabilityAreas: user.UserAccountabilityAreas?.map((aa) => aa.AccountabilityAreas.accountability_area),
      meetingFrequency: user.meeting_frequency,
      meetingLocation: user.meeting_preference
    }));

    return NextResponse.json({data: formattedData}, { status: 200 });
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  try {

    const { liker, likee, isLike } = await request.json();

    const supabase = createRouteHandlerClient({ cookies });

    let table = "";
    let params = {};

    if (isLike) {
      table = "Likes";
      params = {liker: liker, likee: likee};
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