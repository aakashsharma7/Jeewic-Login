"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface ConfirmPopupProps {
  title?: string
  message: string
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
}

export function ConfirmPopup({
  title = "Confirm Action",
  message,
  isOpen,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel"
}: ConfirmPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])
  
  const handleConfirm = () => {
    setIsVisible(false)
    setTimeout(() => {
      onConfirm()
    }, 300)
  }
  
  const handleCancel = () => {
    setIsVisible(false)
    setTimeout(() => {
      onCancel()
    }, 300)
  }

  if (!isOpen && !isVisible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div 
        className={`
          bg-white border rounded-lg shadow-lg max-w-md w-full
          transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}
          transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}
        `}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button 
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-5">
            <p className="text-gray-600">{message}</p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-white hover:bg-red-700 focus:outline-none"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 