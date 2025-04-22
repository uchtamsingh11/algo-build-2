"use client"

import { useEffect, useState } from 'react'
import { Coins } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { RealtimeChannel } from '@supabase/supabase-js'

export function CoinBalanceDisplay() {
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchUserBalance() {
      try {
        setLoading(true)
        
        // First, try the debug API to get all user data
        try {
          const apiResponse = await fetch('/api/check-balance')
          const apiData = await apiResponse.json()
          console.log('Debug API response:', apiData)
          setDebugInfo(apiData)
          
          // If we found the user in either table, use that balance
          const usersData = apiData.usersTable?.data?.[0]
          const clientsData = apiData.clientsTable?.data?.[0]
          
          if (usersData && typeof usersData.coin_balance === 'number') {
            console.log('Using balance from users table:', usersData.coin_balance)
            setBalance(usersData.coin_balance)
            setLoading(false)
            return
          }
          
          if (clientsData && typeof clientsData.coin_balance === 'number') {
            console.log('Using balance from clients table:', clientsData.coin_balance)
            setBalance(clientsData.coin_balance)
            setLoading(false)
            return
          }
        } catch (apiError) {
          console.error('Error fetching from debug API:', apiError)
        }
        
        // Get the current user
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setLoading(false)
          return
        }
        
        // Try direct database query with wildcard column selection
        // to find where the balance might be stored
        const tables = ['users', 'clients', 'profiles', 'accounts', 'user_profiles']
        
        for (const table of tables) {
          try {
            const { data, error } = await supabase
              .from(table)
              .select('*')
              .eq('id', user.id)
              .maybeSingle()
              
            console.log(`${table} table result:`, { data, error })
            
            if (!error && data) {
              // Check various possible column names for balance
              const balanceFields = ['coin_balance', 'coins', 'balance', 'credit', 'points']
              
              for (const field of balanceFields) {
                if (field in data && typeof data[field] === 'number') {
                  console.log(`Found balance in ${table}.${field}:`, data[field])
                  setBalance(data[field])
                  setLoading(false)
                  return
                }
              }
            }
          } catch (tableError) {
            console.error(`Error checking ${table} table:`, tableError)
          }
        }
        
        // If we get here, we couldn't find a balance
        console.log("No valid coin balance found in any table, defaulting to 0")
        setBalance(0)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserBalance()

    // Set up listeners only after we identify which table has the data
    const setupRealtimeListener = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null
      
      const tables = ['users', 'clients']
      const channels: RealtimeChannel[] = []
      
      for (const table of tables) {
        const channel = supabase
          .channel(`${table}-changes`)
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table,
              filter: `id=eq.${user.id}`,
            },
            (payload) => {
              console.log(`${table} table update:`, payload)
              // Check various column names for balance
              if (payload.new) {
                const balanceFields = ['coin_balance', 'coins', 'balance', 'credit', 'points']
                for (const field of balanceFields) {
                  if (field in payload.new && typeof payload.new[field] === 'number') {
                    setBalance(payload.new[field])
                    break
                  }
                }
              }
            }
          )
          .subscribe()
          
        channels.push(channel)
      }
      
      return () => {
        channels.forEach(channel => supabase.removeChannel(channel))
      }
    }
    
    const cleanupPromise = setupRealtimeListener()
    return () => {
      if (cleanupPromise) {
        cleanupPromise.then(cleanupFn => {
          if (cleanupFn) cleanupFn()
        })
      }
    }
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse flex items-center bg-zinc-900 px-4 py-2 rounded-xl">
        <div className="w-5 h-5 rounded-full bg-zinc-700 mr-2"></div>
        <div className="h-4 w-12 bg-zinc-700 rounded"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center bg-zinc-900 px-4 py-2 rounded-xl transition-all hover:bg-zinc-800">
      <Coins className="h-5 w-5 text-amber-500 mr-2" />
      <span className="text-base font-medium text-white">{balance !== null ? balance : 0}</span>
    </div>
  )
} 