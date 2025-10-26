import { create } from "zustand"
import { persist } from "zustand/middleware"

type AppScreen =
  | "splash"
  | "onboarding"
  | "auth"
  | "app"
  | "restaurant"
  | "food-item"
  | "cart-detail"
  | "checkout"
  | "tracking"

type AppTab = "home" | "search" | "history" | "cart" | "profile"

interface AppState {
  currentScreen: AppScreen
  activeTab: AppTab
  selectedRestaurant: any | null
  selectedMenuItem: any | null
  hasSeenOnboarding: boolean
  checkingAuth: boolean

  // Actions
  setScreen: (screen: AppScreen) => void
  setTab: (tab: AppTab) => void
  setRestaurant: (restaurant: any | null) => void
  setMenuItem: (item: any | null) => void
  setOnboardingSeen: (seen: boolean) => void
  setCheckingAuth: (val: boolean) => void
  resetApp: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentScreen: "splash",
      activeTab: "home",
      selectedRestaurant: null,
      selectedMenuItem: null,
      hasSeenOnboarding: false,
      checkingAuth: true,

      setScreen: (screen) => set({ currentScreen: screen }),
      setTab: (tab) => set({ activeTab: tab }),
      setRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
      setMenuItem: (item) => set({ selectedMenuItem: item }),
      setOnboardingSeen: (seen) => set({ hasSeenOnboarding: seen }),
      setCheckingAuth: (val) => set({ checkingAuth: val }),
      resetApp: () =>
        set({
          currentScreen: "splash",
          activeTab: "home",
          selectedRestaurant: null,
          selectedMenuItem: null,
          hasSeenOnboarding: false,
          checkingAuth: true,
        }),
    }),
    {
      name: "lani-eats-app", // localStorage key
    }
  )
)
