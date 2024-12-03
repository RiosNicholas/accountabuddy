import { NextResponse } from "next/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"; 

export async function POST(request: Request) {
  try {
    const { type, user_id, preference } = await request.json();
    console.log(type, user_id, preference);

    // TODO: Create safeguards against not choosing an option for a preference

    // Initializing Supabase client with request and response for SSR
    const supabase = createRouteHandlerClient({ cookies });

    let queryError = null;
    const setError = null;

    if (type === "meeting frequency") {

      // // set postgres session user_id to the current user_id
      // // for increased security on updating Users rows
      // let response = await supabase.rpc('set_user_id', { user_id: user_id as string });
      // console.log("set response:", response)
      // console.log("user_id:", user_id)
      // // setError = setUIDError;
      // response = await supabase.rpc("get_user_id")
      // console.log("get response:", response)

      const { error } = await supabase
      .from('Users')
      .update({ meeting_frequency: preference })
      .eq('user_id', user_id);
      queryError = error;

    } else if (type === "meeting location") {
      
      // // set postgres session user_id to the current user_id
      // // for increased security on updating Users rows
      // let { error:setUIDError } = await supabase.rpc('set_user_id', { user_id: user_id as string });
      // setError = setUIDError;

      const { error } = await supabase
      .from('Users')
      .update({ meeting_preference: preference })
      .eq('user_id', user_id);
      queryError = error;

    } else if (type === "growth area") {

      const { error } = await supabase
      .from('UserGrowthAreas')
      .insert([{ user_id, growth_area_id: preference }])
      queryError = error;

    } else if (type === "accountability area") {

      const { error } = await supabase
        .from('UserAccountabilityAreas')
        .insert([{ user_id, accountability_area_id: preference }])
        queryError = error;

    } else {
      return NextResponse.json({ message: "Failed to insert preference: invalid preference type" }, { status: 500 });
    }

    if (setError) {
      console.error("setError:", setError);
      return NextResponse.json({ message: "Failed to set user_id on server" }, { status: 500 });
    }
    if (queryError) {
      console.error("queryError:", queryError);
      return NextResponse.json({ message: "Failed to insert preferences" }, { status: 500 });
    }

    return NextResponse.json({ message: "Preferences inserted successfully" }, { status: 201 });
  } catch (e: unknown) {
    console.error("Unexpected Error:", e);
    if (e instanceof Error) {
      return NextResponse.json({ message: "An error occurred", error: e.message }, { status: 500 });
    }
  }
}