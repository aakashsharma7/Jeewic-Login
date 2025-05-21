"use client"

import { Linkedin, Instagram, Twitter } from "lucide-react"

interface EmailPreviewProps {
  content: string
  subject?: string
}

export function EmailPreview({ content }: EmailPreviewProps) {
  return (
    <div className="w-1/2 p-6">
      <div className="mb-4">
        <h2 className="text-xl font-medium text-gray-800">Mail Preview</h2>
        <p className="text-sm text-gray-500">This is how the users will receive the mail</p>
      </div>

      <div className="border rounded-md p-6 bg-white">
        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: content }} />

        <div className="border-t pt-4 text-xs text-gray-500 mt-8">
          <div className="flex justify-between items-center">
            <div className="text-gray-700">Copyright © 2025 Jeevic. All Rights Reserved.</div>
            <div className="flex items-center gap-2 text-gray-700">
              <span>Privacy Policy</span>
              <span>Terms & Conditions</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2">
              <Linkedin size={16} />
              <Instagram size={16} />
              <Twitter size={16} />
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 mr-1">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="#FFF" stroke="#F97316" strokeWidth="8" />
                  <path d="M30,50 Q50,20 70,50 Q50,80 30,50" fill="#F97316" />
                </svg>
              </div>
              <span className="font-bold text-gray-700">JEEVIC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
