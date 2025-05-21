"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { usePopup } from "@/context/popup-context"

interface ImageUploadProps {
  onImageSelectedAction: (imageUrl: string) => void
}

export function ImageUpload({ onImageSelectedAction }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const { showPopup } = usePopup()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.match("image.*")) {
      showPopup("Please select an image file", { type: "error" })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === 'string') {
        onImageSelectedAction(result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div
      className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
        isDragging ? "border-orange-500 bg-orange-50" : "border-gray-300 hover:border-orange-500"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => {
        const fileInput = document.getElementById("fileInput") as HTMLInputElement | null
        fileInput?.click()
      }}
    >
      <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleFileInput} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">Drag and drop an image, or click to select</p>
      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
    </div>
  )
}
