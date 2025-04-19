"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export function OpdRegistrationForm() {
  const [patientName, setPatientName] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  // Set today's date as default when component mounts
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    setAppointmentDate(today)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!patientName.trim()) {
      setError("Patient name is required")
      return
    }

    // Save to localStorage
    const opdData = {
      patientName,
      appointmentDate,
      registeredAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem("opdData", JSON.stringify(opdData))

      // Show success message
      setShowSuccess(true)

      // Reset form
      setPatientName("")
      const today = new Date().toISOString().split("T")[0]
      setAppointmentDate(today)
      setError("")

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    } catch (err) {
      setError("Failed to save registration data")
    }
  }

  // Get today's date for min attribute
  const today = new Date().toISOString().split("T")[0]

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
        <CardTitle className="text-xl text-center text-blue-800">OPD Registration</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {showSuccess && (
          <Alert className="mb-4 bg-green-50 border-green-200 text-green-800">
            <CheckCircle className="h-4 w-4 mr-2" />
            <AlertDescription>Registration saved!</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-4 bg-red-50 border-red-200 text-red-800">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientName" className="text-gray-700">
              Patient Name
            </Label>
            <Input
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
              className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentDate" className="text-gray-700">
              Appointment Date
            </Label>
            <Input
              id="appointmentDate"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={today}
              className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
            Register Patient
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
