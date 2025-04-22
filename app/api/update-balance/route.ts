import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { value = 100 } = await request.json()
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }
    
    // First try to update the users table
    let updated = false
    
    // Update users table
    try {
      const { data: userData, error: usersError } = await supabase
        .from('users')
        .upsert({ 
          id: user.id,
          coin_balance: value,
          updated_at: new Date().toISOString()
        })
        .select()
      
      if (!usersError) {
        updated = true
        console.log('Updated users table', userData)
      } else {
        console.error('Error updating users table:', usersError)
      }
    } catch (e) {
      console.error('Exception updating users table:', e)
    }
    
    // Also try updating clients table for redundancy
    try {
      const { data: clientData, error: clientsError } = await supabase
        .from('clients')
        .upsert({ 
          id: user.id,
          coin_balance: value,
          updated_at: new Date().toISOString()
        })
        .select()
      
      if (!clientsError) {
        updated = true
        console.log('Updated clients table', clientData)
      } else {
        console.error('Error updating clients table:', clientsError)
      }
    } catch (e) {
      console.error('Exception updating clients table:', e)
    }
    
    if (!updated) {
      // Try one more approach - direct SQL
      try {
        const { data, error } = await supabase.rpc('update_user_balance', {
          user_id: user.id,
          balance: value
        })
        
        if (!error) {
          updated = true
          console.log('Updated via RPC', data)
        } else {
          console.error('Error updating via RPC:', error)
        }
      } catch (e) {
        console.error('Exception calling RPC:', e)
      }
    }
    
    if (updated) {
      return NextResponse.json({ success: true, user_id: user.id, new_balance: value })
    } else {
      return NextResponse.json({ error: 'Failed to update balance' }, { status: 500 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
} 