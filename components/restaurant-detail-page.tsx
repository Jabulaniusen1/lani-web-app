"use client"

import { useState } from "react"
import { ChevronLeft, MessageCircle, Phone, Star } from "lucide-react"
import { useRestaurantStore } from "@/store/restaurantStore"
import { DUMMY_MENU_ITEMS } from "@/lib/dummy-data"
import Image from "next/image"

interface RestaurantDetailPageProps {
  onBack: () => void
  onSelectMenuItem: (menuItem: any) => void
}

export default function RestaurantDetailPage({ onBack, onSelectMenuItem }: RestaurantDetailPageProps) {
  const { selectedRestaurant, selectedCategory, setSelectedCategory, addToCart } = useRestaurantStore()

  if (!selectedRestaurant) return null

  const categories = selectedRestaurant.categories || ["All", "Soups", "Snacks", "Rice & Pasta"]
  const menuItems = DUMMY_MENU_ITEMS[selectedRestaurant.id as keyof typeof DUMMY_MENU_ITEMS] || []

  const filteredItems =
    selectedCategory === "All" ? menuItems : menuItems.filter((item: any) => item.category === selectedCategory)

  return (
    <div className="flex-1 flex flex-col bg-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2 hover:bg-muted rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center">{selectedRestaurant.name}</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Restaurant Image */}
      <div className="relative w-full h-48 bg-muted">
        <Image
          src={selectedRestaurant.image || "/placeholder.svg"}
          alt={selectedRestaurant.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Restaurant Info */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold mb-2">{selectedRestaurant.name}</h2>
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 fill-primary text-primary" />
          <span className="font-semibold">
            {selectedRestaurant.rating} ({selectedRestaurant.reviews.toLocaleString()} reviews)
          </span>
          <span className="text-muted-foreground">• {selectedRestaurant.deliveryTime}</span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700">
            <MessageCircle className="w-5 h-5" />
            Send message
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border-2 border-foreground text-foreground py-2 rounded-lg font-medium hover:bg-muted">
            <Phone className="w-5 h-5" />
            Call
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-3 border-b border-border overflow-x-auto">
        <div className="flex gap-2">
          {categories.map((category: string) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                selectedCategory === category ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-4 space-y-4">
        {filteredItems.map((item: any) => (
          <div key={item.id} className="bg-card rounded-lg p-4 border border-border">
            <div className="flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <p className="text-primary font-semibold">₦{item.price.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onSelectMenuItem(item)}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90"
              >
                Order now
              </button>
              <button
                onClick={() => addToCart(item)}
                className="flex-1 border-2 border-primary text-primary py-2 rounded-lg font-medium hover:bg-primary/10"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
