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
import { ScalpingToolBrokerSelector } from "@/components/scalping-tool/broker-selector"
import { Card, CardContent } from "@/components/ui/card"

export default async function Page() {
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
                    <BreadcrumbLink href="/scalping-tool">
                      Scalping Tool
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Manage</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            <div className="ml-auto mr-4">
              <CoinBalanceDisplay />
            </div>
          </header>
          
          <div className="flex-1 p-6 space-y-6">
            <Card className="border-zinc-800 bg-zinc-900/50 shadow-md">
              <CardContent className="pt-6 space-y-6">
                <ScalpingToolBrokerSelector />
                
                {/* Additional Scalping Tool settings can be added here */}
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
} 