"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface VerificationSuccessProps {
  onComplete: () => void
}

export default function VerificationSuccess({ onComplete }: VerificationSuccessProps) {
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
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-green-50 rounded-full p-6 mb-6">
          <CheckCircle className="w-16 h-16 text-secondary" />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Verification Successful</h2>
        <p className="text-sm text-muted-foreground text-center mb-12">Your account is all set</p>

        <Button
          onClick={onComplete}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-lg"
        >
          Go to home
        </Button>
      </div>
    </div>
  )
}
