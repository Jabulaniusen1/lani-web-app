"use client"

import { useState } from "react"
import SplashScreen from "@/components/splash-screen"
import OnboardingFlow from "@/components/onboarding-flow"
import AuthFlow from "@/components/auth-flow"
import BottomNavigation from "@/components/bottom-navigation"
import HomeScreen from "@/components/home-screen"
import SearchScreen from "@/components/search-screen"
import CartScreen from "@/components/cart-screen"
import ProfileScreen from "@/components/profile-screen"
import OrderHistoryScreen from "@/components/order-history-screen"
import { AppProvider, useAppContext } from "@/context/app-context"
import RestaurantDetailPage from "@/components/restaurant-detail-page"
import FoodItemDetailPage from "@/components/food-item-detail-page"
import CartScreenPage from "@/components/cart-screen-page"
import CheckoutScreenPage from "@/components/checkout-screen-page"
import OrderTrackingPage from "@/components/order-tracking-page"

type AppScreen =
  | "splash"
  | "onboarding"
  | "auth"
  | "app"
  | "order-tracking"
  | "restaurant"
  | "food-item"
  | "cart-detail"
  | "checkout"
  | "tracking"
type AppTab = "home" | "search" | "history" | "cart" | "profile"

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("splash")
  const [activeTab, setActiveTab] = useState<AppTab>("home")
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null)
  const { setSelectedRestaurant: setContextRestaurant, setSelectedMenuItem: setContextMenuItem } = useAppContext()

  const handleSplashComplete = () => {
    setCurrentScreen("onboarding")
  }

  const handleOnboardingComplete = () => {
    setCurrentScreen("auth")
  }

  const handleAuthComplete = () => {
    setCurrentScreen("app")
  }

  const handleShowOrderTracking = () => {
    setCurrentScreen("order-tracking")
  }

  const handleCloseOrderTracking = () => {
    setCurrentScreen("app")
  }

  const handleSelectRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant)
    setContextRestaurant(restaurant)
    setCurrentScreen("restaurant")
  }

  const handleSelectMenuItem = (item: any) => {
    setSelectedMenuItem(item)
    setContextMenuItem(item)
    setCurrentScreen("food-item")
  }

  const handleAddToCart = () => {
    setCurrentScreen("app")
    setActiveTab("cart")
  }

  const handleViewCart = () => {
    setCurrentScreen("cart-detail")
  }

  const handleCheckout = () => {
    setCurrentScreen("checkout")
  }

  const handlePlaceOrder = () => {
    setCurrentScreen("tracking")
  }

  const handleBackToApp = () => {
    setCurrentScreen("app")
  }

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

  return (
    <div className="mobile-safe-area">
      {currentScreen === "splash" && <SplashScreen onComplete={handleSplashComplete} />}
      {currentScreen === "onboarding" && <OnboardingFlow onComplete={handleOnboardingComplete} />}
      {currentScreen === "auth" && <AuthFlow onComplete={handleAuthComplete} />}
      {currentScreen === "restaurant" && (
        <RestaurantDetailPage onBack={handleBackToApp} onSelectMenuItem={handleSelectMenuItem} />
      )}
      {currentScreen === "food-item" && selectedMenuItem && (
        <FoodItemDetailPage
          item={selectedMenuItem}
          onBack={() => setCurrentScreen("restaurant")}
          onAddToCart={handleAddToCart}
        />
      )}
      {currentScreen === "cart-detail" && <CartScreenPage onBack={handleBackToApp} onCheckout={handleCheckout} />}
      {currentScreen === "checkout" && <CheckoutScreenPage onBack={handleBackToApp} onPlaceOrder={handlePlaceOrder} />}
      {currentScreen === "tracking" && <OrderTrackingPage onBack={handleBackToApp} />}
      {currentScreen === "app" && (
        <div className="flex-1 flex flex-col">
          {renderAppContent()}
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
