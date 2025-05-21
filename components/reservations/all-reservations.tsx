"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export function AllReservations(
  {
    reservations
  }: {
    reservations: IReservation[]
  }
) {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg text-gray-800 font-medium">All Reservations</h2>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for name or table"
            className="pl-10 pr-4 text-gray-800 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      <div className="bg-white border rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">People</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.name} | {reservation.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.people}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.table}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
