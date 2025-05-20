"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { usePopup } from "@/context/popup-context"

interface LogoutButtonProps {
  variant?: "icon" | "full"
  className?: string
}

export function LogoutButton({ variant = "full", className = "" }: LogoutButtonProps) {
  const router = useRouter()
  const { showConfirm } = usePopup()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = () => {
    showConfirm(
      "Are you sure you want to log out?",
      async () => {
        try {
          setIsLoggingOut(true)
          // Clear access token
          localStorage.removeItem("access_token")
          // Redirect to login page
          router.push("/login")
        } finally {
          setIsLoggingOut(false)
        }
      },
      {
        title: "Logout Confirmation",
        confirmText: "Logout",
        cancelText: "Cancel"
      }
    )
  }

  if (variant === "icon") {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`p-2 rounded-md hover:bg-gray-100 ${className}`}
        title="Logout"
      >
        <LogOut size={20} />
      </button>
    )
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 ${className}`}
    >
      <LogOut size={18} />
      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
    </button>
  )
} 