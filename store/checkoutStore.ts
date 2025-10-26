import { create } from "zustand"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface Address {
  name: string
  phone: string
  address: string
}

interface Order {
  id: string
  items: CartItem[]
  total: number
  status: string
  estimatedTime: number
  deliveryAddress: string
  driverName: string
  driverRating: number
  driverImage: string
}

interface CheckoutStore {
  cart: CartItem[]
  deliveryAddress: Address | null
  currentOrder: Order | null

  setCart: (cart: CartItem[]) => void
  setDeliveryAddress: (address: Address) => void
  setCurrentOrder: (order: Order) => void
  clearCart: () => void
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  cart: [],
  deliveryAddress: null,
  currentOrder: null,

  setCart: (cart) => set({ cart }),
  setDeliveryAddress: (address) => set({ deliveryAddress: address }),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  clearCart: () => set({ cart: [], currentOrder: null }),
}))
