"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface AttendanceRecord {
  id: string
  staffId: string
  staffName: string
  profilePhoto?: string
  department: string
  designation: string
  date: string
  status: string
  checkIn?: string
  checkOut?: string
  remarks?: string
}

interface AttendanceTableProps {
  attendanceRecords: AttendanceRecord[]
  onStatusChange: (recordId: string, status: string) => void
  onTimeChange: (recordId: string, field: "checkIn" | "checkOut", value: string) => void
  onRemarksChange: (recordId: string, remarks: string) => void
}

export function AttendanceTable({
  attendanceRecords,
  onStatusChange,
  onTimeChange,
  onRemarksChange,
}: AttendanceTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split("T")[0])
  const [departmentFilter, setDepartmentFilter] = useState("all")

  // Filter records based on search, date and department
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      searchTerm === "" ||
      record.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.staffId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = dateFilter === "" || record.date === dateFilter

    const matchesDepartment =
      departmentFilter === "all" || record.department.toLowerCase() === departmentFilter.toLowerCase()

    return matchesSearch && matchesDate && matchesDepartment
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value)
  }

  const handleDepartmentFilterChange = (value: string) => {
    setDepartmentFilter(value)
  }

  const handleExportData = () => {
    // In a real application, this would generate a CSV or PDF
    alert("Exporting attendance data...")
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "present":
        return <Badge className="bg-green-500">Present</Badge>
      case "absent":
        return <Badge className="bg-red-500">Absent</Badge>
      case "leave":
        return <Badge className="bg-yellow-500">On Leave</Badge>
      case "half-day":
        return <Badge className="bg-blue-500">Half Day</Badge>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Input type="date" value={dateFilter} onChange={handleDateFilterChange} className="w-full" />
          </div>
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
              <SelectItem value="housekeeping">Housekeeping</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-medium text-gray-600">Staff</th>
              <th className="p-3 text-left font-medium text-gray-600">Department</th>
              <th className="p-3 text-left font-medium text-gray-600">Status</th>
              <th className="p-3 text-left font-medium text-gray-600">Check In</th>
              <th className="p-3 text-left font-medium text-gray-600">Check Out</th>
              <th className="p-3 text-left font-medium text-gray-600">Remarks</th>
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
                    <Select value={record.status} onValueChange={(value) => onStatusChange(record.id, value)}>
                      <SelectTrigger className="h-8 w-28">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="leave">On Leave</SelectItem>
                        <SelectItem value="half-day">Half Day</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-3">
                    <Input
                      type="time"
                      value={record.checkIn || ""}
                      onChange={(e) => onTimeChange(record.id, "checkIn", e.target.value)}
                      className="h-8 w-28"
                      disabled={record.status === "absent" || record.status === "leave"}
                    />
                  </td>
                  <td className="p-3">
                    <Input
                      type="time"
                      value={record.checkOut || ""}
                      onChange={(e) => onTimeChange(record.id, "checkOut", e.target.value)}
                      className="h-8 w-28"
                      disabled={record.status === "absent" || record.status === "leave"}
                    />
                  </td>
                  <td className="p-3">
                    <Input
                      value={record.remarks || ""}
                      onChange={(e) => onRemarksChange(record.id, e.target.value)}
                      className="h-8"
                      placeholder="Add remarks..."
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No attendance records found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="mark-all-present" />
            <Label htmlFor="mark-all-present">Mark All Present</Label>
          </div>
          <Button variant="outline" size="sm">
            Apply Bulk Action
          </Button>
        </div>
        <div>
          <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">Save Attendance</Button>
        </div>
      </div>
    </div>
  )
}
