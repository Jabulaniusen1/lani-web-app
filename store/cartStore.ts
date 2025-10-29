import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { useAuthStore } from "./authStore" 

interface CartItem {
  id: string
  name: string
  image?: string
  price: number
  quantity: number
}

interface CartStore {
  cart: CartItem[]
  loading: boolean
  addToCart: (item: CartItem) => Promise<void>
  removeFromCart: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  fetchCart: () => Promise<void>
  getTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      loading: false,

      fetchCart: async () => {
        const user = useAuthStore.getState().user
        if (!user) return

        set({ loading: true })
        try {
          const cartRef = doc(db, "carts", user.uid)
          const snapshot = await getDoc(cartRef)
          if (snapshot.exists()) {
            set({ cart: snapshot.data().items || [] })
          }
        } catch (err) {
          console.error("Error fetching cart:", err)
        } finally {
          set({ loading: false })
        }
      },

      addToCart: async (item) => {
        const user = useAuthStore.getState().user
        if (!user) return

        const existing = get().cart.find((i) => i.id === item.id)
        let updatedCart: CartItem[]
        if (existing) {
          updatedCart = get().cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          )
        } else {
          updatedCart = [...get().cart, item]
        }

        set({ cart: updatedCart })
        const cartRef = doc(db, "carts", user.uid)
        await setDoc(cartRef, { userId: user.uid, items: updatedCart, updatedAt: new Date() }, { merge: true })
      },

      removeFromCart: async (id) => {
        const user = useAuthStore.getState().user
        if (!user) return

        const updatedCart = get().cart.filter((i) => i.id !== id)
        set({ cart: updatedCart })

        const cartRef = doc(db, "carts", user.uid)
        await updateDoc(cartRef, { items: updatedCart, updatedAt: new Date() })
      },

      updateQuantity: async (id, quantity) => {
        const user = useAuthStore.getState().user
        if (!user) return

        const updatedCart = get().cart.map((i) => (i.id === id ? { ...i, quantity } : i))
        set({ cart: updatedCart })

        const cartRef = doc(db, "carts", user.uid)
        await updateDoc(cartRef, { items: updatedCart, updatedAt: new Date() })
      },

      clearCart: async () => {
        const user = useAuthStore.getState().user
        if (!user) return

        set({ cart: [] })
        const cartRef = doc(db, "carts", user.uid)
        await updateDoc(cartRef, { items: [], updatedAt: new Date() })
      },

      getTotal: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
