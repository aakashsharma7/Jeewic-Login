"use client"

import { IDineInTableBooking } from "@/libs/api"

export function ReservationTabs(
  {
    activeTab,
    setActiveTab,
  }: Readonly<{
    activeTab: string
    setActiveTab: (tab: string) => void,
    bookings: IDineInTableBooking[],
  }>
) {
  const tabs = [
    { id: "today", label: "Today", count: 5 },
    { id: "tomorrow", label: "Tomorrow", count: 3 },
    { id: "later", label: "Later", count: null },
  ]

  return (
    <div className="border-b mb-4">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-2 px-1 font-medium text-sm ${
              activeTab === tab.id
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.count !== null && (
              <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded-md">{tab.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
