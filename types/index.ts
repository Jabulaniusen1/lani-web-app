
import { User } from "firebase/auth"
export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null

  signup: (email: string, password: string, phone: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  fetchUserProfile: (uid: string) => Promise<any>
  setUser: (user: User | null) => void
  clearError: () => void
}

export  interface Meal {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category?: string
  restaurantId: string
  restaurantName: string
  ordersCount: number
}
export interface Restaurant {
  id: string
  name: string
  coverImage?: string
  banner?: string
  rating?: number
  reviews?: number
  deliveryTime?: string
  address?: string
  phone?: string
  description?: string
  categories?: string[]
  menus?: MenuItem[]
}

export interface MenuItem {
  id: string
  name: string
  description: string
  image?: string
  price: number
  category?: string
}