"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  restaurantId: string
}

export interface Restaurant {
  id: string
  name: string
  image: string
  rating: number
  reviews: number
  deliveryTime: string
  location: string
  phone: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  ingredients?: string[]
  allergens?: string[]
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "preparing" | "on-the-way" | "delivered"
  estimatedTime: number
  deliveryAddress: string
  driverName: string
  driverRating: number
  driverImage: string
}

interface AppContextType {
  cart: CartItem[]
  selectedRestaurant: Restaurant | null
  selectedMenuItem: MenuItem | null
  currentOrder: Order | null
  deliveryAddress: { name: string; phone: string; address: string } | null

  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateCartItemQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  setSelectedRestaurant: (restaurant: Restaurant | null) => void
  setSelectedMenuItem: (item: MenuItem | null) => void
  setCurrentOrder: (order: Order | null) => void
  setDeliveryAddress: (address: { name: string; phone: string; address: string } | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [deliveryAddress, setDeliveryAddress] = useState<{ name: string; phone: string; address: string } | null>(null)

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem,
        )
      }
      return [...prevCart, item]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCart((prevCart) => prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        selectedRestaurant,
        selectedMenuItem,
        currentOrder,
        deliveryAddress,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        setSelectedRestaurant,
        setSelectedMenuItem,
        setCurrentOrder,
        setDeliveryAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
