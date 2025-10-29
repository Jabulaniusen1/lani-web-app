import { useEffect, useState } from "react"
import { useRestaurantStore } from "@/store/restaurantStore"
import { useOrderStore } from "@/store/ordersStore"

import type { Meal,MenuItem } from "@/types"



export const useTopMeals = (limit: number = 5) => {
  const { restaurants, fetchAllMenus } = useRestaurantStore()
  const { orders, fetchOrders } = useOrderStore()

  const [topMeals, setTopMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)

  // 🔹 Compute top meals based on orders
  const computeTopMeals = () => {
    if (!restaurants.length || !orders.length) {
      console.log("Restaurants or orders not loaded yet")
      return
    }

    // 1️⃣ Build order count map
    const orderCountMap: Record<string, number> = {}

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!item.menuId || !item.restaurantId) return
        const key = `${item.restaurantId}-${item.menuId}`
        orderCountMap[key] = (orderCountMap[key] || 0) + (item.quantity || 0)
      })
    })

    console.log("🍴 Order count map:", orderCountMap)

    // 2️⃣ Flatten all menus into a single list and log them
    const allMeals: Meal[] = restaurants.flatMap((restaurant) => {
      const menus = restaurant.menus ?? []
      console.log(`📋 Menus for restaurant ${restaurant.name}:`, menus)
      return menus.map((menu:MenuItem) => {
        const key = `${restaurant.id}-${menu.id}`
        return {
          id: menu.id,
          name: menu.name,
          description: menu.description,
          price: menu.price,
          image: menu.image,
          category: menu.category,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          ordersCount: orderCountMap[key] || 0,
        }
      })
    })

    // 3️⃣ Sort meals by ordersCount and slice top `limit`
    const sorted = allMeals
      .sort((a, b) => b.ordersCount - a.ordersCount)
      .slice(0, limit)

    console.log(`🏆 Top ${limit} meals:`, sorted)

    setTopMeals(sorted)
  }

  useEffect(() => {
  const loadData = async () => {
    setLoading(true)
    try {
      // 1️⃣ Fetch all restaurants first
      await useRestaurantStore.getState().fetchRestaurants()

      // 2️⃣ Fetch menus for all restaurants
      await useRestaurantStore.getState().fetchAllMenus()

      // 3️⃣ Fetch all orders
      await fetchOrders()
    } catch (err) {
      console.error("Error fetching data:", err)
    } finally {
      setLoading(false)
    }
  }

  loadData()
}, [fetchAllMenus, fetchOrders])


  // 🔹 Recompute top meals whenever restaurants or orders change
  useEffect(() => {
    computeTopMeals()
  }, [restaurants, orders, limit])

  return { topMeals, loading }
}
