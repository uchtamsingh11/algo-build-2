'use client'

import { LoginForm } from '@/components/login-form'
import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { useNotification } from '@/lib/notification'
import BackButton from '@/components/back-button'

function LoginContent() {
  const searchParams = useSearchParams()
  const signupSuccess = searchParams.get('signup') === 'success'
  const { showNotification } = useNotification()
  
  useEffect(() => {
    if (signupSuccess) {
      showNotification({
        title: 'Thank you for signing up!',
        description: 'Check your email to confirm your account before signing in.',
        type: 'success'
      })
    }
  }, [signupSuccess, showNotification])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative">
      <BackButton />
      <div className="w-full max-w-sm">
        <LoginForm />
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
      <LoginContent />
    </Suspense>
  )
}
