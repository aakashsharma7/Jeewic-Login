"use client"

// import { useEffect, useState } from "react"
// import { Clock, Users, ChevronDown, Info, Trash2 } from "lucide-react"
import { IDineInTable, IDineInTableBooking } from "@/libs/api"

export function UpcomingReservations({
  // bookings,
  // activeTab,
  // tables
}: Readonly<{
  bookings: IDineInTableBooking[]
  tables: IDineInTable[]
  activeTab: string
}>) {

  return (
    <div className="text-center py-8 text-gray-500">
      Comming Soon
    </div>
  )
}
