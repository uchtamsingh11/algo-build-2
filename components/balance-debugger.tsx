"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function BalanceDebugger() {
  const [loading, setLoading] = useState(false)
  const [balanceData, setBalanceData] = useState<any>(null)
  const [updateValue, setUpdateValue] = useState('100')
  const [updateResult, setUpdateResult] = useState<any>(null)

  const checkBalance = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/check-balance')
      const data = await response.json()
      setBalanceData(data)
    } catch (error) {
      console.error('Error checking balance:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateBalance = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/update-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: parseInt(updateValue, 10) }),
      })
      const data = await response.json()
      setUpdateResult(data)
      
      // Refresh the balance data
      await checkBalance()
    } catch (error) {
      console.error('Error updating balance:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Balance Debugger</CardTitle>
        <CardDescription>
          Test tools to verify and fix balance issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={checkBalance}
              disabled={loading}
            >
              Check Balance
            </Button>
            
            <div className="flex items-center gap-2 ml-4">
              <Input
                type="number"
                value={updateValue}
                onChange={(e) => setUpdateValue(e.target.value)}
                className="w-24"
              />
              <Button 
                variant="default" 
                onClick={updateBalance}
                disabled={loading}
              >
                Update Balance
              </Button>
            </div>
          </div>
          
          {balanceData && (
            <div className="mt-4 bg-zinc-900/50 p-4 rounded-lg overflow-auto max-h-96">
              <h3 className="text-sm font-semibold mb-2">Debug Data:</h3>
              <pre className="text-xs overflow-auto whitespace-pre-wrap">
                {JSON.stringify(balanceData, null, 2)}
              </pre>
            </div>
          )}
          
          {updateResult && (
            <div className="mt-4 bg-zinc-900/50 p-4 rounded-lg overflow-auto max-h-96">
              <h3 className="text-sm font-semibold mb-2">Update Result:</h3>
              <pre className="text-xs overflow-auto whitespace-pre-wrap">
                {JSON.stringify(updateResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 