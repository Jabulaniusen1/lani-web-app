"use client"

import { Trash2, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface OrderItem {
  id: string
  name: string
  quantity: number
  status: "Delivered" | "Declined"
  date: string
}

const ORDERS: OrderItem[] = [
  {
    id: "1",
    name: "French fries and Chicken nuggets",
    quantity: 2,
    status: "Delivered",
    date: "Today",
  },
  {
    id: "2",
    name: "Jellof rice and beef, dodo and fried eggs",
    quantity: 2,
    status: "Delivered",
    date: "Yesterday",
  },
  {
    id: "3",
    name: "Jellof rice and beef, dodo and fried eggs",
    quantity: 2,
    status: "Delivered",
    date: "2 days ago",
  },
  {
    id: "4",
    name: "Jellof rice and beef, dodo and fried eggs",
    quantity: 2,
    status: "Declined",
    date: "3 days ago",
  },
  {
    id: "5",
    name: "Jellof rice and beef, dodo and fried eggs",
    quantity: 2,
    status: "Delivered",
    date: "1 week ago",
  },
]

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState<OrderItem[]>(ORDERS)

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id))
  }

  return (
    <div className="flex-1 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Order History</h1>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto p-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Clock className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-lg font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground text-center">Start ordering delicious food now!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-1">{order.name}</p>
                    <p className="text-xs text-muted-foreground">Quantity: {order.quantity} servings</p>
                  </div>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex gap-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    {order.status === "Declined" && (
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-muted text-muted-foreground">
                        Declined
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{order.date}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
