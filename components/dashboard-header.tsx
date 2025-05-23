"use client"

import { useState, useRef, useEffect } from "react"
import { Bell } from "lucide-react"

export function DashboardHeader() {
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef<HTMLDivElement | null>(null)

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="h-16 border-b flex items-center justify-end px-6">
      <div className="flex justify-end items-center">
        <div className="relative" ref={notificationRef}>
          <button
            className="p-2 rounded-full hover:bg-gray-100 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-400 rounded-md shadow-lg z-50">
              <div className="p-3">
                <div className="flex items-center justify-between border border-gray-300 rounded-md p-2 mb-3">
                  <div className="flex items-center">
                    <div className="bg-gray-200 h-8 w-8 rounded-md flex items-center justify-center text-gray-800 text-sm font-medium mr-2">
                      L4
                    </div>
                  </div>
                  <div className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">+2 more items</div>
                </div>

                <div className="border border-gray-300 rounded-md p-2 mb-3">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                      <img
                        src="https://i.pinimg.com/474x/3e/c9/fe/3ec9fe32c6217014789b5f42e2343f47.jpg?height=48&width=48&text=Pizza"
                        alt="Mexicano Chicken Pizza"
                        className="h-full text-gray-800 w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between flex-1">
                      <span className="font-medium text-gray-800">Mexicano Chicken Pizza</span>
                      <span className="text-gray-500">x 1</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 rounded-md p-2">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                      <img
                        src="https://i.pinimg.com/474x/4b/a5/0e/4ba50e5da2c78d4c1dd71766c119ba66.jpg?height=48&width=48&text=Boba"
                        alt="Thai Boba"
                        className="h-full text-gray-800 w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-between flex-1">
                      <span className="font-medium text-gray-800">Thai Boba</span>
                      <span className="text-gray-500">x 1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
