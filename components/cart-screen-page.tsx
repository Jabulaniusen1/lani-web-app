"use client"

import { ChevronLeft, Trash2, Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useCartStore } from "@/store/cartStore"

interface CartScreenPageProps {
  onBack: () => void
  onCheckout: () => void
}

export default function CartScreenPage({ onBack, onCheckout }: CartScreenPageProps) {
  const { cart, removeFromCart, updateCartItemQuantity } = useCartStore()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 1000
  const serviceCharge = 1000
  const total = subtotal + deliveryFee + serviceCharge

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col bg-background">
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="flex items-center justify-between p-4">
            <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold flex-1 text-center">Cart</h1>
            <div className="w-10" />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-background overflow-y-auto pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center">Cart</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 p-4 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-card rounded-lg p-4 border border-border flex gap-4">
            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-primary font-semibold">₦{item.price.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-muted rounded bg-primary text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-muted rounded text-destructive">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-background border-t border-border space-y-3">
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
        <button
          onClick={onCheckout}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
