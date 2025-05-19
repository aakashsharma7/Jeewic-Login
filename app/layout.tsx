import type React from "react"
import { Sidebar } from "@/components/sidebar"
import "./globals.css"
import type { Metadata } from "next";
import { AuthContextProvider } from '@/context/provider';
import { PopupProvider } from '@/context/popup-context';
import { AuthGuard } from "@/components/auth/auth-guard";


export const metadata: Metadata = {
  title: "JEEVIC",
  description: "Admin Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <PopupProvider>
            <AuthGuard>
              <div className="flex h-screen bg-white">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-auto">
                  {children}
                </div>
              </div>
            </AuthGuard>
          </PopupProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
