import { DollarSign, Users, ShoppingBag } from "lucide-react"

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Total Revenue"
        value="24,000 INR"
        change={12}
        icon={<DollarSign className="h-5 w-5 text-gray-400 " />}
      />
      <MetricCard title="Total Customers" value="196" change={19} icon={<Users className="h-5 w-5 text-gray-400 " />} />
      <MetricCard
        title="Total Items Ordered"
        value="431"
        change={14}
        icon={<ShoppingBag className="h-5 w-5 text-gray-400 " />}
      />
      <MetricCard
        title="Total Revenue"
        value="24,000 INR"
        change={12}
        icon={<DollarSign className="h-5 w-5 text-gray-400 " />}
      />
    </div>
  )
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

function MetricCard({ title, value, change, icon }: MetricCardProps) {
  return (
    <div className="bg-white  border rounded-lg p-4">
      <div className="flex items-center text-gray-400  mb-2">
        {icon}
        <span className="text-sm text-gray-400  ml-2">{title}</span>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl text-black  font-bold">{value}</h3>
        <div className={`flex items-center text-sm ${change > 0 ? "text-green-500" : "text-red-500"}`}>
          <span>
            {change > 0 ? "+" : ""}
            {change}%
          </span>
          <svg
            className={`h-4 w-4 ml-1 ${change > 0 ? "" : "transform rotate-180"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </div>
    </div>
  )
}
