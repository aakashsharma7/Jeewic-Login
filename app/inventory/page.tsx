import { Breadcrumb } from "@/components/breadcrumb"
import { ProductsTable } from "@/components/inventory/products-table"

export default function InventoryPage() {
  return (
    <>
      <Breadcrumb items={["Convenience", "Products"]} />
      <main className="flex-1 p-6">
        <ProductsTable />
      </main>
    </>
  )
}
