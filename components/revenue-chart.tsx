"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Tue", value: 40000 },
  { name: "Wed", value: 60000 },
  { name: "Thu", value: 40000 },
  { name: "Fri", value: 50000 },
  { name: "Sat", value: 80000 },
  { name: "Sun", value: 20000 },
  { name: "Mon", value: 45000 },
]

export function RevenueChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-64 flex items-center justify-center">Loading chart...</div>
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip
            formatter={(value) => [`${value} INR`, "Revenue"]}
            contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#F97316"
            strokeWidth={2}
            dot={{ r: 4, fill: "#F97316", strokeWidth: 2, stroke: "#FFF" }}
            activeDot={{ r: 6, fill: "#F97316", strokeWidth: 2, stroke: "#FFF" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
