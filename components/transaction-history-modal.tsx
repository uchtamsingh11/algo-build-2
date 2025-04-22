"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { formatDistanceToNow } from 'date-fns'

interface Transaction {
  id: string
  amount: number
  transaction_type: string
  created_at: string
  description?: string
}

interface TransactionHistoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TransactionHistoryModal({
  isOpen,
  onClose,
}: TransactionHistoryModalProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    // Only fetch data when the modal is open
    if (isOpen) {
      fetchTransactions()
    }
  }, [isOpen])

  async function fetchTransactions() {
    try {
      setLoading(true)
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return
      
      // Fetch transactions for the current user, ordered by most recent first
      const { data, error } = await supabase
        .from('coin_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching transactions:', error)
        return
      }
      
      setTransactions(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // If modal is not open, don't render anything
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-2xl shadow-xl w-full max-w-md mx-auto overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-white">History</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5 text-zinc-400" />
          </button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-center text-zinc-400 py-8">No transaction history found.</p>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 rounded-xl bg-zinc-800 border border-zinc-700"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`text-lg font-semibold ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                      </div>
                      <div className="bg-zinc-700 text-xs px-2 py-1 rounded-full text-zinc-300 uppercase">
                        {transaction.transaction_type}
                      </div>
                    </div>
                    <div className="text-zinc-400 text-sm">
                      {formatDistanceToNow(new Date(transaction.created_at), { addSuffix: true })}
                    </div>
                  </div>
                  
                  {transaction.description && (
                    <div className="mt-2 text-sm text-zinc-400">
                      {transaction.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
} 