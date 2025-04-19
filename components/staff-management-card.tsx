"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { StaffModal } from "@/components/staff-modal"

interface StaffManagementCardProps {
  onStaffAdded: (staffData: any) => void
}

export function StaffManagementCard({ onStaffAdded }: StaffManagementCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmitStaff = (staffData: any) => {
    // In a real application, this would send data to the backend
    console.log("Staff data submitted:", staffData)

    // Pass the data up to the parent component
    onStaffAdded(staffData)
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" onClick={handleOpenModal}>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
          <div className="bg-orange-500 text-white p-4 rounded-full mb-4">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Staff & HR</h3>
          <p className="text-gray-600 mb-4">Manage staff records, attendance, shifts, and payroll in one place.</p>
          <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">Add New Staff</Button>
        </CardContent>
      </Card>

      <StaffModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitStaff} />
    </>
  )
}
