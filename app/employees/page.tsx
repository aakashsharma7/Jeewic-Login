"use client"

import { useState } from "react"
import { Breadcrumb } from "@/components/breadcrumb"
import { EmployeeMetrics } from "@/components/employees/employee-metrics"
import { EmployeeTable } from "@/components/employees/employee-table"
import { NewEmployeeModal } from "@/components/employees/new-employee-modal"
import { Search } from "lucide-react"

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewEmployeeModal, setShowNewEmployeeModal] = useState(false)

  return (
    <>
      <Breadcrumb items={["Employee", "Overview"]} />
      <main className="flex-1 p-6">
        <EmployeeMetrics />

        <div className="mt-8 border rounded-lg p-2">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-800">Employee Management</h2>
            <p className="text-sm text-gray-500">Manage all the employees at one place</p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search with Employee Name or ID"
                className="pl-10 pr-4 py-2 border rounded-md placeholder:text-gray-400 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button
              onClick={() => setShowNewEmployeeModal(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              New Employee
            </button>
          </div>

          <EmployeeTable />
        </div>
      </main>

      {showNewEmployeeModal && <NewEmployeeModal onClose={() => setShowNewEmployeeModal(false)} />}
    </>
  )
}
