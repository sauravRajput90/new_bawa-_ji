"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface InventoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  mode: "add" | "edit"
  initialData?: any
}

export function InventoryModal({ isOpen, onClose, onSubmit, mode, initialData }: InventoryModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(
    initialData?.expiryDate ? new Date(initialData.expiryDate) : undefined,
  )
  const [manufactureDate, setManufactureDate] = useState<Date | undefined>(
    initialData?.manufactureDate ? new Date(initialData.manufactureDate) : undefined,
  )

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

  const vendors = [
    "Sun Pharmaceuticals",
    "Cipla Ltd",
    "Dr. Reddy's Laboratories",
    "Lupin Ltd",
    "Aurobindo Pharma",
    "Zydus Cadila",
    "Torrent Pharmaceuticals",
    "Alkem Laboratories",
    "Mankind Pharma",
    "Glenmark Pharmaceuticals",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = Object.fromEntries(formData.entries())

      onSubmit({
        ...data,
        expiryDate: expiryDate?.toISOString().split("T")[0],
        manufactureDate: manufactureDate?.toISOString().split("T")[0],
        id: initialData?.id || Math.floor(Math.random() * 10000),
      })

      setIsLoading(false)
      onClose()
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {mode === "add" ? "Add New Medicine" : "Edit Medicine"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Add a new medicine or item to the inventory."
              : "Update the details of the existing medicine."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="medicineName" className="text-gray-700">
                Medicine Name
              </Label>
              <Input
                id="medicineName"
                name="medicineName"
                placeholder="Enter medicine name"
                required
                className="border-gray-300"
                defaultValue={initialData?.medicineName || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-700">
                Category
              </Label>
              <Select name="category" defaultValue={initialData?.category || ""} required>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="batchNumber" className="text-gray-700">
                Batch Number
              </Label>
              <Input
                id="batchNumber"
                name="batchNumber"
                placeholder="Enter batch number"
                required
                className="border-gray-300"
                defaultValue={initialData?.batchNumber || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-gray-700">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter quantity"
                required
                min="1"
                className="border-gray-300"
                defaultValue={initialData?.quantity || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufactureDate" className="text-gray-700">
                Manufacture Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-300",
                      !manufactureDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {manufactureDate ? format(manufactureDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={manufactureDate}
                    onSelect={setManufactureDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                name="manufactureDate"
                value={manufactureDate ? format(manufactureDate, "yyyy-MM-dd") : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="text-gray-700">
                Expiry Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-300",
                      !expiryDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expiryDate ? format(expiryDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={expiryDate}
                    onSelect={setExpiryDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              <input type="hidden" name="expiryDate" value={expiryDate ? format(expiryDate, "yyyy-MM-dd") : ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mrp" className="text-gray-700">
                MRP (₹)
              </Label>
              <Input
                id="mrp"
                name="mrp"
                type="number"
                step="0.01"
                placeholder="Enter MRP"
                required
                min="0"
                className="border-gray-300"
                defaultValue={initialData?.mrp || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchasePrice" className="text-gray-700">
                Purchase Price (₹)
              </Label>
              <Input
                id="purchasePrice"
                name="purchasePrice"
                type="number"
                step="0.01"
                placeholder="Enter purchase price"
                required
                min="0"
                className="border-gray-300"
                defaultValue={initialData?.purchasePrice || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendor" className="text-gray-700">
                Vendor
              </Label>
              <Select name="vendor" defaultValue={initialData?.vendor || ""} required>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Vendors</SelectLabel>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor} value={vendor}>
                        {vendor}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reorderLevel" className="text-gray-700">
                Reorder Level
              </Label>
              <Input
                id="reorderLevel"
                name="reorderLevel"
                type="number"
                placeholder="Enter reorder level"
                required
                min="1"
                className="border-gray-300"
                defaultValue={initialData?.reorderLevel || ""}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter medicine description"
              className="min-h-[100px] border-gray-300"
              defaultValue={initialData?.description || ""}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-teal-500 to-cyan-600" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : mode === "add" ? (
                "Add Medicine"
              ) : (
                "Update Medicine"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
