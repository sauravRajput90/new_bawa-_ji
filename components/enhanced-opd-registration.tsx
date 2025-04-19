"use client"

import { CardContent } from "@/components/ui/card"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import OpdQueueDisplay from "./opd-queue-display"
import { getActiveDoctors, getDoctorsByDepartment, formatDoctorInfo, getAllDepartments } from "@/data/doctors"

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

export default function EnhancedOpdRegistration() {
  const { toast } = useToast()
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

  const [availableDoctors, setAvailableDoctors] = useState<ReturnType<typeof getActiveDoctors>>([])
  const [registrations, setRegistrations] = useState<OpdRegistration[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Load existing registrations from localStorage
  useEffect(() => {
    const savedRegistrations = localStorage.getItem("opdRegistrations")
    if (savedRegistrations) {
      setRegistrations(JSON.parse(savedRegistrations))
    }
  }, [])

  // Update available doctors when department changes
  useEffect(() => {
    if (formData.department) {
      // Use the imported function from data/doctors.ts
      setAvailableDoctors(getDoctorsByDepartment(formData.department))
      // Reset doctor selection when department changes
      setFormData((prev) => ({ ...prev, doctorId: "" }))
    } else {
      // If no department is selected, show all active doctors
      setAvailableDoctors(getActiveDoctors())
    }
  }, [formData.department])

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

    // Generate token number (simple implementation)
    const tokenNumber = registrations.length + 1

    // Create new registration with ID
    const newRegistration: OpdRegistration = {
      ...formData,
      id: crypto.randomUUID(), // Generate unique ID
      registrationTime: new Date().toISOString(),
      status: "waiting",
      tokenNumber,
    }

    // Update state and localStorage
    const updatedRegistrations = [...registrations, newRegistration]
    setRegistrations(updatedRegistrations)
    localStorage.setItem("opdRegistrations", JSON.stringify(updatedRegistrations))

    // Show success message
    toast({
      title: "Registration Successful",
      description: `Patient ${formData.patientName} registered with token #${tokenNumber}`,
    })

    // Reset form
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

    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="department">
              Department <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
              <SelectTrigger className={errors.department ? "border-red-500" : ""}>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {getAllDepartments().map((dept) => (
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
                <SelectValue placeholder={formData.department ? "Select doctor" : "Select department first"} />
              </SelectTrigger>
              <SelectContent>
                {availableDoctors.length > 0 ? (
                  availableDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {formatDoctorInfo(doctor)}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
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

        <div className="space-y-2">
          <Label htmlFor="symptoms">Symptoms / Chief Complaints</Label>
          <Textarea id="symptoms" name="symptoms" value={formData.symptoms} onChange={handleChange} rows={3} />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register Patient"}
          </Button>
        </div>
      </form>

      <Card className="mt-8">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">OPD Queue Status</h3>
          <OpdQueueDisplay />
        </CardContent>
      </Card>
    </div>
  )
}
