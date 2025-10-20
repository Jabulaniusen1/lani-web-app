"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface OTPVerificationProps {
  phone: string
  onVerify: () => void
}

export default function OTPVerification({ phone, onVerify }: OTPVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", ""])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const isComplete = otp.every((digit) => digit !== "")

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
      <div className="flex-1 flex flex-col px-4 py-8 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Verify your number</h1>
          <p className="text-sm text-muted-foreground mb-8">Enter OTP here</p>

          {/* OTP Inputs */}
          <div className="flex gap-3 mb-6 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border-2 border-muted rounded-lg bg-white focus:border-primary focus:outline-none"
              />
            ))}
          </div>

          {/* Resend Link */}
          <p className="text-xs text-muted-foreground text-center">
            Didn't get the code?{" "}
            <button className="text-primary font-semibold hover:underline">Click here to resend (48s)</button>
          </p>
        </div>

        {/* Button */}
        <Button
          onClick={onVerify}
          disabled={!isComplete}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-lg disabled:opacity-50"
        >
          Verify
        </Button>
      </div>
    </div>
  )
}
