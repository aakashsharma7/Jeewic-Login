"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { Popup } from "@/components/ui/popup"
import { ConfirmPopup } from "@/components/ui/confirm-popup"

type PopupType = "success" | "error" | "info" | "warning"

interface PopupData {
  id: string
  title?: string
  message: string
  type: PopupType
  autoClose?: boolean
  autoCloseTime?: number
}

interface ConfirmPopupData {
  id: string
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
}

interface PopupContextType {
  showPopup: (message: string, options?: {
    title?: string
    type?: PopupType
    autoClose?: boolean
    autoCloseTime?: number
  }) => void;
  showConfirm: (message: string, onConfirm: () => void, options?: {
    title?: string
    confirmText?: string
    cancelText?: string
  }) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export function PopupProvider({ children }: { children: ReactNode }) {
  const [popups, setPopups] = useState<PopupData[]>([])
  const [confirmPopup, setConfirmPopup] = useState<ConfirmPopupData | null>(null)

  const showPopup = (
    message: string,
    options: {
      title?: string
      type?: PopupType
      autoClose?: boolean
      autoCloseTime?: number
    } = {}
  ) => {
    const id = Date.now().toString()
    const { title, type = "info", autoClose = true, autoCloseTime = 3000 } = options
    
    setPopups(prev => [...prev, { id, message, title, type, autoClose, autoCloseTime }])
  }

  const showConfirm = (
    message: string,
    onConfirm: () => void,
    options: {
      title?: string
      confirmText?: string
      cancelText?: string
    } = {}
  ) => {
    const id = Date.now().toString()
    const { title, confirmText, cancelText } = options
    
    setConfirmPopup({ id, message, title, confirmText, cancelText, onConfirm })
  }

  const closePopup = (id: string) => {
    setPopups(prev => prev.filter(popup => popup.id !== id))
  }

  const closeConfirmPopup = () => {
    setConfirmPopup(null)
  }

  return (
    <PopupContext.Provider value={{ showPopup, showConfirm }}>
      {children}
      
      {popups.map(popup => (
        <Popup
          key={popup.id}
          isOpen={true}
          message={popup.message}
          title={popup.title}
          type={popup.type}
          autoClose={popup.autoClose}
          autoCloseTime={popup.autoCloseTime}
          onClose={() => closePopup(popup.id)}
        />
      ))}
      
      {confirmPopup && (
        <ConfirmPopup
          isOpen={true}
          message={confirmPopup.message}
          title={confirmPopup.title}
          confirmText={confirmPopup.confirmText}
          cancelText={confirmPopup.cancelText}
          onConfirm={() => {
            confirmPopup.onConfirm()
            closeConfirmPopup()
          }}
          onCancel={closeConfirmPopup}
        />
      )}
    </PopupContext.Provider>
  )
}

export function usePopup() {
  const context = useContext(PopupContext)
  if (context === undefined) {
    throw new Error("usePopup must be used within a PopupProvider")
  }
  return context
} 