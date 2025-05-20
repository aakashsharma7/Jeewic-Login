"use client"

import { useState } from "react"
import { Calendar, ChevronDown, X } from "lucide-react"

// Define prop types for the modal component
interface NewCouponModalProps {
  onClose: () => void;
}

// Define types for discount options
type DiscountType = "percentage" | "flat";

export function NewCouponModal({ onClose }: NewCouponModalProps) {
  const [couponCode, setCouponCode] = useState<string>("SUPERHIT")
  const [oneTimeUse, setOneTimeUse] = useState<boolean>(true)
  const [totalUses, setTotalUses] = useState<string>("")
  const [expiryDate, setExpiryDate] = useState<string>("2025/05/17")
  const [discountType, setDiscountType] = useState<DiscountType>("percentage")
  const [discountAmount, setDiscountAmount] = useState<string>("400")
  const [minimumCartValue, setMinimumCartValue] = useState<string>("4000")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-800">Coupon Code</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="w-full border rounded-md px-3 py-2 text-gray-800"
                />
                <p className="text-xs text-gray-500 mt-1">Coupon ID will be generated automatically</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-800">One Time Use Per User</span>
                <div className="relative inline-flex items-center cursor-pointer">
                  <div
                    className={`w-10 h-5 rounded-full ${oneTimeUse ? "bg-orange-500" : "bg-gray-200"}`}
                    onClick={() => setOneTimeUse(!oneTimeUse)}
                  >
                    <div
                      className={`absolute w-3.5 h-3.5 bg-white rounded-full top-[3px] transition-transform ${
                        oneTimeUse ? "translate-x-[22px]" : "translate-x-[3px]"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Total No. Of Uses</label>
                  <div className="relative">
                    <select
                      value={totalUses}
                      onChange={(e) => setTotalUses(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-gray-800 appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="100">100</option>
                      <option value="500">500</option>
                      <option value="1000">1000</option>
                      <option value="unlimited">Unlimited</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Expiry</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-gray-800"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Discount Details</label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="discountType"
                      checked={discountType === "percentage"}
                      onChange={() => setDiscountType("percentage")}
                      className="mr-2 text-orange-500"
                    />
                    <span className="text-gray-800">Percentage%</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="discountType"
                      checked={discountType === "flat"}
                      onChange={() => setDiscountType("flat")}
                      className="mr-2 text-orange-500"
                    />
                    <span className="text-gray-800">Flat Discount(₹)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Flat Discount Amount(₹)</label>
                <input
                  type="text"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Minimum Cart Value</label>
                <input
                  type="text"
                  value={minimumCartValue}
                  onChange={(e) => setMinimumCartValue(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Terms & Conditions</label>
                <div className="bg-gray-50 p-3 rounded-md">
                  <ol className="list-decimal pl-5 text-sm text-gray-800 space-y-2">
                    <li>20% off up to ₹999 on orders above ₹4000.</li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full mt-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}