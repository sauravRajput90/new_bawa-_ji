import { InventoryManagementCard } from "@/components/inventory-management-card"
import { InventoryTable } from "@/components/inventory-table"

export default function InventoryManagementPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventory & Pharmacy</h1>
          <p className="text-gray-600 mb-6">
            Manage medicine inventory, track stock levels, and handle pharmacy operations.
          </p>
        </div>
      </div>

      <InventoryManagementCard />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Medicine Inventory</h2>
        <InventoryTable />
      </div>
    </div>
  )
}
