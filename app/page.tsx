"use client";

import { Breadcrumb } from "@/components/breadcrumb"
import { MetricCards } from "@/components/metric-cards"
import { RevenueChart } from "@/components/revenue-chart"
import { SalesDonutChart } from "@/components/sales-donut-chart"
import PeakHoursChart from "@/components/peak-hour-chart"
import { MostSoldItems } from "@/components/most-sold-items"
import { ProductCards } from "@/components/product-cards"
import { useAuth } from "@/hooks/useAuth"
import { CustomSelect } from "@/components/ui/select"

const timeRangeOptions = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 90 Days", value: "90d" },
]

const categoryOptions = [
  { label: "Boba", value: "boba" },
  { label: "Desserts", value: "desserts" },
  { label: "Pizzas", value: "pizzas" },
  { label: "Sushi", value: "sushi" },
]

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>You dont have access to this page</div>;
  }

  return (
    <>
      <Breadcrumb items={["Cafe", "Overview"]} />
      <main className="flex-1 p-6">
        <MetricCards />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm text-gray-500">Over the days</h3>
              <CustomSelect options={timeRangeOptions} defaultValue="7d" />
            </div>
            <RevenueChart />
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm text-gray-500">Sales by Category or Products</h3>
              <CustomSelect options={timeRangeOptions} defaultValue="7d" />
            </div>
            <SalesDonutChart />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm text-gray-500">Peak Operating Hours</h3>
              <CustomSelect options={timeRangeOptions} defaultValue="7d" />
            </div>
            <PeakHoursChart />
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm text-gray-500">Most sold items by Category</h3>
              <div className="flex gap-2">
                <CustomSelect options={timeRangeOptions} defaultValue="7d" />
                <CustomSelect options={categoryOptions} defaultValue="boba" />
              </div>
            </div>
            <MostSoldItems />
            <ProductCards />
          </div>
        </div>
      </main>
    </>
  )
}