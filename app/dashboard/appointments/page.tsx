"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, Plus } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AppointmentsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "April 15, 2025",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "April 22, 2025",
      time: "2:30 PM",
      status: "Pending",
    },
    {
      id: 3,
      doctor: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      date: "May 5, 2025",
      time: "11:15 AM",
      status: "Confirmed",
    },
  ]

  const pastAppointments = [
    {
      id: 4,
      doctor: "Dr. James Wilson",
      specialty: "General Physician",
      date: "March 10, 2025",
      time: "9:00 AM",
      status: "Completed",
    },
    {
      id: 5,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "February 15, 2025",
      time: "11:30 AM",
      status: "Completed",
    },
    {
      id: 6,
      doctor: "Dr. Robert Lee",
      specialty: "Orthopedic",
      date: "January 22, 2025",
      time: "3:45 PM",
      status: "Cancelled",
    },
  ]

  const filteredUpcoming = upcomingAppointments.filter(
    (appointment) =>
      (appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || appointment.status.toLowerCase() === statusFilter.toLowerCase()),
  )

  const filteredPast = pastAppointments.filter(
    (appointment) =>
      (appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || appointment.status.toLowerCase() === statusFilter.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
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
            <h1 className="text-xl font-bold text-gray-800">Appointments</h1>
            <div></div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <Input
                placeholder="Search by doctor or specialty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
              <Plus className="h-4 w-4 mr-2" /> Book New Appointment
            </Button>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
              <TabsTrigger value="past">Past Appointments</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredUpcoming.length > 0 ? (
                      filteredUpcoming.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center mb-3 md:mb-0">
                            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 mr-4">
                              <User className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-medium">{appointment.doctor}</h3>
                              <p className="text-sm text-gray-500">{appointment.specialty}</p>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm">{appointment.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm">{appointment.time}</span>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                appointment.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {appointment.status}
                            </div>
                          </div>
                          <div className="flex mt-3 md:mt-0 space-x-2">
                            <Button variant="outline" size="sm" className="text-cyan-600 border-cyan-600">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-500">No upcoming appointments found.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="past">
              <Card>
                <CardHeader>
                  <CardTitle>Past Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredPast.length > 0 ? (
                      filteredPast.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center mb-3 md:mb-0">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mr-4">
                              <User className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-medium">{appointment.doctor}</h3>
                              <p className="text-sm text-gray-500">{appointment.specialty}</p>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm">{appointment.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm">{appointment.time}</span>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                appointment.status === "Completed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {appointment.status}
                            </div>
                          </div>
                          <div className="flex mt-3 md:mt-0 space-x-2">
                            <Button variant="outline" size="sm" className="text-cyan-600 border-cyan-600">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" className="text-cyan-600 border-cyan-600">
                              Book Again
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-500">No past appointments found.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
