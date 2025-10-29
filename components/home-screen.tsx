"use client"

import { MapPin, Bell, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useProfileStore } from "@/store/profileStore"
import { useAuthStore } from "@/store/authStore"
import { useRestaurantStore } from "@/store/restaurantStore"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle } from "lucide-react"
import { useTopMeals } from "@/hooks/useTopMeals"

interface Meal {
  id: string
  name: string
  description: string
  price: number
  image: string
  badge?: string
}

interface HomeScreenProps {
  onSelectRestaurant?: (restaurant: any) => void
}

export default function HomeScreen({ onSelectRestaurant }: HomeScreenProps) {
  const [restaurantScroll, setRestaurantScroll] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const { profile, fetchProfile } = useProfileStore()
  const user = useAuthStore((state) => state.user)
  const { restaurants, fetchRestaurants } = useRestaurantStore()
  const { topMeals, loading } = useTopMeals(5)

  useEffect(() => {
    if (user?.uid) fetchProfile().catch(console.error)
  }, [user, fetchProfile])

  useEffect(() => {
    fetchRestaurants().catch(console.error)
  }, [fetchRestaurants])

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      const newScroll =
        direction === "left" ? Math.max(0, restaurantScroll - scrollAmount) : restaurantScroll + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      })
      setRestaurantScroll(newScroll)
    }
  }



  return (
    <div className="flex-1 flex flex-col pb-24 bg-background">
      {/* Header */}
      <div className="bg-background px-4 pt-4 pb-3 sticky top-0 z-10 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Welcome, {profile?.fullName || "User"}
              </p>
              <p className="text-xs text-muted-foreground">
                {profile?.address || "No address set"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={profile?.photoURL || "/placeholder.svg"}
              alt="User"
              className="w-10 h-10 rounded-full bg-muted object-cover"
            />
            <Bell className="w-5 h-5 text-foreground" />
          </div>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex gap-3 bg-background rounded-2xl overflow-hidden border border-border">
          <div className="w-24 h-24 shrink-0 bg-muted overflow-hidden">
            <img src="/featured-food.jpg" alt="Featured" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 bg-primary text-primary-foreground p-4 flex flex-col justify-center rounded-r-2xl">
            <p className="text-sm font-semibold">What are you eating today?</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Popular Restaurants */}
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Popular Restaurants</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleScroll("left")}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div ref={scrollContainerRef} className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x scroll-smooth">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="shrink-0 w-32 snap-start cursor-pointer group"
                onClick={() => onSelectRestaurant?.(restaurant)}
              >
                <div className="w-full h-32 bg-muted rounded-2xl overflow-hidden mb-2 group-hover:opacity-80 transition-opacity">
                  <img
                    src={restaurant.
                      coverImage || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-semibold text-foreground text-center line-clamp-2">{restaurant.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Meals */}
        <div className="px-4 pb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Top Meals</h2>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner className="w-6 h-6 text-primary" />
            </div>
          ) : topMeals.length === 0 ? (
            <div className="flex items-center justify-center py-6 text-muted-foreground">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>No top meals available.</span>
            </div>
          ) : (
            <div className="space-y-4">
              {topMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex gap-3 bg-background border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-24 h-24 shrink-0 bg-muted overflow-hidden relative">
                    <img
                      src={meal.image || "/placeholder.svg"}
                      alt={meal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-foreground">{meal.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{meal.description}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 italic">
                        From {meal.restaurantName}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">₦{meal.price.toLocaleString()}</span>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                          Order now
                        </button>
                        <button className="px-3 py-1 border border-primary text-primary text-xs font-semibold rounded-lg hover:bg-primary/10 transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
