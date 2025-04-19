"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, UserPlus } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { StaffTable } from "@/components/staff-table"
import { StaffModal } from "@/components/staff-modal"

// Sample staff data
const initialStaff = [
  {
    id: "EMP-1001",
    name: "John Smith",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Nursing",
    designation: "Head Nurse",
    employeeId: "EMP-1001",
    phone: "+1 (555) 123-4567",
    email: "john.smith@example.com",
    shift: "morning",
    joiningDate: "2022-05-15",
    attendanceStatus: "present",
  },
  {
    id: "EMP-1002",
    name: "Sarah Johnson",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Reception",
    designation: "Front Desk Manager",
    employeeId: "EMP-1002",
    phone: "+1 (555) 234-5678",
    email: "sarah.johnson@example.com",
    shift: "morning",
    joiningDate: "2021-08-10",
    attendanceStatus: "present",
  },
  {
    id: "EMP-1003",
    name: "Michael Chen",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Laboratory",
    designation: "Lab Technician",
    employeeId: "EMP-1003",
    phone: "+1 (555) 345-6789",
    email: "michael.chen@example.com",
    shift: "evening",
    joiningDate: "2023-01-20",
    attendanceStatus: "absent",
  },
  {
    id: "EMP-1004",
    name: "Emily Taylor",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Pharmacy",
    designation: "Pharmacist",
    employeeId: "EMP-1004",
    phone: "+1 (555) 456-7890",
    email: "emily.taylor@example.com",
    shift: "rotating",
    joiningDate: "2022-11-05",
    attendanceStatus: "leave",
  },
  {
    id: "EMP-1005",
    name: "Robert Johnson",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    department: "Admin",
    designation: "HR Manager",
    employeeId: "EMP-1005",
    phone: "+1 (555) 567-8901",
    email: "robert.johnson@example.com",
    shift: "morning",
    joiningDate: "2020-03-15",
    attendanceStatus: "present",
  },
]

export default function StaffPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<any>(null)
  const [staff, setStaff] = useState(initialStaff)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleOpenModal = (staffMember?: any) => {
    if (staffMember) {
      setEditingStaff(staffMember)
    } else {
      setEditingStaff(null)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingStaff(null)
  }

  const handleAddStaff = (staffData: any) => {
    if (editingStaff) {
      // Update existing staff
      setStaff(
        staff.map((s) =>
          s.id === editingStaff.id
            ? {
                ...s,
                name: staffData.fullName,
                department: staffData.department,
                designation: staffData.designation,
                phone: staffData.phone,
                email: staffData.email,
                shift: staffData.shift,
              }
            : s,
        ),
      )
    } else {
      // Create a new staff object from form data
      const newStaff = {
        id: `EMP-${1006 + staff.length}`, // Generate a simple ID
        name: staffData.fullName,
        profilePhoto: "/placeholder.svg?height=100&width=100", // Placeholder image
        department: staffData.department,
        designation: staffData.designation,
        employeeId: staffData.employeeId,
        phone: staffData.phone,
        email: staffData.email,
        shift: staffData.shift,
        joiningDate: staffData.joiningDate,
        attendanceStatus: "present", // Default status for new staff
      }

      // Add the new staff to the list
      setStaff([newStaff, ...staff])
    }
  }

  const handleEditStaff = (staffMember: any) => {
    // Transform staff data to match form structure
    const formattedStaff = {
      fullName: staffMember.name,
      gender: "male", // Default since we don't have this in the sample data
      dob: "", // Default since we don't have this in the sample data
      email: staffMember.email,
      phone: staffMember.phone,
      address: "",
      bloodGroup: "",
      department: staffMember.department,
      designation: staffMember.designation,
      employeeId: staffMember.employeeId,
      joiningDate: staffMember.joiningDate,
      shift: staffMember.shift,
      // Add other default values as needed
    }

    handleOpenModal({ ...staffMember, ...formattedStaff })
  }

  const handleDeleteStaff = (staffId: string) => {
    // In a real app, this would confirm deletion
    if (confirm(`Are you sure you want to delete staff with ID: ${staffId}?`)) {
      setStaff(staff.filter((s) => s.id !== staffId))
    }
  }

  const handleViewStaffDetails = (staffMember: any) => {
    // In a real app, this would navigate to a details page
    console.log("View staff details:", staffMember)
    alert(`Viewing details for: ${staffMember.name}`)
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
            <button onClick={toggleSidebar} className="lg:hidden text-gray-600">
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center ml-auto space-x-2">
              <Link href="/admin/staff/attendance">
                <Button variant="outline">Attendance</Button>
              </Link>
              <Link href="/admin/staff/payroll">
                <Button variant="outline">Payroll</Button>
              </Link>
              <Button
                onClick={() => handleOpenModal()}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Staff
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
              <p className="text-gray-600">Manage staff records, attendance, shifts, and payroll</p>
            </div>
          </div>

          {/* Staff Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Staff Records
                <Badge className="ml-2 bg-cyan-600">Total: {staff.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StaffTable
                staffList={staff}
                onEdit={handleEditStaff}
                onDelete={handleDeleteStaff}
                onViewDetails={handleViewStaffDetails}
              />
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Staff Add/Edit Modal */}
      <StaffModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddStaff}
        initialData={editingStaff}
      />
    </div>
  )
}
