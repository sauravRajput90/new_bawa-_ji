"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Menu,
  Search,
  CreditCard,
  MoreHorizontal,
  FileText,
  Printer,
  Download,
  Eye,
  Calendar,
  DollarSign,
  Check,
} from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"
import { InvoiceViewModal } from "@/components/invoice-view-modal"

// Sample invoice data
const initialInvoices = [
  {
    id: "INV-2025-042",
    patient: "Emma Thompson",
    patientId: "PT-10234",
    date: "Apr 12, 2025",
    amount: 345.0,
    service: "General Consultation",
    status: "Paid",
    doctor: "Dr. Rajesh Sharma",
    department: "Cardiology",
    dueDate: "Apr 19, 2025",
    items: [
      {
        id: "SRV-001",
        description: "General Consultation",
        quantity: 1,
        rate: 345.0,
        amount: 345.0,
      },
    ],
    subtotal: 345.0,
    tax: 0.0,
    discount: 0.0,
    total: 345.0,
    paymentMethod: "Cash",
    notes: "Regular checkup",
  },
  {
    id: "INV-2025-041",
    patient: "James Wilson",
    patientId: "PT-10235",
    date: "Apr 11, 2025",
    amount: 1250.0,
    service: "Laboratory Tests",
    status: "Paid",
    doctor: "Dr. Priya Patel",
    department: "Pathology",
    dueDate: "Apr 18, 2025",
    items: [
      {
        id: "SRV-003",
        description: "Blood Test - Complete Blood Count",
        quantity: 1,
        rate: 800.0,
        amount: 800.0,
      },
      {
        id: "SRV-011",
        description: "Lipid Profile",
        quantity: 1,
        rate: 450.0,
        amount: 450.0,
      },
    ],
    subtotal: 1250.0,
    tax: 0.0,
    discount: 0.0,
    total: 1250.0,
    paymentMethod: "UPI",
    notes: "Annual health checkup",
  },
  {
    id: "INV-2025-040",
    patient: "Olivia Martinez",
    patientId: "PT-10236",
    date: "Apr 10, 2025",
    amount: 780.5,
    service: "X-Ray & Consultation",
    status: "Pending",
    doctor: "Dr. Amit Singh",
    department: "Radiology",
    dueDate: "Apr 17, 2025",
    items: [
      {
        id: "SRV-004",
        description: "X-Ray",
        quantity: 1,
        rate: 600.0,
        amount: 600.0,
      },
      {
        id: "SRV-001",
        description: "General Consultation",
        quantity: 1,
        rate: 180.5,
        amount: 180.5,
      },
    ],
    subtotal: 780.5,
    tax: 0.0,
    discount: 0.0,
    total: 780.5,
    paymentMethod: "Card",
    notes: "Chest X-Ray with consultation",
  },
]

export default function BillingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [invoices, setInvoices] = useState(initialInvoices)
  const [filteredInvoices, setFilteredInvoices] = useState(initialInvoices)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const invoicesPerPage = 5

  // Stats calculations
  const totalRevenue = invoices.reduce((sum, invoice) => (invoice.status === "Paid" ? sum + invoice.amount : sum), 0)

  const pendingPayments = invoices.reduce(
    (sum, invoice) => (invoice.status === "Pending" || invoice.status === "Unpaid" ? sum + invoice.amount : sum),
    0,
  )

  const pendingCount = invoices.filter((invoice) => invoice.status === "Pending" || invoice.status === "Unpaid").length

  const insuranceClaims = 42890 // This would be calculated from actual data in a real app

  // Apply filters when they change
  useEffect(() => {
    let result = [...invoices]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (invoice) =>
          invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.patientId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((invoice) => invoice.status.toLowerCase() === statusFilter.toLowerCase())
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const today = new Date()
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())

      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

      result = result.filter((invoice) => {
        const invoiceDate = new Date(invoice.date)

        switch (dateFilter) {
          case "today":
            return invoiceDate.toDateString() === today.toDateString()
          case "week":
            return invoiceDate >= startOfWeek
          case "month":
            return invoiceDate >= startOfMonth
          default:
            return true
        }
      })
    }

    // Apply payment method filter (in a real app, you would have this data)
    if (paymentMethodFilter !== "all") {
      // This is a placeholder since our sample data doesn't include payment method
      // In a real app, you would filter by the actual payment method
      result = result.filter((invoice) => invoice.paymentMethod.toLowerCase() === paymentMethodFilter.toLowerCase())
    }

    setFilteredInvoices(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [invoices, searchTerm, statusFilter, dateFilter, paymentMethodFilter])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
  }

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value)
  }

  const handlePaymentMethodFilterChange = (value: string) => {
    setPaymentMethodFilter(value)
  }

  const handleMarkAsPaid = (invoiceId: string) => {
    // Update the invoice status to "Paid"
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === invoiceId ? { ...invoice, status: "Paid" } : invoice,
    )

    setInvoices(updatedInvoices)
    setIsViewModalOpen(false)

    toast({
      title: "Success",
      description: `Invoice ${invoiceId} marked as paid`,
    })
  }

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice)
    setIsViewModalOpen(true)
  }

  const handlePrintInvoice = (invoiceId: string) => {
    // In a real app, this would open a print dialog
    toast({
      title: "Print Invoice",
      description: `Printing invoice ${invoiceId}`,
    })
  }

  const handleDownloadPDF = (invoiceId: string) => {
    // In a real app, this would generate and download a PDF
    toast({
      title: "Download PDF",
      description: `Downloading invoice ${invoiceId} as PDF`,
    })
  }

  const handleExportData = () => {
    // In a real application, this would generate a CSV or PDF
    toast({
      title: "Export Data",
      description: "Exporting billing data...",
    })
  }

  // Calculate pagination
  const indexOfLastInvoice = currentPage * invoicesPerPage
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage
  const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice)
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage)

  // Generate page numbers
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
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

            <div className="flex items-center ml-auto space-x-4">
              <div className="relative">
                <Input
                  placeholder="Search invoices..."
                  className="w-[200px] lg:w-[300px] h-9 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t("billing")}</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage invoices, payments, and financial records</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/admin/billing/new">
                <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all">
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t("createInvoice")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                title: t("totalRevenue"),
                value: `₹${totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                icon: <DollarSign className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />,
                change: "+12% from last month",
              },
              {
                title: t("pendingPayments"),
                value: `₹${pendingPayments.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                icon: <CreditCard className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />,
                change: `${pendingCount} invoices pending`,
              },
              {
                title: t("insuranceClaims"),
                value: `₹${insuranceClaims.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                icon: <FileText className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />,
                change: "12 claims in process",
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.change}</p>
                    </div>
                    <div className="bg-cyan-50 dark:bg-cyan-900/30 p-3 rounded-full">{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      placeholder="Search by invoice #, patient name..."
                      className="pl-8 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={handleDateFilterChange}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={paymentMethodFilter} onValueChange={handlePaymentMethodFilterChange}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 dark:border-gray-600 dark:text-white"
                    onClick={handleExportData}
                  >
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice List */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium dark:text-white">
                Recent Invoices
                <Badge className="ml-2 bg-cyan-600">Total: {filteredInvoices.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentInvoices.length > 0 ? (
                  currentInvoices.map((invoice, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center mb-3 md:mb-0">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback className="bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100">
                            {invoice.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium dark:text-white">{invoice.patient}</h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{invoice.patientId}</span>
                            <span className="mx-1">•</span>
                            <span>{invoice.service}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <div className="flex items-center text-sm dark:text-gray-300">
                          <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                          <span>{invoice.id}</span>
                        </div>
                        <div className="flex items-center text-sm dark:text-gray-300">
                          <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                          <span>{invoice.date}</span>
                        </div>
                        <div className="flex items-center text-sm font-medium dark:text-gray-300">
                          <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                          <span>
                            ₹
                            {invoice.amount.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <Badge
                          className={
                            invoice.status === "Paid"
                              ? "bg-green-500"
                              : invoice.status === "Pending"
                                ? "bg-yellow-500"
                                : invoice.status === "Unpaid"
                                  ? "bg-red-500"
                                  : "bg-gray-500"
                          }
                        >
                          {invoice.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                            <DropdownMenuItem
                              onClick={() => handleViewInvoice(invoice)}
                              className="dark:text-gray-300 dark:focus:bg-gray-700"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>{t("viewInvoice")}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handlePrintInvoice(invoice.id)}
                              className="dark:text-gray-300 dark:focus:bg-gray-700"
                            >
                              <Printer className="mr-2 h-4 w-4" />
                              <span>{t("printInvoice")}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDownloadPDF(invoice.id)}
                              className="dark:text-gray-300 dark:focus:bg-gray-700"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              <span>{t("downloadPDF")}</span>
                            </DropdownMenuItem>
                            {(invoice.status === "Pending" || invoice.status === "Unpaid") && (
                              <DropdownMenuItem
                                onClick={() => handleMarkAsPaid(invoice.id)}
                                className="dark:text-gray-300 dark:focus:bg-gray-700"
                              >
                                <Check className="mr-2 h-4 w-4" />
                                <span>Mark as Paid</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No invoices found matching your filters.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredInvoices.length > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {indexOfFirstInvoice + 1} to {Math.min(indexOfLastInvoice, filteredInvoices.length)} of{" "}
                    {filteredInvoices.length} results
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="dark:border-gray-600 dark:text-gray-300"
                    >
                      Previous
                    </Button>
                    {pageNumbers.map((number) => (
                      <Button
                        key={number}
                        variant="outline"
                        size="sm"
                        className={
                          currentPage === number
                            ? "bg-cyan-50 dark:bg-cyan-900/30"
                            : "dark:border-gray-600 dark:text-gray-300"
                        }
                        onClick={() => handlePageChange(number)}
                      >
                        {number}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="dark:border-gray-600 dark:text-gray-300"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Invoice View Modal */}
      <InvoiceViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        invoice={selectedInvoice}
        onMarkAsPaid={handleMarkAsPaid}
        onPrint={() => selectedInvoice && handlePrintInvoice(selectedInvoice.id)}
        onDownload={() => selectedInvoice && handleDownloadPDF(selectedInvoice.id)}
      />
    </div>
  )
}
