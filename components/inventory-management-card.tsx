"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InventoryModal } from "@/components/inventory-modal"
import { Package, AlertTriangle, TrendingDown, Plus } from "lucide-react"

export function InventoryManagementCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (data: any) => {
    console.log("Inventory Data:", data)
    // Here you would typically send this data to your backend
  }

  return (
    <>
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center text-xl">
            <Package className="mr-2 h-5 w-5" />
            Inventory & Pharmacy
          </CardTitle>
          <CardDescription className="text-teal-100">Manage medicine stock, sales, and purchases</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-cyan-50 p-4 rounded-lg flex items-center">
              <div className="bg-cyan-100 p-3 rounded-full mr-3">
                <Package className="h-6 w-6 text-cyan-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-2xl font-bold text-gray-800">1,248</p>
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg flex items-center">
              <div className="bg-amber-100 p-3 rounded-full mr-3">
                <AlertTriangle className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Low Stock</p>
                <p className="text-2xl font-bold text-gray-800">24</p>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg flex items-center">
              <div className="bg-red-100 p-3 rounded-full mr-3">
                <TrendingDown className="h-6 w-6 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-800">18</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Quick Actions</h3>
              <p className="text-sm text-gray-500">Add new medicines or manage inventory</p>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white shadow hover:shadow-md"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Medicine
            </Button>
          </div>
        </CardContent>
      </Card>

      <InventoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} mode="add" />
    </>
  )
}
