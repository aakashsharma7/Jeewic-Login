"use client"

import { CSSProperties, useState } from "react"

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

interface CouponInfoPopupProps {
  coupon: CouponType
  mode: "hover" | "popup"
  position?: { x: number; y: number }
  onClose?: () => void
  onUpdate?: (updatedCoupon: CouponType) => void
}

export function CouponInfoPopup({ coupon, mode, position, onClose, onUpdate }: CouponInfoPopupProps) {
  const [couponData, setCouponData] = useState<CouponType>(coupon)

  const style: CSSProperties = mode === "hover" && position 
    ? {
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y + 24}px`, // Add some offset from the icon
        zIndex: 50,
        width: "300px",
      }
    : {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 50,
        width: "300px",
      }
  
  const toggleActive = () => {
    const updatedCoupon = { ...couponData, active: !couponData.active }
    setCouponData(updatedCoupon)
    if (onUpdate) {
      onUpdate(updatedCoupon)
    }
  }

  const toggleOneTimeUse = () => {
    const updatedCoupon = { ...couponData, oneTimeUse: !couponData.oneTimeUse }
    setCouponData(updatedCoupon)
    if (onUpdate) {
      onUpdate(updatedCoupon)
    }
  }

  return (
    <>
      {mode === "popup" && (
        <div 
          className="fixed inset-0 bg-black/20 bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      <div 
        className={`
          bg-white border rounded-md shadow-lg
          ${mode === "hover" ? "p-3" : "p-4"}
        `}
        style={style}
      >
        {mode === "popup" && (
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h3 className="font-medium text-gray-800">Coupon Details</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className={mode === "hover" ? "text-sm" : ""}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs text-gray-500">COUPON ID</div>
              <div className="font-medium text-gray-800">{couponData.id}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">CODE</div>
              <div className="font-medium text-gray-800">{couponData.code}</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="font-medium text-gray-800">Active</div>
            <button 
              onClick={toggleActive} 
              className="focus:outline-none"
              aria-label={couponData.active ? "Deactivate coupon" : "Activate coupon"}
            >
              <div className="relative inline-flex items-center">
                <div className={`w-8 h-4 rounded-full cursor-pointer ${couponData.active ? "bg-orange-500" : "bg-gray-200"}`}>
                  <div
                    className={`absolute w-3 h-3 bg-white rounded-full top-0.5 transition-transform ${
                      couponData.active ? "translate-x-[18px]" : "translate-x-[2px]"
                    }`}
                  ></div>
                </div>
              </div>
            </button>
          </div>

          <div className="mb-4">
            <div className="text-xs text-gray-500">NO. OF USES</div>
            <div className="font-medium text-gray-800">{couponData.uses}</div>
          </div>

          {mode === "popup" && (
            <>
              <div className="mb-4">
                <div className="text-xs text-gray-500">Expiry</div>
                <div className="font-medium text-gray-800">{couponData.expiryDate}</div>
              </div>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs text-gray-500">Created_at</div>
                  <div className="font-medium text-gray-800">{couponData.createdAt}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Last_Updated</div>
                  <div className="font-medium text-gray-800">{couponData.lastUpdated}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="font-medium text-gray-800">One Time Use</div>
                <button 
                  onClick={toggleOneTimeUse}
                  className="focus:outline-none"
                  aria-label={couponData.oneTimeUse ? "Disable one time use" : "Enable one time use"}
                >
                  <div className="relative inline-flex items-center">
                    <div className={`w-8 h-4 rounded-full cursor-pointer ${couponData.oneTimeUse ? "bg-orange-500" : "bg-gray-200"}`}>
                      <div
                        className={`absolute w-3 h-3 bg-white rounded-full top-0.5 transition-transform ${
                          couponData.oneTimeUse ? "translate-x-[18px]" : "translate-x-[2px]"
                        }`}
                      ></div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-500">Discount Percentage</div>
                <div className="font-medium text-gray-800">{couponData.discountPercentage}%</div>
              </div>

              <div>
                <div className="text-xs text-gray-500 mb-1">Terms</div>
                <ol className="list-decimal pl-4 text-xs text-gray-800 space-y-1">
                  {couponData.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ol>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}