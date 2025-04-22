import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// Update broker (toggle active status or update credentials)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    
    // Extract the ID from params Promise
    const { id } = await params;
    const requestData = await request.json();
    const { is_active, credentials } = requestData;
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Prepare update data based on what was provided
    const updateData: { is_active?: boolean; credentials?: Record<string, string> } = {};
    
    if (typeof is_active === 'boolean') {
      updateData.is_active = is_active;
    }
    
    if (credentials) {
      updateData.credentials = credentials;
    }
    
    // Make sure we have something to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }
    
    // Update broker
    const { error } = await supabase
      .from('broker_credentials')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id);
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update broker' },
      { status: 500 }
    );
  }
}

// Delete broker
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    
    // Extract the ID from params Promise
    const { id } = await params;
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Delete broker
    const { error } = await supabase
      .from('broker_credentials')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete broker' },
      { status: 500 }
    );
  }
} 