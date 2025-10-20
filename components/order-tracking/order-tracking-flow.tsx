"use client"

import { useState } from "react"
import OrderSuccess from "./order-success"
import LiveTracking from "./live-tracking"

type TrackingStep = "success" | "tracking"

interface OrderTrackingFlowProps {
  onClose: () => void
}

export default function OrderTrackingFlow({ onClose }: OrderTrackingFlowProps) {
  const [currentStep, setCurrentStep] = useState<TrackingStep>("success")

  const handleTrackOrder = () => {
    setCurrentStep("tracking")
  }

  const handleBack = () => {
    setCurrentStep("success")
  }

  return (
    <>
      {currentStep === "success" && <OrderSuccess onTrackOrder={handleTrackOrder} />}
      {currentStep === "tracking" && <LiveTracking onBack={handleBack} />}
    </>
  )
}
