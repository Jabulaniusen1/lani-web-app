"use client"

import { Phone, MessageCircle, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface LiveTrackingProps {
  onBack: () => void
}

export default function LiveTracking({ onBack }: LiveTrackingProps) {
  return (
    <div className="flex-1 flex flex-col bg-background pb-24">
      {/* Status Bar */}
      <div className="px-4 pt-3 pb-2 flex justify-between items-center text-xs text-muted-foreground sticky top-0 z-10 bg-background">
        <span>9:41</span>
        <div className="flex gap-1">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h1 className="text-lg font-bold">Order Tracking</h1>
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
          ✕
        </button>
      </div>

      {/* Map Container */}
      <div className="h-64 bg-gradient-to-b from-green-100 to-green-50 relative overflow-hidden flex items-center justify-center">
        {/* Simplified Map */}
        <div className="w-full h-full relative">
          <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            {/* Map background */}
            <rect width="400" height="300" fill="#e8f5e9" />

            {/* Roads */}
            <line x1="0" y1="100" x2="400" y2="100" stroke="#9e9e9e" strokeWidth="3" />
            <line x1="150" y1="0" x2="150" y2="300" stroke="#9e9e9e" strokeWidth="3" />

            {/* Road labels */}
            <text x="20" y="90" fontSize="12" fill="#666">
              A342
            </text>

            {/* Location names */}
            <text x="200" y="40" fontSize="14" fontWeight="bold" fill="#333">
              Uyo Itam
            </text>
            <text x="50" y="150" fontSize="12" fill="#666">
              Abak
            </text>
            <text x="250" y="150" fontSize="12" fill="#666">
              Idu
            </text>
            <text x="280" y="200" fontSize="12" fill="#666">
              Nung Oku
            </text>
            <text x="200" y="250" fontSize="12" fill="#666">
              Etinan
            </text>

            {/* Delivery marker */}
            <circle cx="180" cy="120" r="8" fill="#E07856" />
            <circle cx="180" cy="120" r="12" fill="none" stroke="#E07856" strokeWidth="2" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Tracking Details */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Estimated Time */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Estimated time of arrival</p>
              <p className="text-lg font-bold">20 minutes</p>
            </div>
          </div>
        </Card>

        {/* Driver Info */}
        <Card className="p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                DU
              </div>
              <div>
                <p className="font-bold">Darlington Umoh</p>
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <Star key={i + 3} className="w-4 h-4 text-muted-foreground" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 bg-transparent">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Phone className="w-4 h-4 mr-2" />
              Call Rider
            </Button>
          </div>
        </Card>

        {/* Order Details */}
        <Card className="p-4">
          <h3 className="font-bold mb-3">Order Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-medium">#ORD-2025-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Restaurant</span>
              <span className="font-medium">Eni Stores</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Address</span>
              <span className="font-medium text-right">123 Main St, City</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
