"use client"

import { useEffect } from "react"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-primary">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full">
            <span className="text-5xl font-bold text-primary">🍽</span>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-bold text-white mb-2">Lani Eats</h1>
        <p className="text-white/80 text-sm">Fast. Fresh. Delicious.</p>
      </div>
    </div>
  )
}
