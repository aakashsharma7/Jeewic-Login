"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Boba", value: 35, color: "#4ADE80" },
  { name: "Desserts", value: 15, color: "#A855F7" },
  { name: "Pizzas", value: 25, color: "#F97316" },
  { name: "Sushi", value: 10, color: "#EAB308" },
  { name: "Drinks", value: 10, color: "#3B82F6" },
  { name: "Non-Veg", value: 5, color: "#F97316" },
]

export function SalesDonutChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-64 flex items-center justify-center">Loading chart...</div>
  }

  return (
    <div className="h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.color }}></span>
            <span className="text-xs text-black">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
