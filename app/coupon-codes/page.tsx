"use client"

import { Breadcrumb } from "@/components/breadcrumb"
import { MetricCards } from "@/components/coupan-codes/metric-cards"
import { CouponTabs } from "@/components/coupan-codes/coupon-tabs"
import { CouponTable } from "@/components/coupan-codes/coupon-table"
import { PlusCircle } from "lucide-react"
import { NewCouponModal } from "@/components/coupan-codes/new-coupon-modal"
import { useState } from "react"

export default function CouponCodesPage() {
  const [showNewCouponModal, setShowNewCouponModal] = useState(false)

  return (
    <>
      <Breadcrumb items={["Marketing", "Coupon Codes"]} />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium text-gray-800">Coupon Codes</h1>
          <button
            onClick={() => setShowNewCouponModal(true)}
            className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors text-gray-800"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Coupon Code
          </button>
        </div>

        <MetricCards />

        <div className="mt-8">
          <div className="mb-2">
            <h2 className="text-lg font-medium text-gray-800">All Reservations</h2>
            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur</p>
          </div>
          <CouponTabs />
          <CouponTable />
        </div>
      </main>
      {showNewCouponModal && <NewCouponModal onClose={() => setShowNewCouponModal(false)} />}
    </>
  )
}
