"use client"

import { useState } from "react"
import CheckoutScreen from "./checkout-screen"
import OrderSuccess from "../order-tracking/order-success"

type CheckoutStep = "checkout" | "success"

interface CheckoutFlowProps {
  onClose: () => void
}

export default function CheckoutFlow({ onClose }: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("checkout")

  const handlePlaceOrder = () => {
    setCurrentStep("success")
  }

  const handleTrackOrder = () => {
    onClose()
  }

  return (
    <>
      {currentStep === "checkout" && <CheckoutScreen onBack={onClose} onPlaceOrder={handlePlaceOrder} />}
      {currentStep === "success" && <OrderSuccess onTrackOrder={handleTrackOrder} />}
    </>
  )
}
