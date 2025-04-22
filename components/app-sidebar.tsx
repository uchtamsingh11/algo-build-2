"use client"

import * as React from "react"
import {
  BarChartBig,
  BookOpen,
  Bot,
  CircleDollarSign,
  Command,
  Copy,
  DollarSign,
  ExternalLink,
  FileJson,
  Frame,
  GalleryVerticalEnd,
  HelpCircle,
  History,
  Key,
  LineChart,
  Map,
  PieChart,
  ScrollText,
  Search,
  Settings2,
  Share2,
  ShoppingBag,
  SquareTerminal,
  Tag,
  Webhook
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "AlgoZ Tech",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Command,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
      isActive: true,
    },
    {
      title: "Charts",
      url: "/charts",
      icon: BarChartBig,
    },
    {
      title: "Broker Auth",
      url: "/broker-auth",
      icon: Key,
    },
    {
      title: "TradingView",
      url: "#",
      icon: LineChart,
      items: [
        {
          title: "Manage",
          url: "/tradingview/manage",
        },
        {
          title: "Webhook URL",
          url: "/tradingview/webhook-url",
        },
        {
          title: "JSON",
          url: "/tradingview/json",
        },
        {
          title: "Symbol",
          url: "/tradingview/symbol",
        },
        {
          title: "Trade Logs",
          url: "/tradingview/trade-logs",
        },
      ],
    },
    {
      title: "Scalping Tool",
      url: "#",
      icon: BarChartBig,
      items: [
        {
          title: "Manage",
          url: "/scalping-tool/manage",
        },
      ],
    },
    {
      title: "Copy Trading",
      url: "#",
      icon: Copy,
      items: [
        {
          title: "Manage",
          url: "/copy-trading/manage",
        },
      ],
    },
    {
      title: "Marketplace",
      url: "/marketplace",
      icon: ShoppingBag,
    },
    {
      title: "Backtest",
      url: "/backtest",
      icon: History,
    },
    {
      title: "Optimization",
      url: "/optimization",
      icon: Settings2,
    },
    {
      title: "My Developer",
      url: "/my-developer",
      icon: Bot,
    },
    {
      title: "Pricing",
      url: "/pricing",
      icon: DollarSign,
    },
    {
      title: "Referral",
      url: "/referral",
      icon: Share2,
    },
    {
      title: "Support",
      url: "/support",
      icon: HelpCircle,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
