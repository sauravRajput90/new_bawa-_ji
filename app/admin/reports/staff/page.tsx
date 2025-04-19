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

// Sample data for staff reports
const attendanceData = [
  { department: "Nursing", present: 18, absent: 2, leave: 1, halfDay: 1 },
  { department: "Reception", present: 8, absent: 0, leave: 1, halfDay: 0 },
  { department: "Laboratory", present: 12, absent: 1, leave: 0, halfDay: 1 },
  { department: "Pharmacy", present: 10, absent: 1, leave: 0, halfDay: 0 },
  { department: "Admin", present: 6, absent: 0, leave: 0, halfDay: 0 },
  { department: "Housekeeping", present: 14, absent: 2, leave: 1, halfDay: 0 },
]

const leavesData = [
  { month: "Jan", casual: 12, sick: 8, other: 3 },
  { month: "Feb", casual: 10, sick: 6, other: 2 },
  { month: "Mar", casual: 8, sick: 10, other: 4 },
  { month: "Apr", casual: 11, sick: 7, other: 3 },
]

const salaryDistributionData = [
  { name: "Nursing", value: 42500 },
  { name: "Reception", value: 18700 },
  { name: "Laboratory", value: 22900 },
  { name: "Pharmacy", value: 19200 },
  { name: "Admin", value: 15300 },
  { name: "Housekeeping", value: 12400 },
]

const staffAttendanceData = [
  {
    id: "EMP-1001",
    name: "John Smith",
    department: "Nursing",
    designation: "Head Nurse",
    present: 22,
    absent: 0,
    leave: 0,
    halfDay: 0,
    lateMarks: 2,
    attendancePercentage: "100%",
  },
  {
    id: "EMP-1002",
    name: "Sarah Johnson",
    department: "Reception",
    designation: "Front Desk Manager",
    present: 20,
    absent: 0,
    leave: 2,
    halfDay: 0,
    lateMarks: 1,
    attendancePercentage: "91%",
  },
  {
    id: "EMP-1003",
    name: "Michael Chen",
    department: "Laboratory",
    designation: "Lab Technician",
    present: 18,
    absent: 1,
    leave: 2,
    halfDay: 1,
    lateMarks: 3,
    attendancePercentage: "82%",
  },
  {
    id: "EMP-1004",
    name: "Emily Taylor",
    department: "Pharmacy",
    designation: "Pharmacist",
    present: 21,
    absent: 0,
    leave: 1,
    halfDay: 0,
    lateMarks: 0,
    attendancePercentage: "95%",
  },
  {
    id: "EMP-1005",
    name: "Robert Johnson",
    department: "Admin",
    designation: "HR Manager",
    present: 22,
    absent: 0,
    leave: 0,
    halfDay: 0,
    lateMarks: 0,
    attendancePercentage: "100%",
  },
]

const salaryData = [
  {
    id: "EMP-1001",
    name: "John Smith",
    department: "Nursing",
    designation: "Head Nurse",
    basicSalary: 3500,
    allowances: 800,
    deductions: 450,
    totalSalary: 3850,
    bankAccount: "XXXX4567",
    status: "Paid",
  },
  {
    id: "EMP-1002",
    name: "Sarah Johnson",
    department: "Reception",
    designation: "Front Desk Manager",
    basicSalary: 2800,
    allowances: 600,
    deductions: 350,
    totalSalary: 3050,
    bankAccount: "XXXX5678",
    status: "Paid",
  },
  {
    id: "EMP-1003",
    name: "Michael Chen",
    department: "Laboratory",
    designation: "Lab Technician",
    basicSalary: 2500,
    allowances: 500,
    deductions: 300,
    totalSalary: 2700,
    bankAccount: "XXXX6789",
    status: "Paid",
  },
  {
    id: "EMP-1004",
    name: "Emily Taylor",
    department: "Pharmacy",
    designation: "Pharmacist",
    basicSalary: 3200,
    allowances: 700,
    deductions: 400,
    totalSalary: 3500,
    bankAccount: "XXXX7890",
    status: "Paid",
  },
  {
    id: "EMP-1005",
    name: "Robert Johnson",
    department: "Admin",
    designation: "HR Manager",
    basicSalary: 3800,
    allowances: 900,
    deductions: 500,
    totalSalary: 4200,
    bankAccount: "XXXX8901",
    status: "Paid",
  },
]

export default function StaffReportsPage() {
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
              <h1 className="text-2xl font-bold text-gray-800">Staff Reports</h1>
              <p className="text-gray-600">Staff attendance, leaves, and payroll analytics</p>
            </div>
          </div>

          {/* Filters */}
          <ReportFilters showDoctorFilter={false} />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <BarChart
              title="Department-wise Attendance"
              data={attendanceData}
              bars={[
                { dataKey: "present", fill: "#0e7490", name: "Present" },
                { dataKey: "absent", fill: "#ef4444", name: "Absent" },
                { dataKey: "leave", fill: "#f59e0b", name: "Leave" },
                { dataKey: "halfDay", fill: "#3b82f6", name: "Half Day" },
              ]}
              xAxisDataKey="department"
              stacked={true}
            />
            <BarChart
              title="Monthly Leave Distribution"
              data={leavesData}
              bars={[
                { dataKey: "casual", fill: "#0e7490", name: "Casual Leave" },
                { dataKey: "sick", fill: "#f59e0b", name: "Sick Leave" },
                { dataKey: "other", fill: "#3b82f6", name: "Other Leave" },
              ]}
              xAxisDataKey="month"
              stacked={true}
            />
          </div>

          <div className="mb-6">
            <PieChart
              title="Salary Distribution by Department"
              data={salaryDistributionData}
              dataKey="value"
              nameKey="name"
              colors={["#0e7490", "#0891b2", "#06b6d4", "#22d3ee", "#67e8f9", "#a5f3fc"]}
              height={300}
            />
          </div>

          {/* Staff Attendance Table */}
          <div className="mb-6">
            <ReportTable
              title="Staff Attendance Summary"
              data={staffAttendanceData}
              columns={[
                { key: "id", header: "Staff ID" },
                { key: "name", header: "Name" },
                { key: "department", header: "Department" },
                { key: "designation", header: "Designation" },
                { key: "present", header: "Present Days" },
                { key: "absent", header: "Absent" },
                { key: "leave", header: "Leave" },
                { key: "halfDay", header: "Half Day" },
                { key: "lateMarks", header: "Late Marks" },
                {
                  key: "attendancePercentage",
                  header: "Attendance %",
                  cell: (row) => (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        Number.parseInt(row.attendancePercentage) >= 90
                          ? "bg-green-100 text-green-800"
                          : Number.parseInt(row.attendancePercentage) >= 80
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {row.attendancePercentage}
                    </span>
                  ),
                },
              ]}
              badge={{ text: "April 2025" }}
            />
          </div>

          {/* Salary Table */}
          <div className="mb-6">
            <ReportTable
              title="Salary Disbursement"
              data={salaryData}
              columns={[
                { key: "id", header: "Staff ID" },
                { key: "name", header: "Name" },
                { key: "department", header: "Department" },
                { key: "designation", header: "Designation" },
                {
                  key: "basicSalary",
                  header: "Basic Salary",
                  cell: (row) => `$${row.basicSalary.toFixed(2)}`,
                  className: "text-right",
                },
                {
                  key: "allowances",
                  header: "Allowances",
                  cell: (row) => `$${row.allowances.toFixed(2)}`,
                  className: "text-right",
                },
                {
                  key: "deductions",
                  header: "Deductions",
                  cell: (row) => `$${row.deductions.toFixed(2)}`,
                  className: "text-right",
                },
                {
                  key: "totalSalary",
                  header: "Total Salary",
                  cell: (row) => `$${row.totalSalary.toFixed(2)}`,
                  className: "text-right font-medium",
                },
                { key: "bankAccount", header: "Bank Account" },
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
              badge={{ text: "April 2025" }}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
