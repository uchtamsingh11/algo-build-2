import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
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
import { createPageTemplate } from '@/lib/page-templates'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Activity, 
  ArrowDown, 
  ArrowUp, 
  Bitcoin, 
  BookOpen, 
  ChevronDown, 
  Clock, 
  Cpu, 
  DollarSign, 
  Euro, 
  Globe, 
  LucideIcon, 
  Newspaper, 
  PieChart, 
  Plus, 
  Settings, 
  Sigma, 
  Star,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

export default async function DashboardPage() {
  // Check if user is authenticated
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  const content = (
    <div className="flex flex-col gap-6">
      {/* 📊 Top Section – Market Overview Cards */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MarketCard 
            name="S&P 500" 
            symbol="SPX" 
            price="5,246.03" 
            change={0.76} 
            icon={<DollarSign className="h-5 w-5" />} 
          />
          <MarketCard 
            name="NASDAQ" 
            symbol="COMP" 
            price="16,742.39" 
            change={1.02} 
            icon={<DollarSign className="h-5 w-5" />} 
          />
          <MarketCard 
            name="Bitcoin" 
            symbol="BTC/USD" 
            price="68,341.56" 
            change={-2.31} 
            icon={<Bitcoin className="h-5 w-5" />} 
          />
          <MarketCard 
            name="Ethereum" 
            symbol="ETH/USD" 
            price="3,486.92" 
            change={-1.45} 
            icon={<Bitcoin className="h-5 w-5" />} 
          />
        </div>
      </section>

      {/* 🧠 Mid Section – Portfolio Snapshot + Bot Performance */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Portfolio Snapshot</CardTitle>
            <CardDescription>Your current allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-3xl font-bold">$125,432.00</p>
                <p className="text-sm text-emerald-500 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +5.4% (24h)
                </p>
              </div>
              {/* Pie chart placeholder */}
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <PieChart className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs mt-6">
              <div>
                <div className="h-2 w-full bg-blue-500 rounded-full mb-1"></div>
                <p>Stocks</p>
                <p className="font-medium">45%</p>
              </div>
              <div>
                <div className="h-2 w-full bg-purple-500 rounded-full mb-1"></div>
                <p>Crypto</p>
                <p className="font-medium">30%</p>
              </div>
              <div>
                <div className="h-2 w-full bg-green-500 rounded-full mb-1"></div>
                <p>Forex</p>
                <p className="font-medium">15%</p>
              </div>
              <div>
                <div className="h-2 w-full bg-amber-500 rounded-full mb-1"></div>
                <p>Commodities</p>
                <p className="font-medium">10%</p>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" size="sm">1D</Button>
              <Button variant="outline" size="sm">1W</Button>
              <Button variant="outline" size="sm">1M</Button>
              <Button variant="outline" size="sm">All</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Bot Performance</CardTitle>
            <CardDescription>Active trading algorithms</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bot Name</TableHead>
                  <TableHead>Strategy</TableHead>
                  <TableHead>Return %</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uptime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Alpha Trader</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none">
                      Momentum
                    </Badge>
                  </TableCell>
                  <TableCell className="text-emerald-500">+12.4%</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none">
                      Running
                    </Badge>
                  </TableCell>
                  <TableCell>14d 6h</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Beta Signals</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-none">
                      Arbitrage
                    </Badge>
                  </TableCell>
                  <TableCell className="text-emerald-500">+8.2%</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-none">
                      Paused
                    </Badge>
                  </TableCell>
                  <TableCell>7d 11h</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Gamma Bot</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 border-none">
                      Mean Reversion
                    </Badge>
                  </TableCell>
                  <TableCell className="text-rose-500">-2.1%</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-none">
                      Error
                    </Badge>
                  </TableCell>
                  <TableCell>2d 8h</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Delta Scanner</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-none">
                      Trend Following
                    </Badge>
                  </TableCell>
                  <TableCell className="text-emerald-500">+5.7%</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none">
                      Running
                    </Badge>
                  </TableCell>
                  <TableCell>9d 14h</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* 👁 Watchlist + Live Chart Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Watchlist</CardTitle>
            <CardDescription>Assets you're tracking</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-px">
              <WatchlistItem symbol="BTC/USD" name="Bitcoin" price="68,341.56" change={-2.31} />
              <WatchlistItem symbol="ETH/USD" name="Ethereum" price="3,486.92" change={-1.45} />
              <WatchlistItem symbol="AAPL" name="Apple Inc." price="212.47" change={0.86} />
              <WatchlistItem symbol="MSFT" name="Microsoft" price="426.18" change={1.24} />
              <WatchlistItem symbol="AMZN" name="Amazon" price="182.36" change={-0.54} />
              <WatchlistItem symbol="TSLA" name="Tesla" price="195.72" change={2.63} />
              <WatchlistItem symbol="EUR/USD" name="Euro/USD" price="1.0842" change={0.12} />
            </div>
            <div className="p-4">
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Live Chart</CardTitle>
              <CardDescription>Real-time market data</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                BTC/USD
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2 h-9 w-9">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Chart placeholder */}
            <div className="bg-zinc-800/50 rounded-lg h-[400px] flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">TradingView chart would be embedded here</p>
                <div className="flex justify-center gap-2 mt-4">
                  <Badge variant="outline" className="cursor-pointer">RSI</Badge>
                  <Badge variant="outline" className="cursor-pointer">MACD</Badge>
                  <Badge variant="outline" className="cursor-pointer">Bollinger</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 📚 Orders and Trades Overview */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Orders & Trades</CardTitle>
            <CardDescription>Your recent trading activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="positions">
              <TabsList className="mb-4">
                <TabsTrigger value="positions">Open Positions</TabsTrigger>
                <TabsTrigger value="history">Trade History</TabsTrigger>
              </TabsList>
              <TabsContent value="positions">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Side</TableHead>
                      <TableHead>Entry Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>P/L %</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">BTC/USD</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none">
                          Buy
                        </Badge>
                      </TableCell>
                      <TableCell>$65,423.10</TableCell>
                      <TableCell>$68,341.56</TableCell>
                      <TableCell className="text-emerald-500">+4.46%</TableCell>
                      <TableCell>3d 14h</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">AAPL</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none">
                          Buy
                        </Badge>
                      </TableCell>
                      <TableCell>$208.32</TableCell>
                      <TableCell>$212.47</TableCell>
                      <TableCell className="text-emerald-500">+1.99%</TableCell>
                      <TableCell>7d 2h</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">EUR/USD</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-none">
                          Sell
                        </Badge>
                      </TableCell>
                      <TableCell>$1.0936</TableCell>
                      <TableCell>$1.0842</TableCell>
                      <TableCell className="text-emerald-500">+0.86%</TableCell>
                      <TableCell>1d 8h</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="history">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Side</TableHead>
                      <TableHead>Entry Price</TableHead>
                      <TableHead>Exit Price</TableHead>
                      <TableHead>P/L %</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">ETH/USD</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none">
                          Buy
                        </Badge>
                      </TableCell>
                      <TableCell>$3,142.68</TableCell>
                      <TableCell>$3,486.92</TableCell>
                      <TableCell className="text-emerald-500">+10.95%</TableCell>
                      <TableCell>Apr 12, 2024</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">TSLA</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-none">
                          Sell
                        </Badge>
                      </TableCell>
                      <TableCell>$212.45</TableCell>
                      <TableCell>$195.72</TableCell>
                      <TableCell className="text-emerald-500">+7.87%</TableCell>
                      <TableCell>Apr 8, 2024</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">AMZN</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none">
                          Buy
                        </Badge>
                      </TableCell>
                      <TableCell>$178.32</TableCell>
                      <TableCell>$171.23</TableCell>
                      <TableCell className="text-rose-500">-3.98%</TableCell>
                      <TableCell>Apr 5, 2024</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* 📈 Strategy Analytics */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Strategy Analytics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StrategyCard 
            name="Momentum" 
            winRate={68}
            trades={124}
            sharpe={1.32} 
            drawdown={5.2}
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <StrategyCard 
            name="Mean Reversion" 
            winRate={62}
            trades={87}
            sharpe={0.98} 
            drawdown={7.1}
            icon={<TrendingDown className="h-5 w-5" />}
          />
          <StrategyCard 
            name="Arbitrage" 
            winRate={82}
            trades={45}
            sharpe={2.14} 
            drawdown={2.3}
            icon={<Activity className="h-5 w-5" />}
          />
          <StrategyCard 
            name="Trend Following" 
            winRate={71}
            trades={93}
            sharpe={1.65} 
            drawdown={6.8}
            icon={<Sigma className="h-5 w-5" />}
          />
          <StrategyCard 
            name="Scalping" 
            winRate={58}
            trades={246}
            sharpe={1.12} 
            drawdown={3.7}
            icon={<Cpu className="h-5 w-5" />}
          />
        </div>
      </section>

      {/* 📰 Right Sidebar / Floating Section – News & Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Market News</CardTitle>
            <CardDescription>Latest financial updates</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-px">
              <NewsItem 
                title="Fed signals potential rate cuts later this year" 
                source="Financial Times"
                summary="Federal Reserve officials indicated they may begin lowering interest rates if inflation continues to cool."
                time="2h ago"
                tags={["Economy", "Fed"]}
              />
              <NewsItem 
                title="Bitcoin falls after reaching all-time high" 
                source="CoinDesk"
                summary="BTC retreated from $69,000 as profit-taking set in following the recent rally."
                time="4h ago"
                tags={["Crypto", "Bitcoin"]}
              />
              <NewsItem 
                title="Apple unveils new AI features for iPhone" 
                source="CNBC"
                summary="The tech giant announced several AI-powered capabilities coming to iOS 18."
                time="6h ago"
                tags={["Technology", "Apple"]}
              />
              <NewsItem 
                title="Oil prices surge amid Middle East tensions" 
                source="Reuters"
                summary="Crude oil jumped 3% as geopolitical concerns raised supply disruption fears."
                time="8h ago"
                tags={["Commodities", "Oil"]}
              />
              <NewsItem 
                title="EU approves new cryptocurrency regulations" 
                source="Bloomberg"
                summary="The European Parliament passed comprehensive rules for digital assets and exchanges."
                time="10h ago"
                tags={["Crypto", "Regulation"]}
              />
            </div>
            <div className="p-4">
              <Button variant="outline" size="sm" className="w-full">
                View All News
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Price Alerts</CardTitle>
            <CardDescription>Your personalized market triggers</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-px">
              <AlertItem 
                symbol="BTC/USD"
                condition="above"
                price="70,000.00"
                status="pending"
              />
              <AlertItem 
                symbol="ETH/USD"
                condition="below"
                price="3,000.00"
                status="pending"
              />
              <AlertItem 
                symbol="AAPL"
                condition="above"
                price="220.00"
                status="pending"
              />
              <AlertItem 
                symbol="TSLA"
                condition="below"
                price="180.00"
                status="triggered"
              />
            </div>
            <div className="py-4 px-3">
              <h3 className="text-sm font-medium mb-3">Social Sentiment</h3>
              <div className="bg-zinc-800/50 rounded-lg p-3 mb-3">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-muted-foreground">Most Mentioned</p>
                  <p className="text-xs text-muted-foreground">Last 24h</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none">
                    BTC
                  </Badge>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-none">
                    AAPL
                  </Badge>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-none">
                    ETH
                  </Badge>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-none">
                    TSLA
                  </Badge>
                </div>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-2">Market Sentiment</p>
                <div className="h-2 w-full bg-zinc-700 rounded-full mb-1 relative">
                  <div className="absolute h-4 w-4 bg-amber-500 rounded-full -top-1 left-[65%] transform -translate-x-1/2"></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Bearish</span>
                  <span>Neutral</span>
                  <span>Bullish</span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Trade Button */}
      <Button className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )

  return createPageTemplate({
    title: "Dashboard",
    description: "Your trading activity at a glance",
    content,
    breadcrumbPath: [
      { title: "Dashboard", isCurrent: true }
    ]
  })
}
// Component for Market Overview Cards
function MarketCard({ name, symbol, price, change, icon }: { 
  name: string;
  symbol: string;
  price: string;
  change: number;
  icon: React.ReactNode;
}) {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              {icon}
            </div>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{symbol}</p>
            </div>
          </div>
          <div className={`flex items-center ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            {Math.abs(change)}%
          </div>
        </div>
        <p className="text-2xl font-semibold">${price}</p>
        <div className="h-8 mt-2">
          {/* Sparkline chart placeholder */}
          <div className="h-full w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded-md"></div>
        </div>
      </CardContent>
    </Card>
  )
}

// Component for Watchlist items
function WatchlistItem({ symbol, name, price, change }: {
  symbol: string;
  name: string;
  price: string;
  change: number;
}) {
  const isPositive = change >= 0;
  
  return (
    <div className="flex items-center justify-between p-3 hover:bg-zinc-800/50 transition-colors">
      <div className="flex items-center gap-3">
        <Star className="h-4 w-4 text-muted-foreground hover:text-amber-500 cursor-pointer" />
        <div>
          <p className="font-medium">{symbol}</p>
          <p className="text-xs text-muted-foreground">{name}</p>
        </div>
      </div>
      <div>
        <p className="text-right font-medium">${price}</p>
        <p className={`text-xs text-right ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isPositive ? '+' : ''}{change}%
        </p>
      </div>
    </div>
  )
}

// Component for Strategy Analytics cards
function StrategyCard({ name, winRate, trades, sharpe, drawdown, icon }: {
  name: string;
  winRate: number;
  trades: number;
  sharpe: number;
  drawdown: number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
            {icon}
          </div>
          <p className="font-medium">{name}</p>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Win Rate</p>
            <p className="font-semibold">{winRate}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Trades</p>
            <p className="font-semibold">{trades}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
            <p className="font-semibold">{sharpe}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg Drawdown</p>
            <p className="font-semibold">{drawdown}%</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-4">
          Backtest
        </Button>
      </CardContent>
    </Card>
  )
}

// Component for News items
function NewsItem({ title, source, summary, time, tags }: {
  title: string;
  source: string;
  summary: string;
  time: string;
  tags: string[];
}) {
  return (
    <div className="flex gap-4 p-4 hover:bg-zinc-800/50 transition-colors">
      <div className="mt-1 flex-shrink-0">
        <Newspaper className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mb-1">{source} · {time}</p>
        <p className="text-sm text-muted-foreground mb-2">{summary}</p>
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

// Component for Alert items
function AlertItem({ symbol, condition, price, status }: {
  symbol: string;
  condition: 'above' | 'below';
  price: string;
  status: 'pending' | 'triggered';
}) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-zinc-800/50 transition-colors">
      <div>
        <p className="font-medium">{symbol}</p>
        <p className="text-xs text-muted-foreground">
          {condition === 'above' ? 'Above' : 'Below'} ${price}
        </p>
      </div>
      <div>
        {status === 'pending' ? (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-none">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none">
            Triggered
          </Badge>
        )}
      </div>
    </div>
  )
}

