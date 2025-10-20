"use client"

import { Search, MapPin, Clock, Building2, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const CATEGORIES = [
  { id: "1", name: "Burgers", icon: "🍔" },
  { id: "2", name: "Pizza", icon: "🍕" },
  { id: "3", name: "Sushi", icon: "🍣" },
  { id: "4", name: "Tacos", icon: "🌮" },
  { id: "5", name: "Desserts", icon: "🍰" },
  { id: "6", name: "Drinks", icon: "🥤" },
]

const RECENT_LOCATIONS = [
  { id: "1", name: "Town Campus, Uniuyo", location: "Uyo", type: "recent" },
  { id: "2", name: "15 Udo Umana", location: "Uyo", type: "recent" },
]

const SAVED_PLACES = [
  { id: "3", name: "Dominic Utuk Avenue, Ewet Housing Estate", type: "saved" },
  { id: "4", name: "De Choice, Plaza", type: "saved" },
]

const RESTAURANTS = [{ id: "5", name: "Roast beef & Pepper sauce", type: "restaurant" }]

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="flex-1 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Search</h1>
      </div>

      {/* Search Input */}
      <div className="p-4 bg-background border-b border-border">
        <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search restaurants or food..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowSearch(true)
            }}
            onFocus={() => setShowSearch(true)}
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
          />
          {searchQuery && (
            <button onClick={handleClearSearch} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {showSearch && !searchQuery ? (
          <>
            {/* Recent Locations */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Recent</h3>
              <div className="space-y-2">
                {RECENT_LOCATIONS.map((location) => (
                  <button
                    key={location.id}
                    className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors text-left"
                  >
                    <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{location.name}</p>
                      <p className="text-xs text-muted-foreground">{location.location}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Saved Places */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Saved Places</h3>
              <div className="space-y-2">
                {SAVED_PLACES.map((place) => (
                  <button
                    key={place.id}
                    className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors text-left"
                  >
                    <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{place.name}</p>
                    </div>
                    <span className="text-muted-foreground">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Restaurants */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Restaurants</h3>
              <div className="space-y-2">
                {RESTAURANTS.map((restaurant) => (
                  <button
                    key={restaurant.id}
                    className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors text-left"
                  >
                    <Building2 className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <p className="font-medium text-foreground">{restaurant.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Search results for "{searchQuery}"</p>
          </div>
        ) : (
          <>
            {/* Browse Categories */}
            <h2 className="text-lg font-bold mb-4">Browse Categories</h2>
            <div className="grid grid-cols-3 gap-3">
              {CATEGORIES.map((category) => (
                <Card
                  key={category.id}
                  className="p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <span className="text-sm font-semibold text-center">{category.name}</span>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
