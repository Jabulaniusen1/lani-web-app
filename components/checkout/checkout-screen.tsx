"use client"

import { ChevronLeft, MapPin, Clock, Trash2, Edit2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface CheckoutScreenProps {
  onBack: () => void
  onPlaceOrder: () => void
}

interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
}

const CART_ITEMS: CartItem[] = [
  { id: "1", name: "Okro soup & Garri", quantity: 1, price: 2800 },
  { id: "2", name: "Jellof rice and beef", quantity: 2, price: 2500 },
]

export default function CheckoutScreen({ onBack, onPlaceOrder }: CheckoutScreenProps) {
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [cartItems, setCartItems] = useState<CartItem[]>(CART_ITEMS)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 500
  const serviceFee = Math.round(subtotal * 0.05)
  const total = subtotal + deliveryFee + serviceFee

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <div className="flex-1 flex flex-col bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background border-b border-border p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-foreground hover:text-muted-foreground">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">Checkout</h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Delivery Address */}
        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Delivery to</p>
                <p className="font-bold">Home</p>
                <p className="text-sm text-muted-foreground">Ewet Housing Estate, Uyo</p>
              </div>
            </div>
            <button className="text-primary hover:text-primary/80">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
          <button className="w-full mt-3 p-2 border-2 border-dashed border-muted rounded-lg text-primary font-semibold text-sm hover:border-primary transition-colors">
            + Add New Address
          </button>
        </Card>

        {/* Delivery Time */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Estimated delivery</p>
              <p className="font-bold">20-30 minutes</p>
            </div>
          </div>
        </Card>

        {/* Cart Items */}
        <div>
          <h3 className="font-bold text-lg mb-3">Order Summary</h3>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">₦{(item.price * item.quantity).toLocaleString()}</span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Promo Code */}
        <Card className="p-4">
          <input
            type="text"
            placeholder="Enter promo code"
            className="w-full px-3 py-2 rounded-lg bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </Card>

        {/* Payment Method */}
        <div>
          <h3 className="font-bold text-lg mb-3">Payment Method</h3>
          <div className="space-y-2">
            {[
              { id: "card", label: "Credit/Debit Card", icon: "💳" },
              { id: "wallet", label: "Wallet", icon: "👛" },
              { id: "bank", label: "Bank Transfer", icon: "🏦" },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full p-4 rounded-lg border-2 transition-colors text-left flex items-center gap-3 ${
                  selectedPayment === method.id
                    ? "border-primary bg-primary/10"
                    : "border-muted bg-background hover:border-muted-foreground"
                }`}
              >
                <span className="text-2xl">{method.icon}</span>
                <span className="font-semibold">{method.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <Card className="p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className="font-semibold">₦{deliveryFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service Fee</span>
            <span className="font-semibold">₦{serviceFee.toLocaleString()}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold text-lg text-primary">₦{total.toLocaleString()}</span>
          </div>
        </Card>

        {/* Terms */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" id="terms" className="mt-1" defaultChecked />
          <label htmlFor="terms">
            I agree to the terms and conditions and understand that my order will be processed according to the
            restaurant's policies.
          </label>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border p-4">
        <Button
          onClick={onPlaceOrder}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-lg"
        >
          Place Order - ₦{total.toLocaleString()}
        </Button>
      </div>
    </div>
  )
}
