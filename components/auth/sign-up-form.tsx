"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SignUpFormProps {
  onNext: (fullName: string, email: string, phone: string, password: string) => void
  onSwitchToLogin: () => void
}

export default function SignUpForm({ onNext, onSwitchToLogin }: SignUpFormProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [formError, setFormError] = useState("")
  const [loading, setLoading] = useState(false)

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  const validatePhone = (value: string) => /^\+?\d{10,15}$/.test(value)

  const handleContinue = async () => {
    setFormError("")
    setEmailError("")

    if (!fullName.trim()) {
      setFormError("Full name is required")
      return
    }

    if (!email.trim() || !validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    if (!phone.trim() || !validatePhone(phone)) {
      setFormError("Please enter a valid phone number with country code (e.g., +234...)")
      return
    }

    if (!password.trim() || password.length < 6) {
      setFormError("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    try {
      onNext(fullName, email, phone, password)
    } catch (error: any) {
      console.error(error)
      setFormError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="flex-1 flex flex-col px-4 py-8 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Let's get started</h1>
          <p className="text-sm text-muted-foreground mb-8">Please provide your details to continue</p>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Full name here"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 bg-white border-muted rounded-lg"
            />

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

            <Input
              type="tel"
              placeholder="+234..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 bg-white border-muted rounded-lg"
            />

            <Input
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-white border-muted rounded-lg"
            />

            {formError && <p className="text-xs text-destructive mt-1">{formError}</p>}
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleContinue}
            disabled={!fullName.trim() || !email.trim() || !phone.trim() || !password.trim() || loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-lg disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Continue"}
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
