import { Users, DollarSign } from "lucide-react"

export function EmployeeMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Employees"
        value="11"
        change={4}
        changeLabel="Last Week"
        icon={<Users className="h-5 w-5 text-gray-500" />}
      />
      <MetricCard
              title="Active Employees"
              value="6"
              icon={<Users className="h-5 w-5 text-gray-500" />}
              showChange={false} change={0}      />
      <MetricCard
        title="Customers Saved"
        value="₹ 19,718"
        change={14}
        icon={<DollarSign className="h-5 w-5 text-gray-500" />}
      />
      <MetricCard
        title="Total Revenue"
        value="24,000 INR"
        change={12}
        icon={<DollarSign className="h-5 w-5 text-gray-500" />}
      />
    </div>
  )
}

function MetricCard({ title, value, change, changeLabel = "", icon, showChange = true }: { title: string, value: string, change: number, changeLabel?: string, icon: React.ReactNode, showChange?: boolean }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-center mb-2">
        {icon}
        <span className="text-sm text-gray-500 ml-2">{title}</span>
      </div>
      <div className="flex items-center justify-start gap-4">
        <h3 className="text-2xl text-gray-950 font-bold">{value}</h3>
        {showChange && (
          <div className={`flex items-center text-sm ${change > 0 ? "text-green-500" : "text-red-500"}`}>
            <span>
              {change > 0 ? "+" : ""}
              {change}%
            </span>
            {changeLabel && <span className="ml-1 text-green-500">{changeLabel}</span>}
            {!changeLabel && (
              <svg
                className={`h-4 w-4 ml-1 ${change > 0 ? "" : "transform rotate-180"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


