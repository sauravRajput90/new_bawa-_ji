"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin-sidebar"
import { BackButton } from "@/components/back-button"
import { getDoctorById } from "@/data/doctors"
import { Clock, User, Phone, MapPin, FileText, Calendar, FileDown } from "lucide-react"
import OpdInvoiceGenerator from "@/components/opd-invoice-generator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OpdRegistration {
  id: string
  patientName: string
  patientId: string
  age: string
  gender: string
  contactNumber: string
  address: string
  department: string
  doctorId: string
  appointmentDate: string
  appointmentTime: string
  symptoms: string
  registrationTime: string
  status: "waiting" | "in-progress" | "completed" | "cancelled"
  tokenNumber: number
}

import { useParams } from "next/navigation"

export default function ViewOpdRegistrationPage() {
  const { id } = useParams() as { id: string }


  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [registration, setRegistration] = useState<OpdRegistration | null>(null)
  const [doctor, setDoctor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    if (!id) return
  
    const registrations = JSON.parse(localStorage.getItem("opdRegistrations") || "[]")
    const foundRegistration = registrations.find((reg: OpdRegistration) => reg.id === id)
  
    if (foundRegistration) {
      setRegistration(foundRegistration)
      const doctorDetails = getDoctorById(foundRegistration.doctorId)
      setDoctor(doctorDetails)
    } else {
      router.push("/admin/opd")
    }
  
    setLoading(false)
  }, [id, router])
  

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    try {
      // Handle ISO string or time string
      if (timeString.includes("T")) {
        return new Date(timeString).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      } else {
        const [hours, minutes] = timeString.split(":")
        const date = new Date()
        date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
        return date.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      }
    } catch (e) {
      return timeString
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading registration details...</p>
      </div>
    )
  }

  if (!registration) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Registration not found</p>
      </div>
    )
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
        <header className="bg-white shadow-sm z-10 print:hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <BackButton href="/admin/opd" />
              <h1 className="text-xl font-semibold text-gray-800 ml-4">OPD Registration Details</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setActiveTab("invoice")}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <FileDown className="h-4 w-4" />
                Invoice
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-4 print:hidden">
              <TabsTrigger value="details">Patient Details</TabsTrigger>
              <TabsTrigger value="invoice">Registration Invoice</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card className="max-w-4xl mx-auto">
                <CardHeader className="border-b">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <CardTitle className="text-xl">Patient Registration #{registration.tokenNumber}</CardTitle>
                    <Badge className={`mt-2 md:mt-0 ${getStatusColor(registration.status)}`}>
                      {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Patient Information</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-start">
                            <User className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium">{registration.patientName}</p>
                              <p className="text-sm text-gray-500">
                                {registration.age} years,{" "}
                                {registration.gender.charAt(0).toUpperCase() + registration.gender.slice(1)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                            <p>{registration.contactNumber}</p>
                          </div>

                          {registration.address && (
                            <div className="flex items-start">
                              <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                              <p>{registration.address}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Appointment Details</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium">{formatDate(registration.appointmentDate)}</p>
                              <p className="text-sm text-gray-500">{formatTime(registration.appointmentTime)}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium">Registration Time</p>
                              <p className="text-sm text-gray-500">
                                {formatDate(registration.registrationTime)} at{" "}
                                {formatTime(registration.registrationTime)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Medical Information</h3>
                        <div className="mt-2 space-y-2">
                          <div>
                            <p className="font-medium">Department</p>
                            <p className="text-gray-700">{registration.department}</p>
                          </div>

                          <div>
                            <p className="font-medium">Consulting Doctor</p>
                            <p className="text-gray-700">{doctor?.name || "Unknown"}</p>
                            <p className="text-sm text-gray-500">
                              {doctor?.qualification}, {doctor?.designation}
                            </p>
                          </div>
                        </div>
                      </div>

                      {registration.symptoms && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Symptoms / Chief Complaints</h3>
                          <div className="mt-2 flex items-start">
                            <FileText className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                            <p className="text-gray-700">{registration.symptoms}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t print:hidden">
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" onClick={() => router.push(`/admin/opd/edit/${registration.id}`)}>
                        Edit Registration
                      </Button>
                      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                        Cancel Registration
                      </Button>
                      <Button className="ml-auto bg-gradient-to-r from-green-600 to-teal-600">
                        Start Consultation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoice">
              {registration && doctor && <OpdInvoiceGenerator registration={registration} doctor={doctor} />}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
