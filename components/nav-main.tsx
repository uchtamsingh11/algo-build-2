"use client"

import React from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  isDivider?: boolean
  hasActiveChild?: boolean
  items?: {
    title: string
    url: string
  }[]
}

export function NavMain({
  items,
}: {
  items: NavItem[]
}) {
  const pathname = usePathname();

  // Helper function to check if a URL is active (exact match only)
  const isActiveUrl = (url: string) => {
    if (url === "#") return false;
    if (url === "/dashboard" && pathname === "/dashboard") return true;
    if (url !== "/dashboard" && pathname === url) return true;
    return false;
  };
  
  // Helper function to check if a path is contained within the current URL
  const isContainedInPath = (url: string) => {
    if (url === "#") return false;
    if (url === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(url) && pathname !== url;
  };

  // Add divider after Dashboard, My Developer and Referral items
  const itemsWithDividers = items.map((item) => {
    const needsDivider = ["Dashboard", "My Developer", "Referral"].includes(item.title);
    
    // Check if this item is active (exact URL match)
    const isItemActive = isActiveUrl(item.url);
    
    // Check if any submenu item is active - used only for menu expansion, not highlighting
    const hasActiveSubItem = item.items?.some(subItem => isActiveUrl(subItem.url));
    
    return {
      ...item,
      isDivider: needsDivider,
      isActive: isItemActive, // Only active if exact URL match
      hasActiveChild: hasActiveSubItem // Track separately for menu expansion
    };
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {itemsWithDividers.map((item, index) => (
          <React.Fragment key={item.title}>
            {item.items ? (
              <Collapsible
                asChild
                defaultOpen={item.isActive || item.hasActiveChild} // Open menu if any child is active
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      tooltip={item.title}
                      className={cn(
                        item.isActive && "bg-accent text-accent-foreground" // Only highlight if exact match
                      )}
                    >
                      {item.icon && <item.icon className={cn(
                        item.isActive ? "text-accent-foreground" : "text-muted-foreground"
                      )} />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isSubItemActive = isActiveUrl(subItem.url);
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton 
                              asChild
                              className={cn(
                                isSubItemActive && "bg-accent text-accent-foreground"
                              )}
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.title}
                  className={cn(
                    isActiveUrl(item.url) && "bg-accent text-accent-foreground"
                  )}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon className={cn(
                      isActiveUrl(item.url) ? "text-accent-foreground" : "text-muted-foreground"
                    )} />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            {item.isDivider && (
              <Separator className="my-2 mx-4" />
            )}
          </React.Fragment>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
