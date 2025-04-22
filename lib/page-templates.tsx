import { AppSidebar } from "@/components/app-sidebar"
import React, { ReactNode } from "react"
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

type BreadcrumbPath = {
  title: string;
  href?: string;
  isCurrent?: boolean;
}

export async function createPageTemplate({ 
  title, 
  description,
  content,
  breadcrumbPath
}: { 
  title: string;
  description?: string;
  content?: ReactNode;
  breadcrumbPath: BreadcrumbPath[];
}) {
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
                  {breadcrumbPath.map((item, index) => (
                    <React.Fragment key={item.title + '-' + index}>
                      {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                      <BreadcrumbItem className="hidden md:block">
                        {item.isCurrent ? (
                          <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={item.href || "#"}>{item.title}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            <div className="ml-auto mr-4">
              <CoinBalanceDisplay />
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {title && (
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold">{title}</h1>
                {description && <p className="text-muted-foreground">{description}</p>}
              </div>
            )}
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-6 md:min-h-min">
              {content}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
} 