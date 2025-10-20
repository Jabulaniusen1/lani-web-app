"use client"

import { Star, MapPin, Clock, Phone, Share2, Heart, ChevronLeft, Plus, Minus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface RestaurantDetailProps {
  onBack: () => void
  onSelectItem: (item: MenuItem) => void
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Okro soup & Garri",
    description: "Thick okro soup with fresh fish, served hot with smooth white garri",
    price: 2800,
    image: "/okro-soup.jpg",
    category: "Soups",
  },
  {
    id: "2",
    name: "Jellof rice and beef",
    description: "Aromatic jellof rice with tender beef, dodo and fried eggs",
    price: 2500,
    image: "/jellof-rice.jpg",
    category: "Rice Dishes",
  },
  {
    id: "3",
    name: "Shawarma & Coke",
    description: "Spicy beef or chicken shawarma with fresh vegetables and sauce",
    price: 1500,
    image: "/shawarma.jpg",
    category: "Wraps",
  },
  {
    id: "4",
    name: "Fried Rice & Plantain",
    description: "Fluffy fried rice with golden fried plantain and protein of choice",
    price: 2200,
    image: "/fried-rice.png",
    category: "Rice Dishes",
  },
]

const CATEGORIES = ["All", "Soups", "Rice Dishes", "Wraps", "Desserts", "Drinks"]

export default function RestaurantDetail({ onBack, onSelectItem }: RestaurantDetailProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({})

  const filteredItems =
    selectedCategory === "All" ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === selectedCategory)

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }))
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const newCart = { ...prev }
      if (newCart[id] > 1) {
        newCart[id]--
      } else {
        delete newCart[id]
      }
      return newCart
    })
  }

  return (
    <div className="flex-1 flex flex-col bg-background pb-24">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-20 bg-background border-b border-border p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-foreground hover:text-muted-foreground">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">Eni Stores</h1>
        <button className="text-foreground hover:text-muted-foreground">
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Restaurant Image */}
      <div className="h-48 bg-muted overflow-hidden">
        <img src="/restaurant-storefront.png" alt="Eni Stores" className="w-full h-full object-cover" />
      </div>

      {/* Restaurant Info */}
      <div className="p-4 border-b border-border">
        <h2 className="text-2xl font-bold mb-2">Eni Stores - Nsikak Eduok</h2>

        {/* Rating and Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <Star className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold ml-1">4.5 (1,234 reviews)</span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>20-30 min delivery</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Nsikak Eduok, Uyo</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>+234 800 123 4567</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1 border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
          >
            <Heart className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        {/* Category Filter */}
        <div className="sticky top-0 bg-background border-b border-border p-4 overflow-x-auto">
          <div className="flex gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex gap-3 p-3">
                {/* Image */}
                <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-sm">{item.name}</h3>
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`${favorites.includes(item.id) ? "text-primary" : "text-muted-foreground"}`}
                      >
                        <Heart className="w-4 h-4" fill={favorites.includes(item.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>

                  {/* Price and Add Button */}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">₦{item.price.toLocaleString()}</span>
                    {cartItems[item.id] ? (
                      <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-2 py-1">
                        <button onClick={() => removeFromCart(item.id)} className="text-primary hover:text-primary/80">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-semibold text-primary w-4 text-center">{cartItems[item.id]}</span>
                        <button onClick={() => addToCart(item)} className="text-primary hover:text-primary/80">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => addToCart(item)}
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground h-8"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
