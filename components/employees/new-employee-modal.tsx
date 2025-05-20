"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export function NewEmployeeModal({ onClose }: { onClose: () => void }) {
  const [employeeName, setEmployeeName] = useState("Ram Prakash")
  const [employeeDepartment, setEmployeeDepartment] = useState("Cafe Admin")
  const [employeeEmail, setEmployeeEmail] = useState("ramprakash.123@gmail.com")
  const [employeeMobile, setEmployeeMobile] = useState("7416471278")
  const [profileImage, setProfileImage] = useState("https://i.pinimg.com/736x/62/7d/7a/627d7ac2d198b462f5a558ac49ecfc9f.jpg?height=100&width=100&text=RP")
  const [showDeleteImage, setShowDeleteImage] = useState(true)
  
  // Create ref for the modal content
  const modalRef = useRef<HTMLDivElement>(null)
  
  // Effect to handle clicks outside the modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside)
    
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
        setShowDeleteImage(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteImage = () => {
    setProfileImage("https://i.pinimg.com/736x/fb/f9/62/fbf962d2260047e6075b7a6cb38374e2.jpg?height=100&width=100&text=RP")
    setShowDeleteImage(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-2">
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt="Employee"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              </div>
              <div className="flex space-x-2 py-2">
                <label className="cursor-pointer text-sm bg-white border-2 border-gray-300 rounded-md px-2 py-1 text-black">
                  Upload Image
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
                {showDeleteImage && (
                  <button type="button" className="text-sm bg-red-100  rounded-md px-2 py-1 text-red-500" onClick={handleDeleteImage}>
                    Delete Image
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Employee Name</label>
                <input
                  type="text"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Employee Department</label>
                <div className="relative">
                  <select
                    value={employeeDepartment}
                    onChange={(e) => setEmployeeDepartment(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-gray-800 appearance-none"
                    required
                  >
                    <option value="Cafe Admin">Cafe Admin</option>
                    <option value="Kitchen Staff">Kitchen Staff</option>
                    <option value="Waiter">Waiter</option>
                    <option value="Manager">Manager</option>
                    <option value="Cashier">Cashier</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Employee email</label>
                <input
                  type="email"
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Employee mobile</label>
                <input
                  type="tel"
                  value={employeeMobile}
                  onChange={(e) => setEmployeeMobile(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-gray-800"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full mt-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              Create Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}