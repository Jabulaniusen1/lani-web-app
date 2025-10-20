"use client"

import {
  User,
  LogOut,
  Settings,
  Heart,
  CreditCard,
  HelpCircle,
  FileText,
  LogIn,
  Moon,
  ChevronRight,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logging out...")
  }

  const handleSignInAsRider = () => {
    // Handle rider sign in
    console.log("Signing in as rider...")
  }

  if (showSettings) {
    return (
      <div className="flex-1 flex flex-col pb-24">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 flex items-center justify-between">
          <button onClick={() => setShowSettings(false)} className="text-primary-foreground hover:opacity-80">
            ←
          </button>
          <h1 className="text-2xl font-bold flex-1 text-center">Settings</h1>
          <div className="w-6" />
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Dark Mode */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-primary" />
                <span className="font-medium">Dark mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </Card>

          {/* Account Settings */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Account</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-medium">Edit Profile</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="font-medium">Payment Methods</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Preferences</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="font-medium">Favorites</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-primary" />
                  <span className="font-medium">Notifications</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Support</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Help & Support</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-medium">Privacy Policy</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Danger Zone</h3>
            <div className="space-y-2">
              <button
                onClick={handleSignInAsRider}
                className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LogIn className="w-5 h-5 text-primary" />
                  <span className="font-medium">Sign in as a rider</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-destructive/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-destructive" />
                  <span className="font-medium text-destructive">Log out</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* User Info Card */}
        <Card className="p-6 mb-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-1">Annie Davies</h2>
          <p className="text-muted-foreground mb-4">annie@example.com</p>
          <button className="text-primary font-semibold text-sm hover:underline">Edit profile &gt;</button>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-primary" />
              <span className="font-medium">Orders</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-primary" />
              <span className="font-medium">Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-primary" />
              <span className="font-medium">Payment method</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span className="font-medium">Help</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-medium">Privacy policy</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={handleSignInAsRider}
            className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogIn className="w-5 h-5 text-primary" />
              <span className="font-medium">Sign in as a rider</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 bg-card rounded-lg hover:bg-destructive/10 transition-colors text-destructive"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log out</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
