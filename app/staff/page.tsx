import { Breadcrumb } from "@/components/breadcrumb"

export default function StaffPage() {
  return (
    <>
      <Breadcrumb items={["Others", "Staff Management"]} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Staff Management Page</h1>
        <p className="mt-4 text-black">This page is currently under development.</p>
      </main>
    </>
  )
}
