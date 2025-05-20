"use client"

import { useState } from "react"
import { X, Upload } from "lucide-react"

// Define the props interface for the component
interface NewCategoryModalProps {
  onClose: () => void;
}

export function NewCategoryModal({ onClose }: NewCategoryModalProps) {
  const [categoryName, setCategoryName] = useState<string>("")
  const [categoryDescription, setCategoryDescription] = useState<string>("")

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">New Category</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full border rounded-md px-3 py-2 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Category Description</label>
              <textarea
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                placeholder="Enter category description"
                className="w-full border rounded-md px-3 py-2 text-gray-800 min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Category Image</label>
              <div className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  Drag and Drop an image here or <span className="text-blue-500">Select file</span>
                </p>
                <p className="text-xs text-gray-500">Formats Supported: PNG, JPG, JPEG</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex space-x-3">
            <button
              className="flex-1 py-2 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="flex-1 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600" onClick={onClose}>
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}