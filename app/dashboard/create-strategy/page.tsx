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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default async function CreateStrategyPage() {
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
                    <BreadcrumbPage>Create Strategy</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            <div className="ml-auto mr-4 flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/my-strategy">My Strategy</Link>
              </Button>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <CoinBalanceDisplay />
            </div>
          </header>
          
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">Create a New Strategy</h1>
              <p className="text-zinc-400">Fill in the details to create your custom trading strategy</p>
            </div>
            
            <div className="max-w-3xl">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Strategy Information</CardTitle>
                  <CardDescription>Provide the basic information about your strategy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Strategy Name</Label>
                    <Input id="name" placeholder="Enter strategy name" className="bg-zinc-800 border-zinc-700" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe how your strategy works" 
                      className="min-h-24 bg-zinc-800 border-zinc-700" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Strategy Type</Label>
                      <Select>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="semi">Semi</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($USD)</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        placeholder="99.99" 
                        className="bg-zinc-800 border-zinc-700" 
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-zinc-800 pt-6">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Create Strategy</Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
} 