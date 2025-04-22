import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CoinBalanceDisplay } from "@/components/coin-balance-display"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function MyStrategyPage() {
  // Check if user is authenticated
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full grid-cols-[auto_1fr] bg-zinc-950 text-zinc-100">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/marketplace">
                      Marketplace
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>My Strategy</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            <div className="ml-auto mr-4 flex items-center gap-2">
              <Button asChild variant="default" size="sm">
                <Link href="/dashboard/create-strategy">Create Strategy</Link>
              </Button>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <CoinBalanceDisplay />
            </div>
          </header>
          
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">My Strategies</h1>
              <p className="text-zinc-400">Manage and monitor your strategies</p>
            </div>
            
            <div className="rounded-lg border border-zinc-800 p-8 text-center">
              <h2 className="text-xl font-medium mb-2">You don't have any strategies yet</h2>
              <p className="text-zinc-400 mb-6">Create your first strategy to get started</p>
              <Button asChild>
                <Link href="/dashboard/create-strategy">Create Strategy</Link>
              </Button>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
} 