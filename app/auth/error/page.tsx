'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { useNotification } from '@/lib/notification'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { showNotification } = useNotification()

  useEffect(() => {
    if (error) {
      showNotification({
        title: 'Authentication Error',
        description: error,
        type: 'error'
      })
    } else {
      showNotification({
        title: 'Error',
        description: 'An unspecified error occurred.',
        type: 'error'
      })
    }
  }, [error, showNotification])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sorry, something went wrong.</CardTitle>
            </CardHeader>
            <CardContent>
              {error ? (
                <p className="text-sm text-muted-foreground">Code error: {error}</p>
              ) : (
                <p className="text-sm text-muted-foreground">An unspecified error occurred.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Please wait while we process your request.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}
