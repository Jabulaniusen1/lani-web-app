"use client"

import { useEffect } from "react"
import SplashScreen from "@/components/splash-screen"
import OnboardingFlow from "@/components/onboarding-flow"
import AuthFlow from "@/components/auth-flow"
import BottomNavigation from "@/components/bottom-navigation"
import HomeScreen from "@/components/home-screen"
import SearchScreen from "@/components/search-screen"
import CartScreen from "@/components/cart-screen"
import ProfileScreen from "@/components/profile-screen"
import OrderHistoryScreen from "@/components/order-history-screen"
import RestaurantDetailPage from "@/components/restaurant-detail-page"
import FoodItemDetailPage from "@/components/food-item-detail-page"
import CartScreenPage from "@/components/cart-screen-page"
import CheckoutScreenPage from "@/components/checkout-screen-page"
import OrderTrackingPage from "@/components/order-tracking-page"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useAppStore } from "@/store/appStore"
import { useRestaurantStore } from "@/store/restaurantStore"
import {Spinner} from "@/components/ui/spinner"

export default function AppContent() {
  const {
    currentScreen,
    activeTab,
    selectedMenuItem,
    hasSeenOnboarding,
    checkingAuth,
    setScreen,
    setTab,
    setMenuItem,
    setOnboardingSeen,
    setCheckingAuth,
  } = useAppStore()

  const {
    setSelectedRestaurant,
    fetchRestaurantProfile,
    fetchRestaurantMenu,
  } = useRestaurantStore()

  // Handle auth persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
          const userData = userDoc.exists() ? userDoc.data() : {}

          localStorage.setItem(
            "lani-user",
            JSON.stringify({
              uid: firebaseUser.uid,
              name: userData?.fullName || firebaseUser.displayName || "",
              email: firebaseUser.email || "",
              role: "user",
            })
          )

          setScreen("app")
        } catch (error) {
          console.error("Auto-login fetch failed:", error)
          setScreen("auth")
        }
      } else {
        setScreen(hasSeenOnboarding ? "auth" : "onboarding")
      }
      setCheckingAuth(false)
    })

    return () => unsubscribe()
  }, [hasSeenOnboarding, setScreen, setCheckingAuth])

  //  Mark onboarding as complete
  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    setOnboardingSeen(true)
    setScreen("auth")
  }

  const handleAuthComplete = () => setScreen("app")

   const handleSelectRestaurant = async (restaurant: any) => {
    setSelectedRestaurant(restaurant)

    await fetchRestaurantProfile(restaurant.id)
    await fetchRestaurantMenu(restaurant.id)

    setScreen("restaurant")
  }

  const handleSelectMenuItem = (item: any) => {
    setMenuItem(item)
    setScreen("food-item")
  }

  const handleAddToCart = () => {
    setScreen("app")
    setTab("cart")
  }

  const handleViewCart = () => setScreen("cart-detail")
  const handleCheckout = () => setScreen("checkout")
  const handlePlaceOrder = () => setScreen("tracking")
  const handleBackToApp = () => setScreen("app")

  const renderAppContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onSelectRestaurant={handleSelectRestaurant} />
      case "search":
        return <SearchScreen />
      case "history":
        return <OrderHistoryScreen />
      case "cart":
        return <CartScreen onViewCart={handleViewCart} />
      case "profile":
        return <ProfileScreen />
      default:
        return <HomeScreen onSelectRestaurant={handleSelectRestaurant} />
    }
  }

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className='w-6 h-6 text-primary'/>
      </div>
    )
  }

  return (
    <div className="mobile-safe-area">
      {currentScreen === "splash" && (
        <SplashScreen
          onComplete={() =>
            setScreen(hasSeenOnboarding ? "auth" : "onboarding")
          }
        />
      )}
      {currentScreen === "onboarding" && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
      {currentScreen === "auth" && <AuthFlow onComplete={handleAuthComplete} />}
      {currentScreen === "restaurant" && (
        <RestaurantDetailPage
          onBack={handleBackToApp}
          onSelectMenuItem={handleSelectMenuItem}
        />
      )}
      {currentScreen === "food-item" && selectedMenuItem && (
        <FoodItemDetailPage
          item={selectedMenuItem}
          onBack={() => setScreen("restaurant")}
          onAddToCart={handleAddToCart}
        />
      )}
      {currentScreen === "cart-detail" && (
        <CartScreenPage onBack={handleBackToApp} onCheckout={handleCheckout} />
      )}
      {currentScreen === "checkout" && (
        <CheckoutScreenPage
          onBack={handleBackToApp}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
      {currentScreen === "tracking" && (
        <OrderTrackingPage onBack={handleBackToApp} />
      )}
      {currentScreen === "app" && (
        <div className="flex-1 flex flex-col">
          {renderAppContent()}
          <BottomNavigation activeTab={activeTab} onTabChange={setTab} />
        </div>
      )}
    </div>
  )
}
