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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { ChevronRight, Star, TrendingUp, BarChart3, RefreshCw, BadgeCheck } from "lucide-react"

export default async function MarketplacePage() {
  // Check if user is authenticated
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  // Mock strategy data - in a real app, this would come from your database
  const featuredStrategy = {
    id: 0,
    title: "Advanced Volatility Harvester",
    description: "Our premium strategy that adapts to market volatility and captures significant movements with advanced risk management.",
    price: "$299",
    type: "Semi",
    rating: 4.9,
    reviews: 124,
    featured: true
  };

  const strategies = [
    {
      id: 1,
      title: "Momentum Breakout Strategy",
      description: "A strategy that identifies and capitalizes on momentum breakouts with risk management and profit targets.",
      price: "$99",
      type: "Semi",
      rating: 4.7,
      reviews: 86,
      icon: TrendingUp
    },
    {
      id: 2,
      title: "Trend Following System",
      description: "Follows established market trends with multiple timeframe analysis for optimal entry and exit points.",
      price: "$149",
      type: "Semi",
      rating: 4.5,
      reviews: 62,
      icon: BarChart3,
      badge: "TRENDING"
    },
    {
      id: 3,
      title: "Mean Reversion Strategy",
      description: "Identifies overbought and oversold market conditions to capture price reversions to the mean.",
      price: "$129",
      type: "Semi", 
      rating: 4.6,
      reviews: 53,
      icon: RefreshCw
    },
    {
      id: 4,
      title: "Scalping Strategy Bundle",
      description: "A collection of short-term strategies designed for quick market entries and exits with tight risk control.",
      price: "$199",
      type: "Semi",
      rating: 4.8,
      reviews: 95,
      icon: TrendingUp
    },
  ]

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
                  <BreadcrumbItem>
                    <BreadcrumbPage>Marketplace</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            <div className="ml-auto mr-4 flex items-center gap-2">
              <CoinBalanceDisplay />
            </div>
          </header>
          
          <main className="p-6">
            {/* Action Buttons Row */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <Button asChild variant="outline">
                  <Link href="/dashboard/my-strategy">My Strategy</Link>
                </Button>
                <Button asChild variant="default">
                  <Link href="/dashboard/create-strategy">Create Strategy</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-sm border-zinc-800 bg-zinc-900">
                  Latest
                </Button>
                <Button variant="outline" size="sm" className="text-sm border-zinc-800 bg-zinc-900">
                  Top Rated
                </Button>
                <Button variant="outline" size="sm" className="text-sm border-zinc-800 bg-zinc-900">
                  Price
                </Button>
              </div>
            </div>
            
            {/* Hero Section */}
            <div className="relative mb-10 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-8 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]"></div>
              <div className="absolute -inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-500/20 to-transparent"></div>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="max-w-2xl">
                  <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Strategy Marketplace</h1>
                  <p className="text-zinc-300 text-lg max-w-xl">
                    Discover high-performance trading strategies from professional traders and developers. Filter, evaluate, and implement with just a few clicks.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Browse All Strategies</Button>
                    <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                      How It Works
                    </Button>
                  </div>
                </div>
                <div className="flex-shrink-0 hidden md:block">
                  <div className="relative w-[180px] h-[180px] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                    <div className="absolute inset-1 rounded-full bg-zinc-900 flex items-center justify-center">
                      <BarChart3 className="w-16 h-16 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured Strategy */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Featured Strategy</h2>
                <Button variant="link" asChild className="text-blue-400 flex items-center">
                  <Link href="/marketplace/featured">
                    View All Features <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
              
              <Card className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border-zinc-800 shadow-xl hover:shadow-zinc-900/30 transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                      <BadgeCheck className="h-4 w-4 text-blue-500" />
                    </div>
                    <span className="text-xs font-medium uppercase text-blue-500">{featuredStrategy.type}</span>
                    <div className="ml-auto flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill={i < Math.floor(featuredStrategy.rating) ? "#EAB308" : "none"} 
                              stroke={i < Math.floor(featuredStrategy.rating) ? "#EAB308" : "#71717A"} 
                              className="h-3.5 w-3.5" />
                      ))}
                      <span className="ml-1 text-xs text-zinc-400">{featuredStrategy.rating} ({featuredStrategy.reviews})</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{featuredStrategy.title}</CardTitle>
                  <CardDescription className="text-zinc-300 mt-1">{featuredStrategy.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center pb-6">
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="rounded-lg bg-zinc-800/80 p-3">
                      <div className="text-xs text-zinc-400">Success Rate</div>
                      <div className="text-lg font-bold text-white">94.2%</div>
                    </div>
                    <div className="rounded-lg bg-zinc-800/80 p-3">
                      <div className="text-xs text-zinc-400">Avg. Return</div>
                      <div className="text-lg font-bold text-green-500">+18.7%</div>
                    </div>
                    <div className="rounded-lg bg-zinc-800/80 p-3">
                      <div className="text-xs text-zinc-400">Price</div>
                      <div className="text-lg font-bold text-white">{featuredStrategy.price}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 pt-0">
                  <Button variant="outline" className="flex-1 border-zinc-700 hover:bg-zinc-800" asChild>
                    <Link href={`/dashboard/strategy/${featuredStrategy.id}`}>View Details</Link>
                  </Button>
                  <Button variant="default" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Buy Strategy
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Strategy Cards */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Popular Strategies</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {strategies.map((strategy) => {
                  const Icon = strategy.icon || TrendingUp;
                  return (
                    <Card key={strategy.id} className="relative flex flex-col h-full bg-zinc-900 border-zinc-800 shadow-lg hover:shadow-zinc-900/30 hover:border-zinc-700 transition-all duration-300">
                      {strategy.badge && (
                        <div className="absolute right-3 top-3 z-10 bg-amber-600/90 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                          {strategy.badge}
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                            <Icon className="h-3.5 w-3.5 text-green-500" />
                          </div>
                          <span className="text-xs font-medium text-green-500">{strategy.type}</span>
                          <div className="ml-auto flex items-center">
                            <Star fill="#EAB308" stroke="#EAB308" className="h-3.5 w-3.5" />
                            <span className="ml-1 text-xs text-zinc-400">{strategy.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg font-semibold text-white">{strategy.title}</CardTitle>
                        <CardDescription className="text-zinc-400 mt-1">{strategy.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow pt-0">
                        <div className="mt-3 rounded-lg bg-zinc-800/50 p-3">
                          <div className="flex justify-between">
                            <div>
                              <div className="text-xs text-zinc-400">Price</div>
                              <div className="text-xl font-bold text-white">{strategy.price}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-zinc-400">Reviews</div>
                              <div className="text-sm font-medium text-zinc-300">{strategy.reviews}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800" asChild>
                            <Link href={`/dashboard/strategy/${strategy.id}`}>Details</Link>
                          </Button>
                          <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                            Buy
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
} 