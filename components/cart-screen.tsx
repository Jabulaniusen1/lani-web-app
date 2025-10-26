"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCartStore } from "@/store/cartStore"

interface CartScreenProps {
  onViewCart?: () => void
}

export default function CartScreen({ onViewCart }: CartScreenProps) {
  const cart = useCartStore((state) => state.cart)
  const cartEmpty = cart.length === 0

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 1000
  const total = subtotal + deliveryFee

  return (
    <div className="flex-1 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </div>

      {/* Empty State */}
      {cartEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-center mb-6">
            Add some delicious food to get started!
          </p>
          <Button className="bg-primary text-primary-foreground">Start Shopping</Button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-4">
          {/* Cart Items Preview */}
          <div className="flex-1 space-y-3 mb-4">
            {cart.slice(0, 2).map((item) => (
              <Card key={item.id} className="p-3 flex gap-3">
                <div className="w-16 h-16 bg-muted rounded flex-shrink-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="text-primary font-bold text-sm">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </Card>
            ))}
            {cart.length > 2 && (
              <p className="text-sm text-muted-foreground text-center py-2">
                +{cart.length - 2} more items
              </p>
            )}
          </div>

          {/* Summary */}
          <Card className="p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-semibold">₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold text-lg">₦{total.toLocaleString()}</span>
            </div>
            <Button
              onClick={onViewCart}
              className="w-full bg-primary text-primary-foreground"
            >
              View Cart & Checkout
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
