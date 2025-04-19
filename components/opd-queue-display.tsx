"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getDoctorById } from "@/data/doctors"
import { format } from "date-fns"

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

export default function OpdQueueDisplay() {
  const [registrations, setRegistrations] = useState<OpdRegistration[]>([])
  const [activeTab, setActiveTab] = useState<"waiting" | "in-progress" | "all">("waiting")

  // Load registrations from localStorage
  useEffect(() => {
    const savedRegistrations = localStorage.getItem("opdRegistrations")
    if (savedRegistrations) {
      const parsedRegistrations = JSON.parse(savedRegistrations) as OpdRegistration[]
      // Sort by token number
      parsedRegistrations.sort((a, b) => a.tokenNumber - b.tokenNumber)
      setRegistrations(parsedRegistrations)
    }
  }, [])

  const filteredRegistrations = registrations.filter((reg) => {
    if (activeTab === "all") return true
    return reg.status === activeTab
  })

  const updateStatus = (id: string, newStatus: OpdRegistration["status"]) => {
    const updatedRegistrations = registrations.map((reg) => (reg.id === id ? { ...reg, status: newStatus } : reg))
    setRegistrations(updatedRegistrations)
    localStorage.setItem("opdRegistrations", JSON.stringify(updatedRegistrations))
  }

  const formatTime = (timeString: string) => {
    if (!timeString) return ""

    // Handle ISO string or time string
    if (timeString.includes("T")) {
      const date = new Date(timeString)
      return format(date, "hh:mm a")
    }

    // Handle time string like "14:30"
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return format(date, "hh:mm a")
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "in-progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-4">
        <Button
          variant={activeTab === "waiting" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("waiting")}
          className={activeTab === "waiting" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          Waiting
        </Button>
        <Button
          variant={activeTab === "in-progress" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("in-progress")}
          className={activeTab === "in-progress" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          In Progress
        </Button>
        <Button
          variant={activeTab === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("all")}
          className={activeTab === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          All
        </Button>
      </div>

      {filteredRegistrations.length > 0 ? (
        <div className="space-y-3">
          {filteredRegistrations.map((registration) => {
            const doctor = getDoctorById(registration.doctorId)
            return (
              <Card key={registration.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center border-l-4 border-blue-500">
                    <div className="bg-blue-50 p-4 flex items-center justify-center">
                      <div className="text-center">
                        <span className="block text-2xl font-bold text-blue-700">#{registration.tokenNumber}</span>
                        <span className="text-xs text-gray-500">Token</span>
                      </div>
                    </div>

                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{registration.patientName}</h3>
                          <p className="text-sm text-gray-500">
                            {registration.age} yrs,{" "}
                            {registration.gender.charAt(0).toUpperCase() + registration.gender.slice(1)}
                          </p>
                        </div>
                        <Badge className={getStatusBadgeColor(registration.status)}>
                          {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">Doctor:</span> {doctor ? doctor.name : "Unknown"}
                        <span className="mx-2">•</span>
                        <span className="text-gray-500">Time:</span> {formatTime(registration.appointmentTime)}
                      </div>
                    </div>

                    <div className="p-2 flex flex-col space-y-2 border-l">
                      {registration.status === "waiting" && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => updateStatus(registration.id, "in-progress")}
                        >
                          Start
                        </Button>
                      )}
                      {registration.status === "in-progress" && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => updateStatus(registration.id, "completed")}
                        >
                          Complete
                        </Button>
                      )}
                      {(registration.status === "waiting" || registration.status === "in-progress") && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => updateStatus(registration.id, "cancelled")}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No patients in queue</p>
        </div>
      )}
    </div>
  )
}
