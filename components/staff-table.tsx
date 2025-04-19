"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, FileText, Edit, Trash2, Phone, Download, Clock } from "lucide-react"

interface Staff {
  id: string
  name: string
  profilePhoto?: string
  department: string
  designation: string
  employeeId: string
  phone: string
  email: string
  shift: string
  joiningDate: string
  attendanceStatus: string
}

interface StaffTableProps {
  staffList: Staff[]
  onEdit?: (staff: Staff) => void
  onDelete?: (staffId: string) => void
  onViewDetails?: (staff: Staff) => void
}

export function StaffTable({ staffList, onEdit, onDelete, onViewDetails }: StaffTableProps) {
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>(staffList)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [shiftFilter, setShiftFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)
  const staffPerPage = 5

  // Update filtered staff when props or filters change
  useEffect(() => {
    let result = [...staffList]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (staff) =>
          staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.phone.includes(searchTerm),
      )
    }

    // Apply department filter
    if (departmentFilter !== "all") {
      result = result.filter((staff) => staff.department.toLowerCase() === departmentFilter.toLowerCase())
    }

    // Apply shift filter
    if (shiftFilter !== "all") {
      result = result.filter((staff) => staff.shift.toLowerCase() === shiftFilter.toLowerCase())
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "joiningDate") {
        return new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime()
      } else if (sortBy === "department") {
        return a.department.localeCompare(b.department)
      }
      return 0
    })

    setFilteredStaff(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [staffList, searchTerm, departmentFilter, shiftFilter, sortBy])

  // Calculate pagination
  const indexOfLastStaff = currentPage * staffPerPage
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage
  const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff)
  const totalPages = Math.ceil(filteredStaff.length / staffPerPage)

  // Generate page numbers
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleDepartmentFilterChange = (value: string) => {
    setDepartmentFilter(value)
  }

  const handleShiftFilterChange = (value: string) => {
    setShiftFilter(value)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleExportData = () => {
    // In a real application, this would generate a CSV or PDF
    alert("Exporting staff data...")
  }

  const getAttendanceStatusBadge = (status: string) => {
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
              placeholder="Search by name, ID, department..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8 w-full"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          <Select value={shiftFilter} onValueChange={handleShiftFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shifts</SelectItem>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
              <SelectItem value="night">Night</SelectItem>
              <SelectItem value="rotating">Rotating</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="joiningDate">Joining Date</SelectItem>
              <SelectItem value="department">Department</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Staff List */}
      <div className="space-y-4">
        {currentStaff.length > 0 ? (
          currentStaff.map((staff, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center mb-3 md:mb-0">
                <Avatar className="h-12 w-12 mr-3">
                  {staff.profilePhoto ? (
                    <AvatarImage src={staff.profilePhoto} alt={staff.name} />
                  ) : (
                    <AvatarFallback className="bg-orange-100 text-orange-800">
                      {staff.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="font-medium">{staff.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{staff.employeeId}</span>
                    <span className="mx-1">•</span>
                    <span>{staff.designation}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 mr-2">Dept:</span>
                  <span>{staff.department}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{staff.shift} Shift</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{staff.phone}</span>
                </div>
                {getAttendanceStatusBadge(staff.attendanceStatus)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewDetails?.(staff)}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(staff)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Staff</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete?.(staff.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete Staff</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No staff found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredStaff.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstStaff + 1} to {Math.min(indexOfLastStaff, filteredStaff.length)} of{" "}
            {filteredStaff.length} results
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {pageNumbers.map((number) => (
              <Button
                key={number}
                variant="outline"
                size="sm"
                className={currentPage === number ? "bg-cyan-50" : ""}
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
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
