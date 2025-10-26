"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface OTPVerificationProps {
  confirmationResult: any
  onVerify: (code: string) => void
  error?: string
}

export default function OTPVerification({ confirmationResult, onVerify, error }: OTPVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState("")

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < otp.length - 1) {
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

  const handleVerify = async () => {
    const code = otp.join("").trim()
    if (code.length < otp.length) {
      setLocalError("Please enter the full 6-digit OTP")
      return
    }

    setLoading(true)
    setLocalError("")
    try {
      await onVerify(code)
    } catch (err: any) {
      console.error(err)
      setLocalError(err.message || "Verification failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const isComplete = otp.every((digit) => digit !== "")

  return (
    <div className="flex-1 flex flex-col bg-background">
    
      {/* Content */}
      <div className="flex-1 flex flex-col px-4 py-8 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Verify your number</h1>
          <p className="text-sm text-muted-foreground mb-8">Enter the 6-digit OTP sent to your phone</p>

          {/* OTP Inputs */}
          <div className="flex gap-3 mb-4 justify-center">
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

          {/* Error Messages */}
          {localError && <p className="text-xs text-destructive text-center mb-2">{localError}</p>}
          {error && <p className="text-xs text-destructive text-center mb-2">{error}</p>}

          {/* Resend Link */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            Didn’t get the code?{" "}
            <button
              className="text-primary font-semibold hover:underline disabled:opacity-50"
              disabled={loading}
              onClick={() => window.location.reload()} // basic resend behavior
            >
              Resend code
            </button>
          </p>
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={!isComplete || loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-lg disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  )
}
