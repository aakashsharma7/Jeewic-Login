"use client"

import { useState } from "react"
import { Info, Edit, Trash2 } from "lucide-react"
import { CouponInfoPopup } from "./coupon-hover-card"

interface CouponType {
  id: string
  code: string
  active: boolean
  uses: number
  expiryDate: string
  createdAt: string
  lastUpdated: string
  oneTimeUse: boolean
  discountPercentage: number
  terms: string[]
}

export function CouponTable() {
  const [hoveredCoupon, setHoveredCoupon] = useState<CouponType | null>(null)
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })

  const coupons = [
    {
      id: "25JX23xC23D",
      code: "SUPERHIT",
      expiryDate: "2025/05/30",
      lastUpdated: "2025/05/21",
      createdAt: "2025/05/17",
      active: true,
      uses: 1000,
      oneTimeUse: false,
      discountPercentage: 20,
      terms: [
        "Lorem ipsum dolor sit amet, consectetuer asfef adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetuer afafaf adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      id: "25JX23xC23D",
      code: "SUPERHIT",
      expiryDate: "2025/05/30",
      lastUpdated: "2025/05/21",
      createdAt: "2025/05/17",
      active: true,
      uses: 1000,
      oneTimeUse: false,
      discountPercentage: 20,
      terms: [
        "Lorem ipsum dolor sit amet, consectetuer asfef adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetuer afafaf adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      id: "25JX23xC23D",
      code: "SUPERHIT",
      expiryDate: "2025/05/30",
      lastUpdated: "2025/05/21",
      createdAt: "2025/05/17",
      active: true,
      uses: 1000,
      oneTimeUse: false,
      discountPercentage: 20,
      terms: [
        "Lorem ipsum dolor sit amet, consectetuer asfef adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetuer afafaf adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      id: "25JX23xC23D",
      code: "SUPERHIT",
      expiryDate: "2025/05/30",
      lastUpdated: "2025/05/21",
      createdAt: "2025/05/17",
      active: true,
      uses: 1000,
      oneTimeUse: false,
      discountPercentage: 20,
      terms: [
        "Lorem ipsum dolor sit amet, consectetuer asfef adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetuer afafaf adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      id: "25JX23xC23D",
      code: "SUPERHIT",
      expiryDate: "2025/05/30",
      lastUpdated: "2025/05/21",
      createdAt: "2025/05/17",
      active: true,
      uses: 1000,
      oneTimeUse: false,
      discountPercentage: 20,
      terms: [
        "Lorem ipsum dolor sit amet, consectetuer asfef adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetuer afafaf adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      id: "25JX23xC23D",
      code: "SUPERHIT",
      expiryDate: "2025/05/30",
      lastUpdated: "2025/05/21",
      createdAt: "2025/05/17",
      active: true,
      uses: 1000,
      oneTimeUse: false,
      discountPercentage: 20,
      terms: [
        "Lorem ipsum dolor sit amet, consectetuer asfef adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetuer afafaf adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      id: "25JX23xC23D",
      code: "SUPERHIT",
      expiryDate: "2025/05/30",
      lastUpdated: "2025/05/21",
      createdAt: "2025/05/17",
      active: true,
      uses: 1000,
      oneTimeUse: false,
      discountPercentage: 20,
      terms: [
        "Lorem ipsum dolor sit amet, consectetuer asfef adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetuer afafaf adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      id: "25JX23xC23D",
      code: "SUPERHIT",
      expiryDate: "2025/05/30",
      lastUpdated: "2025/05/21",
      createdAt: "2025/05/17",
      active: true,
      uses: 1000,
      oneTimeUse: false,
      discountPercentage: 20,
      terms: [
        "Lorem ipsum dolor sit amet, consectetuer asfef adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetuer afafaf adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      id: "25JX23xC23D",
      code: "SUPERHIT",
      expiryDate: "2025/05/30",
      lastUpdated: "2025/05/21",
      createdAt: "2025/05/17",
      active: true,
      uses: 1000,
      oneTimeUse: false,
      discountPercentage: 20,
      terms: [
        "Lorem ipsum dolor sit amet, consectetuer asfef adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetuer afafaf adipiscing elit, sed do eiusmod tempor sfsfaea incididunt ut labore et dolore magna aliqua.",
      ],
    },
  ]

  const handleInfoMouseEnter = (e: React.MouseEvent, coupon: CouponType) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoverPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    })
    setHoveredCoupon(coupon)
  }

  const handleInfoMouseLeave = () => {
    setHoveredCoupon(null)
  }

  const handleInfoClick = (coupon: CouponType) => {
    setSelectedCoupon(coupon)
    setHoveredCoupon(null)
  }

  return (
    <div className="bg-white border rounded-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Coupon ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Coupon Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Expiry Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Last Updated
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {coupons.map((coupon, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <div className="flex items-center">
                  {coupon.id}
                  <button
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    onMouseEnter={(e) => handleInfoMouseEnter(e, coupon)}
                    onMouseLeave={handleInfoMouseLeave}
                    onClick={() => handleInfoClick(coupon)}
                  >
                    <Info size={16} />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{coupon.code}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{coupon.expiryDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{coupon.lastUpdated}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{coupon.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <div className="flex space-x-2">
                  <button className="text-gray-600 hover:text-gray-800 flex items-center">
                    <Edit size={16} className="mr-1" />
                    Update
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-6 py-3 flex items-center justify-end border-t">
        <div className="text-sm text-gray-700">Page 1 of 1</div>
        <div className="ml-4 flex">
          <button className="px-2 py-1 border rounded-l-md bg-gray-100 text-gray-600">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="px-2 py-1 border-t border-b border-r rounded-r-md bg-gray-100 text-gray-600">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {hoveredCoupon && !selectedCoupon && (
        <CouponInfoPopup 
          coupon={hoveredCoupon} 
          position={hoverPosition} 
          mode="hover" 
        />
      )}
      {selectedCoupon && (
        <CouponInfoPopup 
          coupon={selectedCoupon} 
          onClose={() => setSelectedCoupon(null)}
          mode="popup"
        />
      )}
    </div>
  )
}
