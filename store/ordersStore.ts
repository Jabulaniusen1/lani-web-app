import { create } from "zustand"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export interface OrderItem {
  menuId: string
  restaurantId: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  userId: string
  restaurantId: string
  items: OrderItem[]
  total: number
  status: string
  createdAt: string
}

interface OrderStore {
  orders: Order[]
  loading: boolean
  error: string | null

  fetchOrders: () => Promise<Order[]>
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null })
    try {
      const snapshot = await getDocs(collection(db, "orders"))
      const ordersData: Order[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Order, "id">),
      }))
      set({ orders: ordersData, loading: false })
      return ordersData
    } catch (err: any) {
      console.error("Error fetching orders:", err)
      set({ error: err.message, loading: false })
      return []
    }
  },
}))
