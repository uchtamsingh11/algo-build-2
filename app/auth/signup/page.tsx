'use client'

import { SignUpForm } from '@/components/sign-up-form'
import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { useNotification } from '@/lib/notification'

function SignupContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { showNotification } = useNotification()

  useEffect(() => {
    if (error) {
      showNotification({
        title: 'Signup Error',
        description: error,
        type: 'error'
      })
    }
  }, [error, showNotification])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    }>
      <SignupContent />
    </Suspense>
  )
} 