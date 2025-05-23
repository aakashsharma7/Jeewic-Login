"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface PopupProps {
  title?: string
  message: string
  isOpen: boolean
  onClose: () => void
  type?: "success" | "error" | "info" | "warning"
  autoClose?: boolean
  autoCloseTime?: number
}

export function Popup({
  title,
  message,
  isOpen,
  onClose,
  type = "info",
  autoClose = true,
  autoCloseTime = 3000
}: PopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      
      if (autoClose) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          setTimeout(onClose, 300) // Wait for fade-out animation
        }, autoCloseTime)
        
        return () => clearTimeout(timer)
      }
    }
  }, [isOpen, autoClose, autoCloseTime, onClose])

  if (!isOpen && !isVisible) return null

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-500 text-green-700"
      case "error":
        return "bg-red-50 border-red-500 text-red-700"
      case "warning":
        return "bg-yellow-50 border-yellow-500 text-yellow-700" 
      case "info":
      default:
        return "bg-blue-50 border-blue-500 text-blue-700"
    }
  }

  const getIconStyles = () => {
    switch (type) {
      case "success":
        return "text-green-500"
      case "error":
        return "text-red-500"
      case "warning":
        return "text-yellow-500"
      case "info":
      default:
        return "text-blue-500"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        )
      case "error":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        )
      case "warning":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        )
      case "info":
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
      <div 
        className={`
          ${getTypeStyles()} 
          border rounded-lg shadow-lg max-w-md w-full pointer-events-auto
          transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="p-4 flex">
          <div className={`flex-shrink-0 ${getIconStyles()}`}>
            {getIcon()}
          </div>
          <div className="ml-3 flex-grow">
            {title && <h3 className="text-sm font-medium">{title}</h3>}
            <div className="text-sm mt-1">{message}</div>
          </div>
          <button 
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 300) // Wait for fade-out animation
            }}
            className="flex-shrink-0 ml-1 text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
} 