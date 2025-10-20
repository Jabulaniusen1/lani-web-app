"use client"

import { ChevronLeft, MessageCircle, Phone, Clock } from "lucide-react"
import { useAppContext } from "@/context/app-context"
import Image from "next/image"

interface OrderTrackingPageProps {
  onBack: () => void
}

export default function OrderTrackingPage({ onBack }: OrderTrackingPageProps) {
  const { currentOrder } = useAppContext()

  if (!currentOrder) return null

  return (
    <div className="flex-1 flex flex-col bg-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center">Order Tracking</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Map */}
      <div className="relative w-full h-64 bg-muted">
        <Image src="/delivery-map-with-rider-location.jpg" alt="Delivery map" fill className="object-cover" />
      </div>

      {/* Tracking Info */}
      <div className="p-4 space-y-4">
        {/* Estimated Time */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="font-bold">Estimated time of arrival</h3>
          </div>
          <p className="text-lg font-semibold">{currentOrder.estimatedTime} minutes</p>
        </div>

        {/* Driver Info */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
              <Image src={currentOrder.driverImage || "/placeholder.svg"} alt="Driver" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{currentOrder.driverName}</h3>
              <div className="flex items-center gap-1">
                {[...Array(currentOrder.driverRating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
                {[...Array(5 - currentOrder.driverRating)].map((_, i) => (
                  <span key={i} className="text-gray-300">
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">
              <MessageCircle className="w-5 h-5" />
              Message
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90">
              <Phone className="w-5 h-5" />
              Call Rider
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
