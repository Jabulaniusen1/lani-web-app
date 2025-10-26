"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { useEffect } from "react"

interface VerificationSuccessProps {
  onComplete: () => void
}

export default function VerificationSuccess({ onComplete }: VerificationSuccessProps) {
  // Optional: auto-redirect after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background px-4 py-12">
      {/* Animated Check Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="bg-green-50 rounded-full p-6 mb-6"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500" />
      </motion.div>

      {/* Text */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-foreground mb-2 text-center"
      >
        Verification Successful
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-muted-foreground text-center mb-10"
      >
        Your phone number and email have been verified. Welcome aboard!
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm"
      >
        <Button
          onClick={onComplete}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-lg"
        >
          Go to Dashboard
        </Button>
      </motion.div>
    </div>
  )
}
