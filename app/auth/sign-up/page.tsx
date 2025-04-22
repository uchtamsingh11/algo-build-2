'use client'

import { SignUpForm } from '@/components/sign-up-form'
import BackButton from '@/components/back-button'

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative">
      <BackButton />
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  )
}
