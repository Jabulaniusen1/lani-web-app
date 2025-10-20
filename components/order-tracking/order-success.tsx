"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface OrderSuccessProps {
  onTrackOrder: () => void
}

export default function OrderSuccess({ onTrackOrder }: OrderSuccessProps) {
  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Status Bar */}
      <div className="px-4 pt-3 pb-2 flex justify-between items-center text-xs text-muted-foreground">
        <span>9:41</span>
        <div className="flex gap-1">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Celebration Icon */}
        <div className="mb-8 relative">
          <div className="text-6xl animate-bounce">
            <Sparkles className="w-16 h-16 text-primary" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-foreground mb-3 text-center">Order Successful!</h1>
        <p className="text-muted-foreground text-center mb-2">Your food is on its way</p>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Thank you for your order! You can track your order with the button below.
        </p>

        {/* Delivery Time */}
        <div className="bg-muted rounded-lg px-6 py-4 mb-12 w-full text-center">
          <p className="text-sm text-muted-foreground mb-1">Estimated Delivery time</p>
          <p className="text-2xl font-bold text-foreground">20 minutes</p>
        </div>

        {/* Button */}
        <Button
          onClick={onTrackOrder}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-lg"
        >
          Track my order
        </Button>
      </div>
    </div>
  )
}
