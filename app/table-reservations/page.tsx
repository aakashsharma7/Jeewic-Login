'use client';

import { Breadcrumb } from "@/components/breadcrumb"
import { ReservationTabs } from "@/components/reservations/reservation-tabs"
import { UpcomingReservations } from "@/components/reservations/upcoming-reservations"
import { AllReservations } from "@/components/reservations/all-reservations"

import { useEffect, useState } from "react"
import { APISDK, IDineInTable, IDineInTableBooking } from "@/libs/api"

export default function TableReservationsPage() {
  const [tables, setTables] = useState<IDineInTable[]>([])
  const [bookings, setBookings] = useState<IDineInTableBooking[]>([])
  const [reservations, setReservations] = useState<IReservation[]>([])
  const [activeTab, setActiveTab] = useState("today")

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchData = async () => {
      try {
        const api = APISDK.getInstance(token);
        
        const tables = await api.getTables();
        const bookings = await api.getBookings();
        const reservations = await api.getReservations()
        
        setTables(tables.data);
        setBookings(bookings.data);
        setReservations(reservations.data.reservations);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={["Cafe", "Table Reservations"]} />
      <main className="flex-1 p-6">
        <h2 className="text-lg text-gray-900 font-medium mb-4">Upcoming Reservations</h2>
        <ReservationTabs activeTab={activeTab} setActiveTab={setActiveTab} bookings={bookings} />
        <UpcomingReservations tables={tables} bookings={bookings} activeTab={activeTab} />

        <div className="mt-8">
          <AllReservations reservations={reservations} />
        </div>
      </main>
    </>
  )
}
