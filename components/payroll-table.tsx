"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, FileText, Mail, Printer, DollarSign } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PayrollRecord {
  id: string
  staffId: string
  staffName: string
  profilePhoto?: string
  department: string
  designation: string
  month: string
  year: string
  basicSalary: number
  allowances: number
  deductions: number
  totalSalary: number
  status: string
}

interface PayrollTableProps {
  payrollRecords: PayrollRecord[]
  onGeneratePayslip: (recordId: string) => void
  onSendEmail: (recordId: string) => void
  onPrint: (recordId: string) => void
}

export function PayrollTable({ payrollRecords, onGeneratePayslip, onSendEmail, onPrint }: PayrollTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [monthFilter, setMonthFilter] = useState("")
  const [yearFilter, setYearFilter] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter records based on search, month, year, department and status
  const filteredRecords = payrollRecords.filter((record) => {
    const matchesSearch =
      searchTerm === "" ||
      record.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.staffId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesMonth = monthFilter === "" || record.month === monthFilter
    const matchesYear = yearFilter === "" || record.year === yearFilter

    const matchesDepartment =
      departmentFilter === "all" || record.department.toLowerCase() === departmentFilter.toLowerCase()

    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesMonth && matchesYear && matchesDepartment && matchesStatus
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleMonthFilterChange = (value: string) => {
    setMonthFilter(value)
  }

  const handleYearFilterChange = (value: string) => {
    setYearFilter(value)
  }

  const handleDepartmentFilterChange = (value: string) => {
    setDepartmentFilter(value)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
  }

  const handleExportData = () => {
    // In a real application, this would generate a CSV or PDF
    alert("Exporting payroll data...")
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-500">Processing</Badge>
      default:
        return <Badge className="bg-gray-500">{status}</Badge>
    }
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Input
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8 w-full"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Select value={monthFilter} onValueChange={handleMonthFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
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
          <Select value={yearFilter} onValueChange={handleYearFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={handleDepartmentFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="nursing">Nursing</SelectItem>
              <SelectItem value="reception">Reception</SelectItem>
              <SelectItem value="laboratory">Laboratory</SelectItem>
              <SelectItem value="pharmacy">Pharmacy</SelectItem>
              <SelectItem value="admin">Administration</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-medium text-gray-600">Staff</th>
              <th className="p-3 text-left font-medium text-gray-600">Department</th>
              <th className="p-3 text-left font-medium text-gray-600">Period</th>
              <th className="p-3 text-right font-medium text-gray-600">Basic</th>
              <th className="p-3 text-right font-medium text-gray-600">Allowances</th>
              <th className="p-3 text-right font-medium text-gray-600">Deductions</th>
              <th className="p-3 text-right font-medium text-gray-600">Total</th>
              <th className="p-3 text-center font-medium text-gray-600">Status</th>
              <th className="p-3 text-center font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        {record.profilePhoto ? (
                          <AvatarImage src={record.profilePhoto} alt={record.staffName} />
                        ) : (
                          <AvatarFallback className="bg-orange-100 text-orange-800">
                            {record.staffName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="font-medium">{record.staffName}</div>
                        <div className="text-xs text-gray-500">{record.staffId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">{record.department}</div>
                    <div className="text-xs text-gray-500">{record.designation}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">
                      {record.month} {record.year}
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="text-sm">${record.basicSalary.toFixed(2)}</div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="text-sm">${record.allowances.toFixed(2)}</div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="text-sm">${record.deductions.toFixed(2)}</div>
                  </td>
                  <td className="p-3 text-right">
                    <div className="font-medium">${record.totalSalary.toFixed(2)}</div>
                  </td>
                  <td className="p-3 text-center">{getStatusBadge(record.status)}</td>
                  <td className="p-3">
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <DollarSign className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onGeneratePayslip(record.id)}>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Generate Payslip</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onSendEmail(record.id)}>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Email Payslip</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onPrint(record.id)}>
                            <Printer className="mr-2 h-4 w-4" />
                            <span>Print Payslip</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  No payroll records found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Showing {filteredRecords.length} of {payrollRecords.length} records
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email Selected
          </Button>
          <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
            <DollarSign className="mr-2 h-4 w-4" />
            Generate Payroll
          </Button>
        </div>
      </div>
    </div>
  )
}
