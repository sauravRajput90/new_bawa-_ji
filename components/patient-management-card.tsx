"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { PatientModal } from "@/components/patient-modal"

interface PatientManagementCardProps {
  onPatientAdded: (patientData: any) => void
}

export function PatientManagementCard({ onPatientAdded }: PatientManagementCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmitPatient = (patientData: any) => {
    // In a real application, this would send data to the backend
    console.log("Patient data submitted:", patientData)

    // Pass the data up to the parent component
    onPatientAdded(patientData)
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" onClick={handleOpenModal}>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
          <div className="bg-blue-500 text-white p-4 rounded-full mb-4">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Patient Management</h3>
          <p className="text-gray-600 mb-4">
            Register, track, and manage patient records, medical history, and appointments.
          </p>
          <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">Register New Patient</Button>
        </CardContent>
      </Card>

      <PatientModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitPatient} />
    </>
  )
}
