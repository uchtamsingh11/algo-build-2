import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { broker_name, credentials } = await request.json();
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check if all required fields are present
    if (!broker_name || !credentials) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Insert new broker
    const { data, error } = await supabase.from('broker_credentials').insert({
      user_id: user.id,
      broker_name,
      credentials,
      is_active: true,
    }).select().single();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to connect broker' },
      { status: 500 }
    );
  }
} 