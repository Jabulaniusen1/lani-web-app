import { create } from "zustand"
import { db } from "@/lib/firebase"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import type { Restaurant, MenuItem } from "@/types"



interface RestaurantStore {
  restaurants: Restaurant[]
  selectedRestaurant: Restaurant | null
  selectedCategory: string
  cart: MenuItem[]
  loading: boolean
  error: string | null

  fetchRestaurants: () => Promise<void>
  fetchRestaurantProfile: (restaurantId: string) => Promise<void>
  fetchRestaurantMenu: (restaurantId: string) => Promise<void>
  fetchAllMenus: () => Promise<Restaurant[]>

  setSelectedRestaurant: (restaurant: Restaurant | null) => void
  setSelectedCategory: (category: string) => void
  addToCart: (item: MenuItem) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
}

export const useRestaurantStore = create<RestaurantStore>((set, get) => ({
  restaurants: [],
  selectedRestaurant: null,
  selectedCategory: "All",
  cart: [],
  loading: false,
  error: null,

  // 🔹 Fetch all restaurants (main collection)
  fetchRestaurants: async () => {
    set({ loading: true, error: null })
    try {
      const snapshot = await getDocs(collection(db, "restaurants"))
      const restaurantsData: Restaurant[] = snapshot.docs.map((docSnap) => ({
        ...(docSnap.data() as Restaurant),
        id: docSnap.id,
      }))
      set({ restaurants: restaurantsData, loading: false })
    } catch (err: any) {
      console.error("Error fetching restaurants:", err)
      set({ error: err.message, loading: false })
    }
  },

  // 🔹 Fetch restaurant profile (now reads directly from /restaurants)
  fetchRestaurantProfile: async (restaurantId) => {
    set({ loading: true, error: null })
    try {
      const docRef = doc(db, "restaurants", restaurantId)
      const snapshot = await getDoc(docRef)

      if (!snapshot.exists()) throw new Error("Restaurant not found")

      const data = snapshot.data() as Omit<Restaurant, "id">
      const restaurantData: Restaurant = { id: snapshot.id, ...data }

      set((state) => ({
        restaurants: state.restaurants.map((r) =>
          r.id === restaurantId ? { ...r, ...restaurantData } : r
        ),
        selectedRestaurant: restaurantData,
        loading: false,
      }))
    } catch (err: any) {
      console.error("Error fetching restaurant profile:", err)
      set({ error: err.message, loading: false })
    }
  },

  // 🔹 Fetch menu for a specific restaurant
  fetchRestaurantMenu: async (restaurantId) => {
  set({ loading: true, error: null })
  try {
    const menuSnapshot = await getDocs(
      collection(db, "restaurants", restaurantId, "menus")
    )
    const menuItems: MenuItem[] = menuSnapshot.docs.map((docSnap) => ({
      ...(docSnap.data() as MenuItem),
      id: docSnap.id,
    }))

    console.log(`✅ Fetched ${menuItems.length} menu items for restaurant: ${restaurantId}`)
    console.table(menuItems.slice(0, 5)) // log first 5 items for preview

    set((state) => ({
      restaurants: state.restaurants.map((r) =>
        r.id === restaurantId ? { ...r, menus: menuItems } : r
      ),
      selectedRestaurant:
        state.selectedRestaurant?.id === restaurantId
          ? { ...state.selectedRestaurant, menus: menuItems }
          : state.selectedRestaurant,
      loading: false,
    }))
  } catch (err: any) {
    console.error("Error fetching restaurant menu:", err)
    set({ error: err.message, loading: false })
  }
},
  // Fetch menus for all restaurants
fetchAllMenus: async () => {
  set({ loading: true, error: null })
  try {
    const currentRestaurants = get().restaurants

    const updatedRestaurants = await Promise.all(
      currentRestaurants.map(async (r) => {
        if (!r.menus || r.menus.length === 0) {
          const menuSnapshot = await getDocs(
            collection(db, "restaurants", r.id, "menus")
          )
          const menuItems: MenuItem[] = menuSnapshot.docs.map((docSnap) => ({
            ...(docSnap.data() as MenuItem),
            id: docSnap.id,
          }))

          console.log(`✅ Fetched ${menuItems.length} menus for restaurant ${r.id} - ${r.name}`)
          console.table(menuItems.slice(0, 3)) // show first 3 items for preview

          return { ...r, menus: menuItems }
        }
        // Keep existing menus intact
        return r
      })
    )

    set({ restaurants: updatedRestaurants, loading: false })
    return updatedRestaurants
  } catch (err: any) {
    console.error("Error fetching all menus:", err)
    set({ error: err.message, loading: false })
    return []
  }
},

  // 🧩 Cart & UI actions
  setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (itemId) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id !== itemId) })),
  clearCart: () => set({ cart: [] }),
}))
