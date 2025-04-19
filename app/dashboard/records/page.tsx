"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, User, Download, Printer, Search } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function MedicalRecordsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [doctorFilter, setDoctorFilter] = useState("all")
  const [arOpen, setArOpen] = useState(false) // Declared arOpen state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const medicalRecords = [
    {
      id: 1,
      type: "Diagnosis",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "March 10, 2025",
      description: "Hypertension (High Blood Pressure)",
      notes: "Blood pressure reading: 140/90 mmHg. Recommended lifestyle changes and prescribed medication.",
      attachments: ["BP_Chart.pdf"],
    },
    {
      id: 2,
      type: "Lab Report",
      doctor: "Dr. James Wilson",
      specialty: "General Physician",
      date: "February 15, 2025",
      description: "Complete Blood Count (CBC)",
      notes: "All values within normal range. No significant abnormalities detected.",
      attachments: ["CBC_Report.pdf", "Lab_Results.pdf"],
    },
    {
      id: 3,
      type: "Prescription",
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "January 22, 2025",
      description: "Topical Treatment for Eczema",
      notes: "Apply twice daily on affected areas. Follow up in 2 weeks if no improvement.",
      attachments: ["Prescription.pdf"],
    },
    {
      id: 4,
      type: "Radiology",
      doctor: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      date: "December 5, 2024",
      description: "MRI Brain Scan",
      notes: "No significant abnormalities detected. Normal brain structure and function.",
      attachments: ["MRI_Report.pdf", "MRI_Images.jpg"],
    },
  ]

  const filteredRecords = medicalRecords.filter(
    (record) =>
      (record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (dateFilter === "all" || record.date.includes(dateFilter)) &&
      (doctorFilter === "all" || record.doctor === doctorFilter),
  )

  const uniqueDoctors = [...new Set(medicalRecords.map((record) => record.doctor))]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && arOpen && (
        <div className="fixed inset-0 bg-gray-800/50 z-10 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <PatientSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="lg:hidden text-gray-600">
              <User className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Medical Records</h1>
            <div></div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search records"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
              <Select value={doctorFilter} onValueChange={setDoctorFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  {uniqueDoctors.map((doctor, index) => (
                    <SelectItem key={index} value={doctor}>
                      {doctor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="text-cyan-600 border-cyan-600">
                <Download className="h-4 w-4 mr-2" /> Export
              </Button>
              <Button variant="outline" className="text-cyan-600 border-cyan-600">
                <Printer className="h-4 w-4 mr-2" /> Print
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredRecords.length > 0 ? (
                <div className="space-y-6">
                  {filteredRecords.map((record) => (
                    <div key={record.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div className="flex items-center mb-3 md:mb-0">
                          <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 mr-3">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium flex items-center">
                              {record.description}
                              <Badge className="ml-2 bg-cyan-100 text-cyan-800 hover:bg-cyan-200">{record.type}</Badge>
                            </h3>
                            <p className="text-sm text-gray-500">
                              {record.doctor} - {record.specialty}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm">{record.date}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md mb-3">
                        <p className="text-sm">{record.notes}</p>
                      </div>
                      {record.attachments.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Attachments:</p>
                          <div className="flex flex-wrap gap-2">
                            {record.attachments.map((attachment, index) => (
                              <Button key={index} variant="outline" size="sm" className="text-xs">
                                <FileText className="h-3 w-3 mr-1" /> {attachment}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No medical records found matching your filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
