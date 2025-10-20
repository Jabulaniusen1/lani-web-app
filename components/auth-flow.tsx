"use client"

import { useState } from "react"
import SignUpForm from "@/components/auth/sign-up-form"
import LoginForm from "@/components/auth/login-form"
import OTPVerification from "@/components/auth/otp-verification"
import VerificationSuccess from "@/components/auth/verification-success"

type AuthStep = "login" | "signup" | "otp" | "success"

interface AuthFlowProps {
  onComplete: () => void
}

export default function AuthFlow({ onComplete }: AuthFlowProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>("login")
  const [userEmail, setUserEmail] = useState("")
  const [userPhone, setUserPhone] = useState("")

  const handleSignUpNext = (email: string, phone: string) => {
    setUserEmail(email)
    setUserPhone(phone)
    setCurrentStep("otp")
  }

  const handleOTPVerify = () => {
    setCurrentStep("success")
  }

  const handleSuccessComplete = () => {
    onComplete()
  }

  const handleSwitchToLogin = () => {
    setCurrentStep("login")
  }

  const handleSwitchToSignUp = () => {
    setCurrentStep("signup")
  }

  const handleLoginSuccess = () => {
    onComplete()
  }

  return (
    <div className="flex-1 flex flex-col">
      {currentStep === "login" && <LoginForm onSuccess={handleLoginSuccess} onSwitchToSignUp={handleSwitchToSignUp} />}
      {currentStep === "signup" && <SignUpForm onNext={handleSignUpNext} onSwitchToLogin={handleSwitchToLogin} />}
      {currentStep === "otp" && <OTPVerification phone={userPhone} onVerify={handleOTPVerify} />}
      {currentStep === "success" && <VerificationSuccess onComplete={handleSuccessComplete} />}
    </div>
  )
}
