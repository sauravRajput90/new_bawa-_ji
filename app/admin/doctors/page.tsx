"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, UserPlus } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { DoctorTable } from "@/components/doctor-table"
import { DoctorModal } from "@/components/doctor-modal"
import {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor, // Import deleteDoctor
  type Doctor,
} from "@/data/doctors"

export default function DoctorsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [doctors, setDoctors] = useState<Doctor[]>([])

  // Load doctors on component mount
  useEffect(() => {
    setDoctors(getDoctors())
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleOpenModal = (doctor?: Doctor) => {
    if (doctor) {
      setEditingDoctor(doctor)
    } else {
      setEditingDoctor(null)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingDoctor(null)
  }

  const handleAddDoctor = (doctorData: any) => {
    if (editingDoctor) {
      // Update existing doctor
      const updatedDoctor = updateDoctor(editingDoctor.id, {
        name: doctorData.fullName,
        specialization: doctorData.specialization,
        qualification: doctorData.qualifications,
        designation: doctorData.designation,
        experience: doctorData.experience,
        availability: doctorData.isAvailable,
        consultationType: doctorData.consultationType,
        department: doctorData.department,
        email: doctorData.email,
        phone: doctorData.phone,
        registrationNo: doctorData.registrationNo,
      })

      // Update local state
      setDoctors(getDoctors())
    } else {
      // Add new doctor
      const newDoctor = addDoctor({
        name: doctorData.fullName,
        profilePhoto: "/placeholder.svg?height=100&width=100", // Placeholder image
        specialization: doctorData.specialization,
        qualification: doctorData.qualifications,
        designation: doctorData.designation,
        experience: doctorData.experience,
        availability: doctorData.isAvailable,
        consultationType: doctorData.consultationType,
        rating: 0, // New doctors start with no rating
        department: doctorData.department,
        email: doctorData.email,
        phone: doctorData.phone,
        registrationNo: doctorData.registrationNo,
      })

      // Update local state
      setDoctors(getDoctors())
    }
  }

  const handleEditDoctor = (doctor: Doctor) => {
    // Transform doctor data to match form structure
    const formattedDoctor = {
      fullName: doctor.name,
      gender: "male", // Default since we don't have this in the sample data
      dob: "", // Default since we don't have this in the sample data
      email: doctor.email || "",
      phone: doctor.phone || "",
      address: "",
      profilePhoto: doctor.profilePhoto,
      specialization: doctor.specialization,
      department: doctor.department || "",
      designation: doctor.designation,
      qualifications: doctor.qualification,
      experience: doctor.experience,
      registrationNo: doctor.registrationNo || "",
      consultationType: doctor.consultationType,
      consultationFees: "", // Default since we don't have this in the sample data
      consultationDuration: "30", // Default
      maxPatientsPerSlot: "1", // Default
      onlineConsultationLink: "",
      availableDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      }, // Default
      timeSlots: [{ start: "09:00", end: "17:00" }], // Default
      unavailableDates: [],
      isAvailable: doctor.availability,
      about: "",
    }

    handleOpenModal({ ...doctor, ...formattedDoctor } as any)
  }

  const handleDeleteDoctor = (doctorId: string) => {
    // In a real app, this would confirm deletion
    if (confirm(`Are you sure you want to delete doctor with ID: ${doctorId}?`)) {
      deleteDoctor(doctorId)
      setDoctors(getDoctors())
    }
  }

  const handleViewDoctorProfile = (doctor: Doctor) => {
    // In a real app, this would navigate to a details page
    console.log("View doctor profile:", doctor)
    alert(`Viewing profile for: ${doctor.name}`)
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

            <div className="flex items-center ml-auto">
              <Button
                onClick={() => handleOpenModal()}
                className="bg-gradient-to-r from-[#3a7561] to-[#c64b7a] text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Doctor
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Doctor Management</h1>
              <p className="text-gray-600">Manage doctor profiles, schedules, and consultations</p>
            </div>
          </div>

          {/* Doctor Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Doctor Records
                <Badge className="ml-2 bg-[#c64b7a]">Total: {doctors.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DoctorTable
                doctors={doctors}
                onEdit={handleEditDoctor}
                onDelete={handleDeleteDoctor}
                onViewProfile={handleViewDoctorProfile}
              />
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Doctor Registration/Edit Modal */}
      <DoctorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddDoctor}
        initialData={editingDoctor}
      />
    </div>
  )
}
