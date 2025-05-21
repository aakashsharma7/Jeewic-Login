"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { APISDK, IDineInOrder, IDineInTable, IDineInTableBooking, IDish } from "@/libs/api"

interface IFilterOrder {
    order_id: string;
    table: string;
    dish_name: string;
    quantity: number;
    total: number;
    status: "pending" | "preparing" | "served" | "ready";
}

export function OrderPanel(
  {
    orders,
    dishes,
    tables,
    bookings,
  }: Readonly<{
    orders: IDineInOrder[];
    tables: IDineInTable[];
    dishes: IDish[];
    bookings: IDineInTableBooking[];
  }>
) {
  const [activeTab, setActiveTab] = useState("preparing")
  const [filteredOrders, setFilteredOrders] = useState<IFilterOrder[]>([])

  // Generate individual orders from the data
  const genOrders = orders.map((order) => {
    const booking = bookings.find((booking) => booking.id === order.booking_id);
    const table = tables.find((table) => table.id === booking?.table_id);
    const dish = dishes.find(dish => dish.id === order.dish_id);
    const total = (dish?.price || 0) * order.quantity;

    return {
      order_id: order.id,
      table: table?.table_number ?? "Unknown",
      dish_name: dish?.name ?? "Unknown Dish",
      quantity: order.quantity,
      total,
      status: order.order_status as 'pending' | 'preparing' | 'served' | 'ready',
    };
  });

  // Calculate counts for each tab
  const tabCounts = {
    pending: genOrders.filter(order => order.status === 'pending').length,
    preparing: genOrders.filter(order => order.status === 'preparing').length,
    served: genOrders.filter(order => order.status === 'served').length,
    ready: genOrders.filter(order => order.status === 'ready').length,
  }

  const tabs = [
    { id: "pending", label: "New Orders", count: tabCounts.pending },
    { id: "preparing", label: "Preparing", count: tabCounts.preparing },
    { id: "served", label: "Served", count: tabCounts.served },
    { id: "ready", label: "Ready", count: tabCounts.ready },
  ]

  // Filter orders based on active tab
  useEffect(() => {
    setFilteredOrders(genOrders.filter(order => order.status === activeTab));
  }, [activeTab, orders, bookings, dishes, tables]);

  // Handle status change for an order
 // Handle status change for an order
const handleStatusChange = async (order: IFilterOrder) => {
  // Get the access token from localStorage
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("No access token found in localStorage");
    return;
  }
  
  // Initialize APISDK with the token
  const api = APISDK.getInstance(token);

  // Determine the next status based on current status
  let nextStatus: 'pending' | 'preparing' | 'served' | 'ready';
  
  switch (order.status) {
    case 'pending':
      nextStatus = 'preparing';
      break;
    case 'preparing':
      nextStatus = 'served';
      break;
    case 'served':
      nextStatus = 'ready';
      break;
    default:
      nextStatus = 'ready';
  }

  try {
    // Update the order status in the backend
    if (nextStatus === 'preparing') {
      await api.markOrderAsPreparing(order.order_id);
    } else if (nextStatus === 'served') {
      await api.markOrderAsServed(order.order_id);
    } else if (nextStatus === 'ready') {
      // Assuming there's an API method to mark as ready
      await api.markOrderAsReady(order.order_id);
    }
    
    // Update the local state to reflect the change
    setFilteredOrders(prev => 
      prev.filter(o => o.order_id !== order.order_id)
    );
  } catch (error) {
    console.error("Failed to update order status:", error);
  }
}


  // Get button text based on current status
  const getButtonText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Start Preparing';
      case 'preparing':
        return 'Mark as Served';
      case 'served':
        return 'Complete Order';
      default:
        return 'ready';
    }
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-3 cursor-pointer text-center relative ${
              activeTab === tab.id ? "text-orange-500 font-medium" : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span className="ml-1 bg-gray-100 text-gray-700 text-xs px-1.5 py-0.5 rounded-full">{tab.count}</span>
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>}
          </button>
        ))}
      </div>

      {/* Order cards */}
      <div className="p-4 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No {activeTab} orders at the moment
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.order_id} className="border rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Table - {order.table}</h3>
                    <p className="text-sm text-blue-400">
                      Order #{order.order_id.substring(0, 8)}
                    </p>
                  </div>
                  <button 
                    className="ml-auto bg-orange-500 cursor-pointer text-white px-3 py-1.5 rounded-md flex items-center text-sm"
                    onClick={() => handleStatusChange(order)}
                    disabled={order.status === 'ready'}
                  >
                    {getButtonText(order.status)} <ChevronRight size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-700">{order.dish_name}</span>
                      <span className="text-gray-500 text-sm">×{order.quantity}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Total: ₹{order.total}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
