import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { createPageTemplate } from '@/lib/page-templates'
import { BalanceDebugger } from '@/components/balance-debugger'

export default async function BalanceDebugPage() {
  // Check if user is authenticated
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  const content = (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Balance Debug Tools</h2>
      <p className="text-muted-foreground">
        Use these tools to check and fix issues with your coin balance.
      </p>
      
      <BalanceDebugger />
    </div>
  )

  return createPageTemplate({
    title: "Balance Debugger",
    description: "Debug and fix issues with your coin balance",
    content,
    breadcrumbPath: [
      { title: "Dashboard", href: "/dashboard" },
      { title: "Debug", isCurrent: true }
    ]
  })
} 