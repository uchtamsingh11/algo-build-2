import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 })
    }
    
    // Log user id for debugging
    console.log('Current user ID:', user.id)
    
    // Check users table
    const { data: userData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
    
    // Check clients table
    const { data: clientData, error: clientsError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', user.id)
    
    // Get all tables in the database for debugging
    const { data: tableList, error: tableError } = await supabase
      .from('pg_catalog.pg_tables')
      .select('tablename')
      .eq('schemaname', 'public')
    
    return NextResponse.json({
      user: user.id,
      usersTable: {
        data: userData,
        error: usersError ? usersError.message : null
      },
      clientsTable: {
        data: clientData,
        error: clientsError ? clientsError.message : null
      },
      availableTables: tableList
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
} 