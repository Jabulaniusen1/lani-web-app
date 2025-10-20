"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SignUpFormProps {
  onNext: (email: string, phone: string) => void
  onSwitchToLogin: () => void
}

export default function SignUpForm({ onNext, onSwitchToLogin }: SignUpFormProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [emailError, setEmailError] = useState("")

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  const handleContinue = () => {
    if (!fullName.trim()) {
      return
    }
    if (!email.trim() || !validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }
    if (!phone.trim()) {
      return
    }
    setEmailError("")
    onNext(email, phone)
  }

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
          <h1 className="text-2xl font-bold text-foreground mb-1">Let's get started</h1>
          <p className="text-sm text-muted-foreground mb-8">Let's know your full name*</p>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Full name here"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-12 bg-white border-muted rounded-lg"
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError("")
                }}
                className="h-12 bg-white border-muted rounded-lg"
              />
              {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}
            </div>

            <div>
              <Input
                type="tel"
                placeholder="+234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 bg-white border-muted rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleContinue}
            disabled={!fullName.trim() || !email.trim() || !phone.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-lg disabled:opacity-50"
          >
            Continue
          </Button>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">Already have an account? </span>
            <button onClick={onSwitchToLogin} className="text-sm text-primary font-semibold hover:underline">
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
