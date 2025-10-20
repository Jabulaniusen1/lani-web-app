"use client"

import { useState } from "react"
import { ChevronLeft, Minus, Plus } from "lucide-react"
import { useAppContext, type MenuItem } from "@/context/app-context"
import Image from "next/image"

interface FoodItemDetailPageProps {
  item: MenuItem
  onBack: () => void
  onAddToCart: () => void
}

export default function FoodItemDetailPage({ item, onBack, onAddToCart }: FoodItemDetailPageProps) {
  const { addToCart } = useAppContext()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image,
      restaurantId: "1",
    })
    onAddToCart()
  }

  return (
    <div className="flex-1 flex flex-col bg-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center">Food Details</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Food Image */}
      <div className="relative w-full h-64 bg-muted">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>

      {/* Food Info */}
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
          <p className="text-muted-foreground mb-3">{item.description}</p>
          <p className="text-2xl font-bold text-primary">₦{item.price.toLocaleString()}</p>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 bg-muted p-3 rounded-lg">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-background rounded-lg">
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold flex-1 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 hover:bg-background rounded-lg bg-primary text-white rounded-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Ingredients */}
        {item.ingredients && item.ingredients.length > 0 && (
          <div>
            <h3 className="font-bold mb-2">Ingredients:</h3>
            <p className="text-muted-foreground">{item.ingredients.join(", ")}</p>
          </div>
        )}

        {/* Allergen Info */}
        {item.allergens && (
          <div>
            <h3 className="font-bold mb-2">Allergen Info:</h3>
            <p className="text-muted-foreground">{item.allergens}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-background border-t border-border space-y-2">
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90"
        >
          Add to Cart - ₦{(item.price * quantity).toLocaleString()}
        </button>
      </div>
    </div>
  )
}
