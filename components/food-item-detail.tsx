"use client"

import { ChevronLeft, Heart, Share2, Plus, Minus, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface FoodItemDetailProps {
  onBack: () => void
  onAddToCart: (quantity: number) => void
}

export default function FoodItemDetail({ onBack, onAddToCart }: FoodItemDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({})

  const price = 2800
  const totalPrice = price * quantity

  const handleAddToCart = () => {
    onAddToCart(quantity)
  }

  const handleSelectOption = (category: string, option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: option,
    }))
  }

  return (
    <div className="flex-1 flex flex-col bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background border-b border-border p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-foreground hover:text-muted-foreground">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">Food Details</h1>
        <button className="text-foreground hover:text-muted-foreground">
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Food Image */}
        <div className="h-64 bg-muted overflow-hidden relative">
          <img src="/okro-soup.jpg" alt="Okro soup & Garri" className="w-full h-full object-cover" />
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Heart className={`w-6 h-6 ${isFavorite ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          </button>
        </div>

        {/* Food Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold mb-1">Okro soup & Garri</h2>
              <p className="text-sm text-muted-foreground">Eni Stores - Nsikak Eduok</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <Star className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold ml-1">4.5 (234 reviews)</span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            Thick okro soup with fresh fish, served hot with smooth white garri. A traditional Nigerian delicacy that's
            hearty and satisfying. Perfect for lunch or dinner.
          </p>
        </div>

        {/* Customization Options */}
        <div className="p-4 border-b border-border space-y-4">
          <h3 className="font-bold text-lg">Customize your order</h3>

          {/* Protein Option */}
          <div>
            <label className="text-sm font-semibold mb-2 block">Choose Protein</label>
            <div className="space-y-2">
              {["Fish", "Beef", "Chicken", "Shrimp"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelectOption("protein", option)}
                  className={`w-full p-3 rounded-lg border-2 transition-colors text-left font-medium ${
                    selectedOptions["protein"] === option
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted bg-background text-foreground hover:border-muted-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Spice Level */}
          <div>
            <label className="text-sm font-semibold mb-2 block">Spice Level</label>
            <div className="space-y-2">
              {["Mild", "Medium", "Hot", "Extra Hot"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelectOption("spice", option)}
                  className={`w-full p-3 rounded-lg border-2 transition-colors text-left font-medium ${
                    selectedOptions["spice"] === option
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted bg-background text-foreground hover:border-muted-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="text-sm font-semibold mb-2 block">Add-ons</label>
            <div className="space-y-2">
              {[
                { name: "Extra Garri", price: 500 },
                { name: "Extra Fish", price: 1000 },
                { name: "Plantain Chips", price: 800 },
              ].map((addon) => (
                <button
                  key={addon.name}
                  className="w-full p-3 rounded-lg border-2 border-muted bg-background hover:border-muted-foreground transition-colors text-left flex items-center justify-between"
                >
                  <span className="font-medium">{addon.name}</span>
                  <span className="text-sm text-muted-foreground">+₦{addon.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="text-sm font-semibold mb-2 block">Special Instructions</label>
            <textarea
              placeholder="Add any special requests here..."
              className="w-full p-3 rounded-lg border-2 border-muted bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Nutritional Info */}
        <div className="p-4 border-b border-border">
          <h3 className="font-bold text-lg mb-3">Nutritional Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Calories</p>
              <p className="font-bold text-lg">450</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Protein</p>
              <p className="font-bold text-lg">28g</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Carbs</p>
              <p className="font-bold text-lg">35g</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Fat</p>
              <p className="font-bold text-lg">12g</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border p-4 space-y-3">
        {/* Quantity Selector */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Quantity</span>
          <div className="flex items-center gap-3 bg-muted rounded-lg px-3 py-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-primary hover:text-primary/80"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="font-bold w-6 text-center">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="text-primary hover:text-primary/80">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-lg"
        >
          Add to Cart - ₦{totalPrice.toLocaleString()}
        </Button>
      </div>
    </div>
  )
}
