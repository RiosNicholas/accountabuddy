import { NextResponse } from "next/server";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"; 

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data, error } = await supabase
      .from('UserAccountabilityAreas')
      .select(`
        user_id,
        accountability_area_id
      `)
      .eq('user_id', params.id);

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to fetch accountability areas' }, 
      { status: 500 }
    );
  }
}