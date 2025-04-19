"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, UserPlus } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { PatientTable } from "@/components/patient-table"
import { PatientModal } from "@/components/patient-modal"

// Sample patient data
const initialPatients = [
  {
    id: "PT-10234",
    name: "Emma Thompson",
    age: 42,
    gender: "Female",
    phone: "+1 (555) 123-4567",
    email: "emma.thompson@example.com",
    bloodGroup: "A+",
    lastVisit: "Apr 12, 2025",
    nextAppointment: "May 15, 2025",
    status: "Active",
  },
  {
    id: "PT-10235",
    name: "James Wilson",
    age: 35,
    gender: "Male",
    phone: "+1 (555) 234-5678",
    email: "james.wilson@example.com",
    bloodGroup: "O+",
    lastVisit: "Apr 11, 2025",
    status: "Active",
  },
  {
    id: "PT-10236",
    name: "Olivia Martinez",
    age: 28,
    gender: "Female",
    phone: "+1 (555) 345-6789",
    email: "olivia.martinez@example.com",
    bloodGroup: "B-",
    lastVisit: "Apr 10, 2025",
    nextAppointment: "Apr 24, 2025",
    status: "Pending",
  },
  {
    id: "PT-10237",
    name: "William Johnson",
    age: 56,
    gender: "Male",
    phone: "+1 (555) 456-7890",
    email: "william.johnson@example.com",
    bloodGroup: "AB+",
    lastVisit: "Apr 09, 2025",
    status: "Active",
  },
  {
    id: "PT-10238",
    name: "Sophia Brown",
    age: 31,
    gender: "Female",
    phone: "+1 (555) 567-8901",
    email: "sophia.brown@example.com",
    bloodGroup: "A-",
    lastVisit: "Apr 08, 2025",
    status: "Inactive",
  },
]

export default function PatientsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [patients, setPatients] = useState(initialPatients)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleAddPatient = (patientData: any) => {
    // Create a new patient object from form data
    const newPatient = {
      id: `PT-${10239 + patients.length}`, // Generate a simple ID
      name: `${patientData.firstName} ${patientData.lastName}`,
      age: calculateAge(patientData.dob),
      gender: patientData.gender.charAt(0).toUpperCase() + patientData.gender.slice(1),
      phone: patientData.phone,
      email: patientData.email,
      bloodGroup: patientData.bloodGroup || "Unknown",
      lastVisit: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      nextAppointment: new Date(patientData.appointmentDate).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      status: "Active",
    }

    // Add the new patient to the list
    setPatients([newPatient, ...patients])
  }

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const handleEditPatient = (patient: any) => {
    // In a real app, this would open an edit form
    console.log("Edit patient:", patient)
    alert(`Editing patient: ${patient.name}`)
  }

  const handleDeletePatient = (patientId: string) => {
    // In a real app, this would confirm deletion
    if (confirm(`Are you sure you want to delete patient with ID: ${patientId}?`)) {
      setPatients(patients.filter((patient) => patient.id !== patientId))
    }
  }

  const handleViewPatientDetails = (patient: any) => {
    // In a real app, this would navigate to a details page
    console.log("View patient details:", patient)
    alert(`Viewing details for: ${patient.name}`)
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
                onClick={handleOpenModal}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Patient
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Patient Management</h1>
              <p className="text-gray-600">Manage and view all patient records</p>
            </div>
          </div>

          {/* Patient Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Patient Records
                <Badge className="ml-2 bg-cyan-600">Total: {patients.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PatientTable
                patients={patients}
                onEdit={handleEditPatient}
                onDelete={handleDeletePatient}
                onViewDetails={handleViewPatientDetails}
              />
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Patient Registration Modal */}
      <PatientModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddPatient} />
    </div>
  )
}
