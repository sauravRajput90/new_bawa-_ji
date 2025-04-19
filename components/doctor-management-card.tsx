"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope } from "lucide-react"
import { DoctorModal } from "@/components/doctor-modal"

interface DoctorManagementCardProps {
  onDoctorAdded: (doctorData: any) => void
}

export function DoctorManagementCard({ onDoctorAdded }: DoctorManagementCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmitDoctor = (doctorData: any) => {
    // In a real application, this would send data to the backend
    console.log("Doctor data submitted:", doctorData)

    // Pass the data up to the parent component
    onDoctorAdded(doctorData)
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" onClick={handleOpenModal}>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
          <div className="bg-green-500 text-white p-4 rounded-full mb-4">
            <Stethoscope className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Doctor Management</h3>
          <p className="text-gray-600 mb-4">Manage doctor profiles, schedules, and consultations efficiently.</p>
          <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">Add New Doctor</Button>
        </CardContent>
      </Card>

      <DoctorModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitDoctor} />
    </>
  )
}
