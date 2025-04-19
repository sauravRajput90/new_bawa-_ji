"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, ArrowLeft, Calendar } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { PayrollTable } from "@/components/payroll-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample payroll data
const initialPayrollRecords = [
  {
    id: "PAY-1001",
    staffId: "EMP-1001",
    staffName: "John Smith",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Nursing",
    designation: "Head Nurse",
    month: "April",
    year: "2025",
    basicSalary: 4500,
    allowances: 800,
    deductions: 650,
    totalSalary: 4650,
    status: "paid",
  },
  {
    id: "PAY-1002",
    staffId: "EMP-1002",
    staffName: "Sarah Johnson",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Reception",
    designation: "Front Desk Manager",
    month: "April",
    year: "2025",
    basicSalary: 3800,
    allowances: 600,
    deductions: 550,
    totalSalary: 3850,
    status: "paid",
  },
  {
    id: "PAY-1003",
    staffId: "EMP-1003",
    staffName: "Michael Chen",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Laboratory",
    designation: "Lab Technician",
    month: "April",
    year: "2025",
    basicSalary: 3200,
    allowances: 450,
    deductions: 480,
    totalSalary: 3170,
    status: "pending",
  },
  {
    id: "PAY-1004",
    staffId: "EMP-1004",
    staffName: "Emily Taylor",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Pharmacy",
    designation: "Pharmacist",
    month: "April",
    year: "2025",
    basicSalary: 4200,
    allowances: 700,
    deductions: 630,
    totalSalary: 4270,
    status: "processing",
  },
  {
    id: "PAY-1005",
    staffId: "EMP-1005",
    staffName: "Robert Johnson",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Admin",
    designation: "HR Manager",
    month: "April",
    year: "2025",
    basicSalary: 5000,
    allowances: 1000,
    deductions: 750,
    totalSalary: 5250,
    status: "paid",
  },
]

export default function PayrollPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [payrollRecords, setPayrollRecords] = useState(initialPayrollRecords)
  const [currentMonth, setCurrentMonth] = useState("April")
  const [currentYear, setCurrentYear] = useState("2025")

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleGeneratePayslip = (recordId: string) => {
    // In a real app, this would generate a PDF payslip
    alert(`Generating payslip for record ID: ${recordId}`)
  }

  const handleSendEmail = (recordId: string) => {
    // In a real app, this would send an email with the payslip
    alert(`Sending payslip email for record ID: ${recordId}`)
  }

  const handlePrint = (recordId: string) => {
    // In a real app, this would print the payslip
    alert(`Printing payslip for record ID: ${recordId}`)
  }

  const handleMonthChange = (value: string) => {
    setCurrentMonth(value)
    // In a real app, this would fetch payroll data for the selected month
  }

  const handleYearChange = (value: string) => {
    setCurrentYear(value)
    // In a real app, this would fetch payroll data for the selected year
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
              <Link href="/admin/staff">
                <Button variant="ghost" className="flex items-center gap-2 text-gray-600">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Staff
                </Button>
              </Link>
            </div>

            <div className="flex items-center ml-auto space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Select value={currentMonth} onValueChange={handleMonthChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="January">January</SelectItem>
                    <SelectItem value="February">February</SelectItem>
                    <SelectItem value="March">March</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="May">May</SelectItem>
                    <SelectItem value="June">June</SelectItem>
                    <SelectItem value="July">July</SelectItem>
                    <SelectItem value="August">August</SelectItem>
                    <SelectItem value="September">September</SelectItem>
                    <SelectItem value="October">October</SelectItem>
                    <SelectItem value="November">November</SelectItem>
                    <SelectItem value="December">December</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={currentYear} onValueChange={handleYearChange}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">Generate Payroll</Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Payroll Management</h1>
              <p className="text-gray-600">Manage salary processing and payslips</p>
            </div>
          </div>

          {/* Payroll Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Payroll Records
                <Badge className="ml-2 bg-cyan-600">
                  {currentMonth} {currentYear}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PayrollTable
                payrollRecords={payrollRecords}
                onGeneratePayslip={handleGeneratePayslip}
                onSendEmail={handleSendEmail}
                onPrint={handlePrint}
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
