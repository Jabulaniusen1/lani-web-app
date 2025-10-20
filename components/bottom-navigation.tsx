"use client"

import { Home, Search, Clock, ShoppingCart, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  activeTab: "home" | "search" | "history" | "cart" | "profile"
  onTabChange: (tab: "home" | "search" | "history" | "cart" | "profile") => void
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "search" as const, label: "Search", icon: Search },
    { id: "history" as const, label: "History", icon: Clock },
    { id: "cart" as const, label: "Cart", icon: ShoppingCart },
    { id: "profile" as const, label: "Profile", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
