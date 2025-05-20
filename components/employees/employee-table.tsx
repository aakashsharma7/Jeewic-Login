"use client"
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

export function EmployeeTable() {
  const employees = [
    {
      id: "#321415d",
      name: "Ram Prakash",
      department: "Cafe Admin",
      mobile: "7799411997",
      email: "ramprakash.123@gmail.com",
      image: "https://i.pinimg.com/736x/62/7d/7a/627d7ac2d198b462f5a558ac49ecfc9f.jpg?height=40&width=40&text=RP",
    },
    {
      id: "#321415d",
      name: "Ram Prakash",
      department: "Cafe Admin",
      mobile: "7799411997",
      email: "ramprakash.123@gmail.com",
      image: "https://i.pinimg.com/736x/62/7d/7a/627d7ac2d198b462f5a558ac49ecfc9f.jpg?height=40&width=40&text=RP",
    },
    {
      id: "#321415d",
      name: "Ram Prakash",
      department: "Cafe Admin",
      mobile: "7799411997",
      email: "ramprakash.123@gmail.com",
      image: "https://i.pinimg.com/736x/62/7d/7a/627d7ac2d198b462f5a558ac49ecfc9f.jpg?height=40&width=40&text=RP",
    },
    {
      id: "#321415d",
      name: "Ram Prakash",
      department: "Cafe Admin",
      mobile: "7799411997",
      email: "ramprakash.123@gmail.com",
      image: "https://i.pinimg.com/736x/62/7d/7a/627d7ac2d198b462f5a558ac49ecfc9f.jpg?height=40&width=40&text=RP",
    },
    {
      id: "#321415d",
      name: "Ram Prakash",
      department: "Cafe Admin",
      mobile: "7799411997",
      email: "ramprakash.123@gmail.com",
      image: "https://i.pinimg.com/736x/62/7d/7a/627d7ac2d198b462f5a558ac49ecfc9f.jpg?height=40&width=40&text=RP",
    },
    {
      id: "#321415d",
      name: "Ram Prakash",
      department: "Cafe Admin",
      mobile: "7799411997",
      email: "ramprakash.123@gmail.com",
      image: "https://i.pinimg.com/736x/62/7d/7a/627d7ac2d198b462f5a558ac49ecfc9f.jpg?height=40&width=40&text=RP",
    },
    {
      id: "#321415d",
      name: "Ram Prakash",
      department: "Cafe Admin",
      mobile: "7799411997",
      email: "ramprakash.123@gmail.com",
      image: "https://i.pinimg.com/736x/62/7d/7a/627d7ac2d198b462f5a558ac49ecfc9f.jpg?height=40&width=40&text=RP",
    },
  ]

  return (
    <div className="bg-white border rounded-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0 mr-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={employee.image || "https://i.pinimg.com/736x/62/7d/7a/627d7ac2d198b462f5a558ac49ecfc9f.jpg"}
                      alt={employee.name}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    <div className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded inline-block">
                      {employee.department}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.mobile}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex space-x-2">
                  <button className="p-1.5 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200">
                    <Eye size={16} />
                  </button>
                  <button className="p-1.5 bg-orange-100 rounded-md text-orange-600 hover:bg-orange-200">
                    <Edit size={16} />
                  </button>
                  <button className="p-1.5 bg-red-100 rounded-md text-red-600 hover:bg-red-200">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-6 py-3 flex items-center justify-between border-t">
        <div className="text-sm text-gray-700">Showing 10 of 46 Results</div>
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-3">Page 1 of 5</span>
          <div className="flex">
            <button className="px-2 py-1 border rounded-l-md bg-gray-100 text-gray-600">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="px-2 py-1 border-t border-b border-r rounded-r-md bg-gray-100 text-gray-600">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
