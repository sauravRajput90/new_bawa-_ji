"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Menu, ArrowLeft, Save, X, Plus, Minus, Calculator } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { useLanguage } from "@/components/language-provider"

// Sample data for dropdowns
const patients = [
  { id: "PT-10234", name: "Emma Thompson" },
  { id: "PT-10235", name: "James Wilson" },
  { id: "PT-10236", name: "Olivia Martinez" },
  { id: "PT-10237", name: "William Johnson" },
  { id: "PT-10238", name: "Sophia Brown" },
]

const doctors = [
  { id: "DOC-001", name: "Dr. Rajesh Sharma", department: "Cardiology" },
  { id: "DOC-002", name: "Dr. Priya Patel", department: "Pediatrics" },
  { id: "DOC-003", name: "Dr. Amit Singh", department: "Orthopedics" },
  { id: "DOC-004", name: "Dr. Neha Gupta", department: "Gynecology" },
  { id: "DOC-005", name: "Dr. Vikram Desai", department: "Neurology" },
]

const services = [
  { id: "SRV-001", name: "General Consultation", defaultRate: 500 },
  { id: "SRV-002", name: "Specialist Consultation", defaultRate: 1000 },
  { id: "SRV-003", name: "Blood Test - Complete Blood Count", defaultRate: 800 },
  { id: "SRV-004", name: "X-Ray", defaultRate: 1200 },
  { id: "SRV-005", name: "ECG", defaultRate: 600 },
  { id: "SRV-006", name: "Ultrasound", defaultRate: 1500 },
  { id: "SRV-007", name: "MRI Scan", defaultRate: 5000 },
  { id: "SRV-008", name: "CT Scan", defaultRate: 4000 },
  { id: "SRV-009", name: "Physiotherapy Session", defaultRate: 700 },
  { id: "SRV-010", name: "Vaccination", defaultRate: 400 },
]

interface ServiceItem {
  id: string
  name: string
  quantity: number
  rate: number
  amount: number
}

export default function CreateInvoicePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [invoiceDate, setInvoiceDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [dueDate, setDueDate] = useState(format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"))
  const [paymentMethod, setPaymentMethod] = useState("")
  const [notes, setNotes] = useState("")
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([
    { id: "", name: "", quantity: 1, rate: 0, amount: 0 },
  ])
  const [subtotal, setSubtotal] = useState(0)
  const [taxRate, setTaxRate] = useState(18) // GST rate
  const [taxAmount, setTaxAmount] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [markAsPaid, setMarkAsPaid] = useState(false)

  // Generate invoice number on component mount
  useEffect(() => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const randomNum = Math.floor(Math.random() * 1000)
    setInvoiceNumber(`INV-${year}-${month}-${String(randomNum).padStart(3, "0")}`)
  }, [])

  // Calculate totals whenever service items, tax rate, or discount changes
  useEffect(() => {
    const calculatedSubtotal = serviceItems.reduce((sum, item) => sum + item.amount, 0)
    const calculatedTaxAmount = (calculatedSubtotal * taxRate) / 100
    const calculatedTotal = calculatedSubtotal + calculatedTaxAmount - discount

    setSubtotal(calculatedSubtotal)
    setTaxAmount(calculatedTaxAmount)
    setTotal(calculatedTotal)
  }, [serviceItems, taxRate, discount])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handlePatientChange = (value: string) => {
    setSelectedPatient(value)
  }

  const handleDoctorChange = (value: string) => {
    setSelectedDoctor(value)
    // Auto-fill department based on selected doctor
    const doctor = doctors.find((doc) => doc.id === value)
    if (doctor) {
      // You could set department here if needed
    }
  }

  const handleServiceChange = (index: number, serviceId: string) => {
    const service = services.find((s) => s.id === serviceId)
    if (service) {
      const updatedItems = [...serviceItems]
      updatedItems[index] = {
        ...updatedItems[index],
        id: service.id,
        name: service.name,
        rate: service.defaultRate,
        amount: service.defaultRate * updatedItems[index].quantity,
      }
      setServiceItems(updatedItems)
    }
  }

  const handleQuantityChange = (index: number, quantity: number) => {
    if (quantity < 1) quantity = 1
    const updatedItems = [...serviceItems]
    updatedItems[index] = {
      ...updatedItems[index],
      quantity,
      amount: updatedItems[index].rate * quantity,
    }
    setServiceItems(updatedItems)
  }

  const handleRateChange = (index: number, rate: number) => {
    if (rate < 0) rate = 0
    const updatedItems = [...serviceItems]
    updatedItems[index] = {
      ...updatedItems[index],
      rate,
      amount: rate * updatedItems[index].quantity,
    }
    setServiceItems(updatedItems)
  }

  const addServiceItem = () => {
    setServiceItems([...serviceItems, { id: "", name: "", quantity: 1, rate: 0, amount: 0 }])
  }

  const removeServiceItem = (index: number) => {
    if (serviceItems.length > 1) {
      const updatedItems = serviceItems.filter((_, i) => i !== index)
      setServiceItems(updatedItems)
    }
  }

  const calculateTotals = () => {
    const calculatedSubtotal = serviceItems.reduce((sum, item) => sum + item.amount, 0)
    const calculatedTaxAmount = (calculatedSubtotal * taxRate) / 100
    const calculatedTotal = calculatedSubtotal + calculatedTaxAmount - discount

    setSubtotal(calculatedSubtotal)
    setTaxAmount(calculatedTaxAmount)
    setTotal(calculatedTotal)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!selectedPatient) {
      toast({
        title: "Error",
        description: "Please select a patient",
        variant: "destructive",
      })
      return
    }

    if (!selectedDoctor) {
      toast({
        title: "Error",
        description: "Please select a doctor",
        variant: "destructive",
      })
      return
    }

    if (serviceItems.some((item) => !item.id)) {
      toast({
        title: "Error",
        description: "Please select all services",
        variant: "destructive",
      })
      return
    }

    if (!paymentMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call to save invoice
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Success",
        description: "Invoice Created Successfully",
      })

      // Redirect to billing dashboard
      router.push("/admin/billing")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-800/50 z-10 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="lg:hidden text-gray-600 dark:text-gray-300">
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                onClick={() => router.push("/admin/billing")}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Billing
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/billing")}
                disabled={isLoading}
                className="dark:border-gray-600 dark:text-gray-300"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700 text-white"
                disabled={isLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Saving..." : "Save Invoice"}
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t("createInvoice")}</h1>
            <p className="text-gray-600 dark:text-gray-300">Enter invoice details to create a new billing record</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Invoice Details */}
              <Card className="lg:col-span-2 dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="dark:text-white">Invoice Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="invoiceNumber" className="dark:text-white">
                        Invoice Number
                      </Label>
                      <Input
                        id="invoiceNumber"
                        value={invoiceNumber}
                        readOnly
                        className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invoiceDate" className="dark:text-white">
                        Invoice Date
                      </Label>
                      <Input
                        id="invoiceDate"
                        type="date"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient" className="dark:text-white">
                        Patient <span className="text-red-500">*</span>
                      </Label>
                      <Select value={selectedPatient} onValueChange={handlePatientChange}>
                        <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue placeholder="Select patient" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          {patients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id}>
                              {patient.name} ({patient.id})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate" className="dark:text-white">
                        Due Date
                      </Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor" className="dark:text-white">
                        Doctor <span className="text-red-500">*</span>
                      </Label>
                      <Select value={selectedDoctor} onValueChange={handleDoctorChange}>
                        <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue placeholder="Select doctor" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id}>
                              {doctor.name} - {doctor.department}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod" className="dark:text-white">
                        Payment Method <span className="text-red-500">*</span>
                      </Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="upi">UPI</SelectItem>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="insurance">Insurance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Service Items */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium dark:text-white">Service Details</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addServiceItem}
                        className="dark:border-gray-600 dark:text-white"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Service
                      </Button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                            <th className="p-2 font-medium text-gray-600 dark:text-gray-300">Service</th>
                            <th className="p-2 font-medium text-gray-600 dark:text-gray-300 w-20">Qty</th>
                            <th className="p-2 font-medium text-gray-600 dark:text-gray-300 w-32">Rate (₹)</th>
                            <th className="p-2 font-medium text-gray-600 dark:text-gray-300 w-32">Amount (₹)</th>
                            <th className="p-2 w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {serviceItems.map((item, index) => (
                            <tr key={index} className="border-b dark:border-gray-700">
                              <td className="p-2">
                                <Select value={item.id} onValueChange={(value) => handleServiceChange(index, value)}>
                                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <SelectValue placeholder="Select service" />
                                  </SelectTrigger>
                                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                    {services.map((service) => (
                                      <SelectItem key={service.id} value={service.id}>
                                        {service.name} (₹{service.defaultRate})
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="p-2">
                                <Input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(index, Number.parseInt(e.target.value))}
                                  className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                              </td>
                              <td className="p-2">
                                <Input
                                  type="number"
                                  min="0"
                                  value={item.rate}
                                  onChange={(e) => handleRateChange(index, Number.parseFloat(e.target.value))}
                                  className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                              </td>
                              <td className="p-2">
                                <Input
                                  value={item.amount.toFixed(2)}
                                  readOnly
                                  className="w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                />
                              </td>
                              <td className="p-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeServiceItem(index)}
                                  disabled={serviceItems.length === 1}
                                  className="dark:text-gray-300"
                                >
                                  <Minus className="h-4 w-4 text-red-500" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mt-6 space-y-2">
                    <Label htmlFor="notes" className="dark:text-white">
                      Invoice Notes / Description
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any additional notes or payment instructions..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Right Column - Summary */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="dark:text-white">Invoice Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                      <span className="font-medium dark:text-white">₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taxRate" className="dark:text-white">
                        Tax Rate (GST %)
                      </Label>
                      <div className="flex items-center">
                        <Input
                          id="taxRate"
                          type="number"
                          min="0"
                          max="100"
                          value={taxRate}
                          onChange={(e) => setTaxRate(Number.parseFloat(e.target.value))}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="ml-2 dark:text-gray-300"
                          onClick={calculateTotals}
                        >
                          <Calculator className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">Tax Amount:</span>
                      <span className="dark:text-white">₹{taxAmount.toFixed(2)}</span>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="discount" className="dark:text-white">
                        Discount Amount (₹)
                      </Label>
                      <Input
                        id="discount"
                        type="number"
                        min="0"
                        value={discount}
                        onChange={(e) => setDiscount(Number.parseFloat(e.target.value))}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-t border-dashed dark:border-gray-700">
                      <span className="text-lg font-medium dark:text-white">Total Amount:</span>
                      <span className="text-lg font-bold dark:text-white">₹{total.toFixed(2)}</span>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="markAsPaid"
                          checked={markAsPaid}
                          onCheckedChange={(checked) => setMarkAsPaid(checked as boolean)}
                          className="dark:border-gray-500"
                        />
                        <Label htmlFor="markAsPaid" className="text-sm font-medium dark:text-gray-300">
                          Mark as paid upon creation
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700 text-white mt-4"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Invoice..." : "Create Invoice"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
