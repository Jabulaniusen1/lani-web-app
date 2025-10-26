import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Order {
  id: string
  items: any[]
  status: "preparing" | "on the way" | "delivered"
  estimatedTime: number
  driverName: string
  driverRating: number
  driverImage?: string
}

interface OrderTrackingStore {
  currentOrder: Order | null
  setCurrentOrder: (order: Order) => void
  updateOrderStatus: (status: Order["status"], estimatedTime?: number) => void
  clearOrder: () => void
}

export const useOrderTrackingStore = create<OrderTrackingStore>()(
  persist(
    (set, get) => ({
      currentOrder: null,

      setCurrentOrder: (order) => set({ currentOrder: order }),

      updateOrderStatus: (status, estimatedTime) => {
        const existing = get().currentOrder
        if (!existing) return
        set({
          currentOrder: {
            ...existing,
            status,
            estimatedTime: estimatedTime ?? existing.estimatedTime,
          },
        })
      },

      clearOrder: () => set({ currentOrder: null }),
    }),
    {
      name: "order-tracking-storage", // persists to localStorage
    }
  )
)
