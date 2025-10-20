"use client"

import { useState } from "react"
import { ChevronLeft, Edit2 } from "lucide-react"
import { useAppContext } from "@/context/app-context"
import { DUMMY_USER } from "@/lib/dummy-data"

interface CheckoutScreenPageProps {
  onBack: () => void
  onPlaceOrder: () => void
}

export default function CheckoutScreenPage({ onBack, onPlaceOrder }: CheckoutScreenPageProps) {
  const { cart, setDeliveryAddress, setCurrentOrder } = useAppContext()
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [formData, setFormData] = useState({
    fullName: DUMMY_USER.name,
    phone: DUMMY_USER.phone,
    address: DUMMY_USER.savedAddresses[0]?.address || "",
  })

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 1000
  const serviceCharge = 1000
  const total = subtotal + deliveryFee + serviceCharge

  const handleAddAddress = () => {
    if (formData.fullName && formData.phone && formData.address) {
      setDeliveryAddress({
        name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
      })
      setShowAddressForm(false)
    }
  }

  const handlePlaceOrder = () => {
    if (formData.fullName && formData.phone && formData.address) {
      setCurrentOrder({
        id: `ORD-${Date.now()}`,
        items: cart,
        total,
        status: "confirmed",
        estimatedTime: 20,
        deliveryAddress: formData.address,
        driverName: "Darlington Umoh",
        driverRating: 3,
        driverImage: "/user-avatar.jpg",
      })
      onPlaceOrder()
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center">Checkout</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Delivery Address */}
        {!showAddressForm && formData.fullName && (
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg">Home</h3>
              <button onClick={() => setShowAddressForm(true)} className="p-2 hover:bg-muted rounded">
                <Edit2 className="w-5 h-5 text-primary" />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">📞</span>
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">📍</span>
                <span>{formData.address}</span>
              </div>
            </div>
          </div>
        )}

        {/* Address Form */}
        {showAddressForm && (
          <div className="bg-card rounded-lg p-4 border border-border space-y-4">
            <h3 className="font-bold text-lg">Add a New Address</h3>
            <div>
              <label className="block text-sm font-medium mb-2">Full name</label>
              <input
                type="text"
                placeholder="Full name here"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone number</label>
              <input
                type="tel"
                placeholder="+234 *******"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">House Address</label>
              <input
                type="text"
                placeholder="Road, Area, Building name"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none"
              />
            </div>
            <button
              onClick={handleAddAddress}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90"
            >
              Save Address
            </button>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-card rounded-lg p-4 border border-border space-y-3">
          <h3 className="font-bold">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery fee:</span>
              <span className="font-semibold">₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service charge:</span>
              <span className="font-semibold">₦{serviceCharge.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-background border-t border-border">
        <button
          onClick={handlePlaceOrder}
          disabled={!formData.fullName || !formData.phone || !formData.address}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
