import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Fetch broker credentials for the current user
    const { data, error } = await supabase
      .from('broker_credentials')
      .select('*')
      .eq('user_id', user.id);
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch broker credentials' },
      { status: 500 }
    );
  }
} 