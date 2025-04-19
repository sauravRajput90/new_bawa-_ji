"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InventoryModal } from "@/components/inventory-modal"
import { Search, MoreVertical, Edit, Trash2, FileText, Download, Plus, AlertTriangle, Package } from "lucide-react"

interface Medicine {
  id: number
  medicineName: string
  category: string
  batchNumber: string
  quantity: number
  expiryDate: string
  mrp: number
  vendor: string
  status: "In Stock" | "Low Stock" | "Out of Stock" | "Expiring Soon"
}

export function InventoryTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentMedicine, setCurrentMedicine] = useState<Medicine | null>(null)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")

  // Sample inventory data
  const medicines: Medicine[] = [
    {
      id: 1,
      medicineName: "Paracetamol 500mg",
      category: "Tablet",
      batchNumber: "PCM2023001",
      quantity: 500,
      expiryDate: "2025-06-30",
      mrp: 15.5,
      vendor: "Sun Pharmaceuticals",
      status: "In Stock",
    },
    {
      id: 2,
      medicineName: "Amoxicillin 250mg",
      category: "Capsule",
      batchNumber: "AMX2023045",
      quantity: 200,
      expiryDate: "2024-08-15",
      mrp: 85.75,
      vendor: "Cipla Ltd",
      status: "In Stock",
    },
    {
      id: 3,
      medicineName: "Cetirizine 10mg",
      category: "Tablet",
      batchNumber: "CTZ2023078",
      quantity: 30,
      expiryDate: "2023-12-20",
      mrp: 45.0,
      vendor: "Dr. Reddy's Laboratories",
      status: "Expiring Soon",
    },
    {
      id: 4,
      medicineName: "Omeprazole 20mg",
      category: "Capsule",
      batchNumber: "OMP2023112",
      quantity: 15,
      expiryDate: "2024-05-10",
      mrp: 120.5,
      vendor: "Lupin Ltd",
      status: "Low Stock",
    },
    {
      id: 5,
      medicineName: "Metformin 500mg",
      category: "Tablet",
      batchNumber: "MTF2023089",
      quantity: 350,
      expiryDate: "2025-02-28",
      mrp: 65.25,
      vendor: "Aurobindo Pharma",
      status: "In Stock",
    },
    {
      id: 6,
      medicineName: "Azithromycin 500mg",
      category: "Tablet",
      batchNumber: "AZT2023056",
      quantity: 0,
      expiryDate: "2024-11-15",
      mrp: 180.0,
      vendor: "Zydus Cadila",
      status: "Out of Stock",
    },
    {
      id: 7,
      medicineName: "Ibuprofen 400mg",
      category: "Tablet",
      batchNumber: "IBU2023034",
      quantity: 250,
      expiryDate: "2024-09-20",
      mrp: 25.5,
      vendor: "Torrent Pharmaceuticals",
      status: "In Stock",
    },
    {
      id: 8,
      medicineName: "Cough Syrup",
      category: "Syrup",
      batchNumber: "CSY2023067",
      quantity: 20,
      expiryDate: "2023-11-30",
      mrp: 110.0,
      vendor: "Alkem Laboratories",
      status: "Expiring Soon",
    },
    {
      id: 9,
      medicineName: "Vitamin B Complex",
      category: "Tablet",
      batchNumber: "VBC2023098",
      quantity: 180,
      expiryDate: "2025-01-15",
      mrp: 95.75,
      vendor: "Mankind Pharma",
      status: "In Stock",
    },
    {
      id: 10,
      medicineName: "Insulin Injection",
      category: "Injection",
      batchNumber: "INS2023023",
      quantity: 12,
      expiryDate: "2024-03-25",
      mrp: 450.0,
      vendor: "Glenmark Pharmaceuticals",
      status: "Low Stock",
    },
  ]

  const categories = [
    "Tablet",
    "Capsule",
    "Syrup",
    "Injection",
    "Ointment",
    "Drops",
    "Inhaler",
    "Surgical",
    "Equipment",
    "Other",
  ]
  const statuses = ["In Stock", "Low Stock", "Out of Stock", "Expiring Soon"]

  // Filter medicines based on search term, category, and status
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || medicine.category === categoryFilter
    const matchesStatus = statusFilter === "all" || medicine.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleEdit = (medicine: Medicine) => {
    setCurrentMedicine(medicine)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    // In a real app, you would call an API to delete the medicine
    console.log(`Delete medicine with ID: ${id}`)
    // Then update the UI accordingly
  }

  const handleModalSubmit = (data: any) => {
    console.log("Form submitted:", data)
    // In a real app, you would call an API to add/update the medicine
    // Then update the UI accordingly
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            In Stock
          </Badge>
        )
      case "Low Stock":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            Low Stock
          </Badge>
        )
      case "Out of Stock":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Out of Stock
          </Badge>
        )
      case "Expiring Soon":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            Expiring Soon
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search medicines, batch numbers, vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300"
            />
          </div>
          <div className="flex gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] border-gray-300">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] border-gray-300">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-300">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={() => {
              setCurrentMedicine(null)
              setModalMode("add")
              setIsModalOpen(true)
            }}
            className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Medicine
          </Button>
        </div>
      </div>

      {filteredMedicines.length === 0 ? (
        <div className="border border-dashed rounded-lg p-8 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-gray-500 font-medium mb-1">No Medicines Found</h3>
          <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Medicine Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Batch No.</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Quantity</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Expiry Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">MRP (₹)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMedicines.map((medicine) => (
                  <tr key={medicine.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{medicine.medicineName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{medicine.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{medicine.batchNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{medicine.quantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {new Date(medicine.expiryDate).toLocaleDateString()}
                      {medicine.status === "Expiring Soon" && (
                        <AlertTriangle className="h-4 w-4 text-amber-500 inline ml-1" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{medicine.mrp.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm">{getStatusBadge(medicine.status)}</td>
                    <td className="px-4 py-3 text-sm">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEdit(medicine)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(medicine.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        mode={modalMode}
        initialData={currentMedicine}
      />
    </div>
  )
}
