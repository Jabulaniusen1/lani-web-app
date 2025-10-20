"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface OnboardingFlowProps {
  onComplete: () => void
}

const onboardingSlides = [
  {
    id: 1,
    title: "No need to step out",
    description: "We bring your cravings to your doorstep in minutes",
    image: "/delivery-rider.jpg",
  },
  {
    id: 2,
    title: "Your favorite spots, all in one app",
    description: "Order from trusted kitchens, bakeries, and restaurants in Uyo",
    image: "/delivery-person-with-food.jpg",
  },
  {
    id: 3,
    title: "Safe, Simple & Affordable",
    description: "Track your order in real time you insecurely, and enjoy fast delivery at pocket-friendly prices",
    image: "/map-tracking-delivery.jpg",
  },
  {
    id: 4,
    title: "Ready to chow?",
    description: "Let's get you something delicious",
    image: "/food-delivery-package.jpg",
  },
]

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const slide = onboardingSlides[currentSlide]

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
      <div className="flex-1 flex flex-col px-4 py-8">
        <div className="rounded-3xl h-64 mb-8 flex items-center justify-center overflow-hidden bg-muted">
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
        </div>

        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">{slide.title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{slide.description}</p>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {onboardingSlides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? "w-2 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-6 flex gap-3 items-center">
        <button onClick={handleSkip} className="flex-1 py-3 text-primary font-semibold text-center">
          Skip
        </button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-lg"
        >
          {currentSlide === onboardingSlides.length - 1 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  )
}
