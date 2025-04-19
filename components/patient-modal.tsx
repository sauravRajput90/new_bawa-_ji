"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "lucide-react"

interface PatientModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (patientData: any) => void
}

export function PatientModal({ isOpen, onClose, onSubmit }: PatientModalProps) {
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "male",
    bloodGroup: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    allergies: "",
    currentMedications: "",
    pastMedicalHistory: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    appointmentDate: "",
    appointmentReason: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRadioChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to save patient data
    setTimeout(() => {
      onSubmit(formData)
      setIsLoading(false)
      onClose()

      // Reset form data
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "male",
        bloodGroup: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        allergies: "",
        currentMedications: "",
        pastMedicalHistory: "",
        emergencyName: "",
        emergencyRelationship: "",
        emergencyPhone: "",
        appointmentDate: "",
        appointmentReason: "",
      })
      setActiveTab("personal")
    }, 1500)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const moveToNextTab = () => {
    if (activeTab === "personal") setActiveTab("contact")
    else if (activeTab === "contact") setActiveTab("medical")
    else if (activeTab === "medical") setActiveTab("appointment")
  }

  const moveToPreviousTab = () => {
    if (activeTab === "appointment") setActiveTab("medical")
    else if (activeTab === "medical") setActiveTab("contact")
    else if (activeTab === "contact") setActiveTab("personal")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Register New Patient</DialogTitle>
          <DialogDescription>
            Enter patient details to create a new record. All fields marked with <span className="text-red-500">*</span>{" "}
            are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
              <TabsTrigger value="medical">Medical Information</TabsTrigger>
              <TabsTrigger value="appointment">Appointment</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input id="dob" type="date" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => handleRadioChange("gender", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(value) => handleSelectChange("bloodGroup", value)}
                  >
                    <SelectTrigger id="bloodGroup">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a+">A+</SelectItem>
                      <SelectItem value="a-">A-</SelectItem>
                      <SelectItem value="b+">B+</SelectItem>
                      <SelectItem value="b-">B-</SelectItem>
                      <SelectItem value="ab+">AB+</SelectItem>
                      <SelectItem value="ab-">AB-</SelectItem>
                      <SelectItem value="o+">O+</SelectItem>
                      <SelectItem value="o-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="button" onClick={moveToNextTab}>
                  Next: Contact Details
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Textarea id="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input id="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">
                    State/Province <span className="text-red-500">*</span>
                  </Label>
                  <Input id="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">
                    Zip/Postal Code <span className="text-red-500">*</span>
                  </Label>
                  <Input id="zipCode" value={formData.zipCode} onChange={handleChange} required />
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                  Back: Personal Information
                </Button>
                <Button type="button" onClick={moveToNextTab}>
                  Next: Medical Information
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="medical">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Textarea
                    id="allergies"
                    placeholder="List any known allergies or write 'None'"
                    value={formData.allergies}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="currentMedications">Current Medications</Label>
                  <Textarea
                    id="currentMedications"
                    placeholder="List any current medications or write 'None'"
                    value={formData.currentMedications}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="pastMedicalHistory">Past Medical History</Label>
                  <Textarea
                    id="pastMedicalHistory"
                    placeholder="Include surgeries, hospitalizations, chronic conditions, etc."
                    value={formData.pastMedicalHistory}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                  Back: Contact Details
                </Button>
                <Button type="button" onClick={moveToNextTab}>
                  Next: Appointment
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="appointment">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">
                    Emergency Contact Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="emergencyName" value={formData.emergencyName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">
                    Relationship <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyRelationship"
                    value={formData.emergencyRelationship}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">
                    Emergency Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appointmentDate">
                    Preferred Appointment Date <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="appointmentDate"
                      type="date"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      required
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="appointmentReason">
                    Reason for Appointment <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="appointmentReason"
                    placeholder="Please describe your symptoms or reason for visit"
                    value={formData.appointmentReason}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                  Back: Medical Information
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
                >
                  {isLoading ? "Registering Patient..." : "Register Patient"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
