"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, ArrowLeft } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AttendanceTable } from "@/components/attendance-table"

// Sample attendance data
const initialAttendanceRecords = [
  {
    id: "ATT-1001",
    staffId: "EMP-1001",
    staffName: "John Smith",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Nursing",
    designation: "Head Nurse",
    date: "2025-04-05",
    status: "present",
    checkIn: "08:45",
    checkOut: "17:30",
    remarks: "",
  },
  {
    id: "ATT-1002",
    staffId: "EMP-1002",
    staffName: "Sarah Johnson",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Reception",
    designation: "Front Desk Manager",
    date: "2025-04-05",
    status: "present",
    checkIn: "08:30",
    checkOut: "17:15",
    remarks: "",
  },
  {
    id: "ATT-1003",
    staffId: "EMP-1003",
    staffName: "Michael Chen",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Laboratory",
    designation: "Lab Technician",
    date: "2025-04-05",
    status: "absent",
    checkIn: "",
    checkOut: "",
    remarks: "Called in sick",
  },
  {
    id: "ATT-1004",
    staffId: "EMP-1004",
    staffName: "Emily Taylor",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Pharmacy",
    designation: "Pharmacist",
    date: "2025-04-05",
    status: "leave",
    checkIn: "",
    checkOut: "",
    remarks: "Annual leave",
  },
  {
    id: "ATT-1005",
    staffId: "EMP-1005",
    staffName: "Robert Johnson",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Admin",
    designation: "HR Manager",
    date: "2025-04-05",
    status: "present",
    checkIn: "09:15",
    checkOut: "18:00",
    remarks: "Late arrival - traffic",
  },
]

export default function AttendancePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [attendanceRecords, setAttendanceRecords] = useState(initialAttendanceRecords)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleStatusChange = (recordId: string, status: string) => {
    setAttendanceRecords((records) =>
      records.map((record) =>
        record.id === recordId
          ? {
              ...record,
              status,
              // Clear check-in/out times if absent or on leave
              checkIn: status === "absent" || status === "leave" ? "" : record.checkIn,
              checkOut: status === "absent" || status === "leave" ? "" : record.checkOut,
            }
          : record,
      ),
    )
  }

  const handleTimeChange = (recordId: string, field: "checkIn" | "checkOut", value: string) => {
    setAttendanceRecords((records) =>
      records.map((record) => (record.id === recordId ? { ...record, [field]: value } : record)),
    )
  }

  const handleRemarksChange = (recordId: string, remarks: string) => {
    setAttendanceRecords((records) =>
      records.map((record) => (record.id === recordId ? { ...record, remarks } : record)),
    )
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

            <div className="flex items-center ml-auto space-x-2">
              <Link href="/admin/staff/attendance/report">
                <Button variant="outline">Monthly Report</Button>
              </Link>
              <Link href="/admin/staff/attendance/leave">
                <Button variant="outline">Leave Management</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Daily Attendance</h1>
              <p className="text-gray-600">Mark and manage staff attendance</p>
            </div>
          </div>

          {/* Attendance Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Attendance Sheet
                <Badge className="ml-2 bg-cyan-600">Today: {new Date().toLocaleDateString()}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceTable
                attendanceRecords={attendanceRecords}
                onStatusChange={handleStatusChange}
                onTimeChange={handleTimeChange}
                onRemarksChange={handleRemarksChange}
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
