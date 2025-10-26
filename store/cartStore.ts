import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  id: string
  name: string
  image?: string
  price: number
  quantity: number
}

interface CartStore {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const existing = get().cart.find((i) => i.id === item.id)
        if (existing) {
          // Increase quantity if already in cart
          set({
            cart: get().cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          })
        } else {
          set({ cart: [...get().cart, item] })
        }
      },

      removeFromCart: (id) => set({ cart: get().cart.filter((i) => i.id !== id) }),

      updateQuantity: (id, quantity) =>
        set({
          cart: get().cart.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // stored in localStorage
    }
  )
)
