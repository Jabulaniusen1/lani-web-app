import { create } from "zustand"

interface Restaurant {
  id: string
  name: string
  image?: string
  rating?: number
  reviews?: number
  deliveryTime?: string
  categories?: string[]
}

interface MenuItem {
  id: string
  name: string
  description: string
  image?: string
  price: number
  category?: string
}

interface RestaurantStore {
  selectedRestaurant: Restaurant | null
  selectedCategory: string
  cart: MenuItem[]

  // actions
  setSelectedRestaurant: (restaurant: Restaurant | null) => void
  setSelectedCategory: (category: string) => void
  addToCart: (item: MenuItem) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
}

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  selectedRestaurant: null,
  selectedCategory: "All",
  cart: [],

  setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),
  clearCart: () => set({ cart: [] }),
}))
