"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { AdminSidebar } from "@/components/admin-sidebar"
import { BackButton } from "@/components/back-button"
import { getAllDepartments, getDoctorsByDepartment, getDoctorById } from "@/data/doctors"
import { CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

export default function NewOpdRegistrationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const [departments, setDepartments] = useState<string[]>([])
  const [availableDoctors, setAvailableDoctors] = useState<any[]>([])

  const [formData, setFormData] = useState<Omit<OpdRegistration, "id" | "registrationTime" | "status" | "tokenNumber">>(
    {
      patientName: "",
      patientId: "",
      age: "",
      gender: "",
      contactNumber: "",
      address: "",
      department: "",
      doctorId: "",
      appointmentDate: new Date().toISOString().split("T")[0],
      appointmentTime: "",
      symptoms: "",
    },
  )

  // Load departments on component mount
  useEffect(() => {
    setDepartments(getAllDepartments())
  }, [])

  // Update available doctors when department changes
  useEffect(() => {
    if (formData.department) {
      const doctors = getDoctorsByDepartment(formData.department)
      setAvailableDoctors(doctors)
    } else {
      setAvailableDoctors([])
    }
  }, [formData.department])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required"
    if (!formData.age.trim()) newErrors.age = "Age is required"
    if (!formData.gender) newErrors.gender = "Gender is required"
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required"
    if (!formData.department) newErrors.department = "Department is required"
    if (!formData.doctorId) newErrors.doctorId = "Doctor is required"
    if (!formData.appointmentDate) newErrors.appointmentDate = "Appointment date is required"
    if (!formData.appointmentTime) newErrors.appointmentTime = "Appointment time is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields correctly.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Get existing registrations from localStorage
      const existingRegistrations = JSON.parse(localStorage.getItem("opdRegistrations") || "[]")

      // Generate token number
      const tokenNumber = existingRegistrations.length + 1001 // Start from 1001

      // Get doctor details
      const doctor = getDoctorById(formData.doctorId)

      // Create new registration with ID
      const newRegistration: OpdRegistration = {
        ...formData,
        id: crypto.randomUUID(), // Generate unique ID
        registrationTime: new Date().toISOString(),
        status: "waiting",
        tokenNumber,
      }

      // Update localStorage
      const updatedRegistrations = [...existingRegistrations, newRegistration]
      localStorage.setItem("opdRegistrations", JSON.stringify(updatedRegistrations))

      // Show success message
      setSuccess(true)
      toast({
        title: "Registration Successful",
        description: `Patient ${formData.patientName} registered with Dr. ${doctor?.name} (Token #${tokenNumber})`,
      })

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          patientName: "",
          patientId: "",
          age: "",
          gender: "",
          contactNumber: "",
          address: "",
          department: "",
          doctorId: "",
          appointmentDate: new Date().toISOString().split("T")[0],
          appointmentTime: "",
          symptoms: "",
        })
        setSuccess(false)
        router.push("/admin/opd")
      }, 2000)
    } catch (error) {
      console.error("Error saving registration:", error)
      toast({
        title: "Error",
        description: "Failed to save registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
          <div className="flex items-center p-4">
            <BackButton href="/admin/opd" />
            <h1 className="text-xl font-semibold text-gray-800 ml-4">New OPD Registration</h1>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="text-blue-800">Patient Registration Form</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {success && (
                <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>Registration successful! Redirecting to OPD list...</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-b pb-2">Patient Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">
                        Patient Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        className={errors.patientName ? "border-red-500" : ""}
                      />
                      {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patientId">Patient ID (Optional)</Label>
                      <Input
                        id="patientId"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        placeholder="For existing patients"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">
                        Age <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        type="number"
                        className={errors.age ? "border-red-500" : ""}
                      />
                      {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                        <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">
                        Contact Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className={errors.contactNumber ? "border-red-500" : ""}
                      />
                      {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                {/* Appointment Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium border-b pb-2">Appointment Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">
                        Department <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => handleSelectChange("department", value)}
                      >
                        <SelectTrigger className={errors.department ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="doctorId">
                        Consulting Doctor <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.doctorId}
                        onValueChange={(value) => handleSelectChange("doctorId", value)}
                        disabled={!formData.department}
                      >
                        <SelectTrigger className={errors.doctorId ? "border-red-500" : ""}>
                          <SelectValue
                            placeholder={formData.department ? "Select doctor" : "Select department first"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDoctors.length > 0 ? (
                            availableDoctors
                              .filter((doctor) => doctor.id && doctor.name)
                              .map((doctor) => (
                                <SelectItem key={doctor.id} value={doctor.id || `doctor-${Math.random()}`}>
                                  {doctor.name || "Unnamed Doctor"} ({doctor.qualification || "No qualification"})
                                </SelectItem>
                              ))
                          ) : (
                            <SelectItem value="no-doctors-available" disabled>
                              No doctors available for this department
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      {errors.doctorId && <p className="text-red-500 text-sm">{errors.doctorId}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="appointmentDate">
                        Appointment Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="appointmentDate"
                        name="appointmentDate"
                        type="date"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={errors.appointmentDate ? "border-red-500" : ""}
                      />
                      {errors.appointmentDate && <p className="text-red-500 text-sm">{errors.appointmentDate}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="appointmentTime">
                        Appointment Time <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="appointmentTime"
                        name="appointmentTime"
                        type="time"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        className={errors.appointmentTime ? "border-red-500" : ""}
                      />
                      {errors.appointmentTime && <p className="text-red-500 text-sm">{errors.appointmentTime}</p>}
                    </div>
                  </div>
                </div>

                {/* Symptoms */}
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms / Chief Complaints</Label>
                  <Textarea
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter patient's symptoms or complaints"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/opd")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || success}
                    className="bg-gradient-to-r from-green-600 to-teal-600 text-white"
                  >
                    {isSubmitting ? "Registering..." : "Register Patient"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
