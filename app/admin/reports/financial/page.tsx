"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, ArrowLeft } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ReportFilters } from "@/components/report-filters"
import { ReportTable } from "@/components/report-table"
import { BarChart } from "@/components/bar-chart"
import { PieChart } from "@/components/pie-chart"

// Sample data for financial reports
const revenueExpenseData = [
  { month: "Jan", revenue: 32500, expenses: 28000, profit: 4500 },
  { month: "Feb", revenue: 34200, expenses: 27800, profit: 6400 },
  { month: "Mar", revenue: 36800, expenses: 29500, profit: 7300 },
  { month: "Apr", revenue: 38629, expenses: 30200, profit: 8429 },
]

const revenueSourcesData = [
  { name: "Consultations", value: 42500 },
  { name: "Laboratory", value: 28700 },
  { name: "Pharmacy", value: 18900 },
  { name: "Procedures", value: 15200 },
  { name: "Admissions", value: 22300 },
]

const paymentMethodsData = [
  { name: "Cash", value: 28500 },
  { name: "Credit Card", value: 35700 },
  { name: "Insurance", value: 52400 },
  { name: "UPI/Mobile", value: 11000 },
]

const invoiceData = [
  {
    id: "INV-2025-042",
    date: "2025-04-12",
    patient: "Emma Thompson",
    patientId: "PT-10234",
    amount: 345.0,
    type: "Consultation",
    paymentMethod: "Credit Card",
    status: "Paid",
  },
  {
    id: "INV-2025-041",
    date: "2025-04-11",
    patient: "James Wilson",
    patientId: "PT-10235",
    amount: 1250.0,
    type: "Laboratory",
    paymentMethod: "Insurance",
    status: "Paid",
  },
  {
    id: "INV-2025-040",
    date: "2025-04-10",
    patient: "Olivia Martinez",
    patientId: "PT-10236",
    amount: 780.5,
    type: "Pharmacy",
    paymentMethod: "Cash",
    status: "Paid",
  },
  {
    id: "INV-2025-039",
    date: "2025-04-09",
    patient: "William Johnson",
    patientId: "PT-10237",
    amount: 2450.0,
    type: "Procedure",
    paymentMethod: "Insurance",
    status: "Pending",
  },
  {
    id: "INV-2025-038",
    date: "2025-04-08",
    patient: "Sophia Brown",
    patientId: "PT-10238",
    amount: 175.0,
    type: "Consultation",
    paymentMethod: "UPI",
    status: "Paid",
  },
]

const expenseData = [
  {
    id: "EXP-2025-028",
    date: "2025-04-10",
    category: "Salaries",
    description: "Staff salaries for April 2025",
    amount: 18500.0,
    approvedBy: "Admin User",
    status: "Paid",
  },
  {
    id: "EXP-2025-027",
    date: "2025-04-08",
    category: "Supplies",
    description: "Medical supplies restocking",
    amount: 3250.0,
    approvedBy: "Admin User",
    status: "Paid",
  },
  {
    id: "EXP-2025-026",
    date: "2025-04-05",
    category: "Utilities",
    description: "Electricity and water bills",
    amount: 1850.0,
    approvedBy: "Admin User",
    status: "Paid",
  },
  {
    id: "EXP-2025-025",
    date: "2025-04-03",
    category: "Equipment",
    description: "New diagnostic equipment",
    amount: 5600.0,
    approvedBy: "Admin User",
    status: "Paid",
  },
  {
    id: "EXP-2025-024",
    date: "2025-04-01",
    category: "Maintenance",
    description: "Building maintenance and repairs",
    amount: 1000.0,
    approvedBy: "Admin User",
    status: "Paid",
  },
]

export default function FinancialReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-800/50 z-10 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="lg:hidden text-gray-600 mr-2">
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/admin/reports">
                <Button variant="ghost" className="flex items-center gap-2 text-gray-600">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Reports
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
              <p className="text-gray-600">Revenue, expenses, and financial performance metrics</p>
            </div>
          </div>

          {/* Filters */}
          <ReportFilters showDepartmentFilter={false} showDoctorFilter={false} />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <BarChart
              title="Revenue, Expenses & Profit"
              data={revenueExpenseData}
              bars={[
                { dataKey: "revenue", fill: "#0e7490", name: "Revenue" },
                { dataKey: "expenses", fill: "#0891b2", name: "Expenses" },
                { dataKey: "profit", fill: "#06b6d4", name: "Profit" },
              ]}
              xAxisDataKey="month"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PieChart
                title="Revenue Sources"
                data={revenueSourcesData}
                dataKey="value"
                nameKey="name"
                colors={["#0e7490", "#0891b2", "#06b6d4", "#22d3ee", "#67e8f9"]}
                height={250}
              />
              <PieChart
                title="Payment Methods"
                data={paymentMethodsData}
                dataKey="value"
                nameKey="name"
                colors={["#0e7490", "#0891b2", "#06b6d4", "#22d3ee"]}
                height={250}
              />
            </div>
          </div>

          {/* Invoice Table */}
          <div className="mb-6">
            <ReportTable
              title="Recent Invoices"
              data={invoiceData}
              columns={[
                { key: "id", header: "Invoice ID" },
                { key: "date", header: "Date" },
                {
                  key: "patient",
                  header: "Patient",
                  cell: (row) => (
                    <div>
                      <div>{row.patient}</div>
                      <div className="text-xs text-gray-500">{row.patientId}</div>
                    </div>
                  ),
                },
                {
                  key: "amount",
                  header: "Amount",
                  cell: (row) => `$${row.amount.toFixed(2)}`,
                  className: "text-right",
                },
                { key: "type", header: "Type" },
                { key: "paymentMethod", header: "Payment Method" },
                {
                  key: "status",
                  header: "Status",
                  cell: (row) => (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  ),
                },
              ]}
              badge={{ text: "Last 30 Days" }}
            />
          </div>

          {/* Expense Table */}
          <div className="mb-6">
            <ReportTable
              title="Recent Expenses"
              data={expenseData}
              columns={[
                { key: "id", header: "Expense ID" },
                { key: "date", header: "Date" },
                { key: "category", header: "Category" },
                { key: "description", header: "Description" },
                {
                  key: "amount",
                  header: "Amount",
                  cell: (row) => `$${row.amount.toFixed(2)}`,
                  className: "text-right",
                },
                { key: "approvedBy", header: "Approved By" },
                {
                  key: "status",
                  header: "Status",
                  cell: (row) => (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  ),
                },
              ]}
              badge={{ text: "Last 30 Days" }}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
