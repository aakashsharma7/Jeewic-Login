"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", time: "02 PM", value: 14 },
  { name: "Tue", time: "12 PM", value: 12 },
  { name: "Wed", time: "05 PM", value: 17 },
  { name: "Thu", time: "12 PM", value: 12 },
  { name: "Fri", time: "03 PM", value: 15 },
  { name: "Sat", time: "09 PM", value: 21 },
  { name: "Sun", time: "07 AM", value: 7 },
]

export default function PeakHoursChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-64 w-full flex items-center justify-center">Loading chart...</div>
  }

  const timeValues = [6, 9, 12, 15, 18, 21, 24];

  return (
    <div className="p-2 border  rounded-lg shadow-sm w-full max-w-6xl mx-auto">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6B7280' }} 
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              ticks={timeValues}
              tickFormatter={(value) => {
                if (value === 24) return "12 AM";
                if (value === 12) return "12 PM";
                if (value > 12) return `${value - 12} PM`;
                return `${value} AM`;
              }}
              domain={[6, 24]}
            />
            <Tooltip
              formatter={(value) => [`${Number(value) > 12 ? (Number(value) === 24 ? '12 AM' : `${Number(value) - 12} PM`) : (Number(value) === 12 ? '12 PM' : `${value} AM`)}`]}
              labelFormatter={(label) => `${label}`}
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
    </div>
  )
}