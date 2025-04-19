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
import { Calendar, Upload } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { getAllDepartments, getAllSpecializations } from "@/data/doctors"

interface DoctorModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (doctorData: any) => void
  initialData?: any
}

export function DoctorModal({ isOpen, onClose, onSubmit, initialData }: DoctorModalProps) {
  const isEditing = !!initialData
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [departments] = useState(getAllDepartments())
  const [specializations] = useState(getAllSpecializations())

  const [formData, setFormData] = useState(
    initialData || {
      fullName: "",
      gender: "male",
      dob: "",
      email: "",
      phone: "",
      address: "",
      profilePhoto: null,
      department: "",
      specialization: "",
      designation: "",
      qualifications: "",
      experience: "",
      registrationNo: "",
      consultationType: "both",
      consultationFees: "",
      consultationDuration: "30",
      maxPatientsPerSlot: "1",
      onlineConsultationLink: "",
      availableDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      timeSlots: [{ start: "09:00", end: "13:00" }],
      unavailableDates: [],
      isAvailable: true,
      about: "",
    },
  )

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

  const handleCheckboxChange = (day: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: {
        ...prev.availableDays,
        [day]: checked,
      },
    }))
  }

  const handleAddTimeSlot = () => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: [...prev.timeSlots, { start: "09:00", end: "17:00" }],
    }))
  }

  const handleRemoveTimeSlot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index),
    }))
  }

  const handleTimeSlotChange = (index: number, field: "start" | "end", value: string) => {
    setFormData((prev) => {
      const newTimeSlots = [...prev.timeSlots]
      newTimeSlots[index][field] = value
      return { ...prev, timeSlots: newTimeSlots }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to save doctor data
    setTimeout(() => {
      onSubmit(formData)
      setIsLoading(false)
      onClose()

      // Reset form data if not editing
      if (!isEditing) {
        setFormData({
          fullName: "",
          gender: "male",
          dob: "",
          email: "",
          phone: "",
          address: "",
          profilePhoto: null,
          department: "",
          specialization: "",
          designation: "",
          qualifications: "",
          experience: "",
          registrationNo: "",
          consultationType: "both",
          consultationFees: "",
          consultationDuration: "30",
          maxPatientsPerSlot: "1",
          onlineConsultationLink: "",
          availableDays: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
          },
          timeSlots: [{ start: "09:00", end: "13:00" }],
          unavailableDates: [],
          isAvailable: true,
          about: "",
        })
        setActiveTab("personal")
      }
    }, 1500)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const moveToNextTab = () => {
    if (activeTab === "personal") setActiveTab("professional")
    else if (activeTab === "professional") setActiveTab("consultation")
    else if (activeTab === "consultation") setActiveTab("schedule")
  }

  const moveToPreviousTab = () => {
    if (activeTab === "schedule") setActiveTab("consultation")
    else if (activeTab === "consultation") setActiveTab("professional")
    else if (activeTab === "professional") setActiveTab("personal")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {isEditing ? "Edit Doctor" : "Add New Doctor"}
          </DialogTitle>
          <DialogDescription>
            Enter doctor details to {isEditing ? "update" : "create"} a record. All fields marked with{" "}
            <span className="text-red-500">*</span> are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="professional">Professional Details</TabsTrigger>
              <TabsTrigger value="consultation">Consultation Details</TabsTrigger>
              <TabsTrigger value="schedule">Schedule Management</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="profilePhoto">Profile Photo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border">
                      {formData.profilePhoto ? (
                        <img
                          src={formData.profilePhoto || "/images/logo (2).jpeg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <Button type="button" variant="outline">
                      Upload Photo
                    </Button>
                    <p className="text-sm text-gray-500">Recommended: 300x300px, Max 2MB</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Dr. John Smith"
                  />
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
                  <Label htmlFor="dob">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input id="dob" type="date" value={formData.dob} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="doctor@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Office address (optional)"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="button" onClick={moveToNextTab}>
                  Next: Professional Details
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="professional">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <Select
  value={formData.department || ""}
  onValueChange={(value) => handleSelectChange("department", value)}
>

                    <SelectTrigger id="department">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">
                    Specialization <span className="text-red-500">*</span>
                  </Label>
                  <Select
  value={formData.specialization || ""}
  onValueChange={(value) => handleSelectChange("specialization", value)}
>

                    <SelectTrigger id="specialization">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation">
                    Designation <span className="text-red-500">*</span>
                  </Label>
                  <Select
  value={formData.designation || ""}
  onValueChange={(value) => handleSelectChange("designation", value)}
>

                    <SelectTrigger id="designation">
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior-consultant">Junior Consultant</SelectItem>
                      <SelectItem value="consultant">Consultant</SelectItem>
                      <SelectItem value="senior-consultant">Senior Consultant</SelectItem>
                      <SelectItem value="hod">Head of Department</SelectItem>
                      <SelectItem value="director">Medical Director</SelectItem>
                      <SelectItem value="resident">Resident Doctor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualifications">
                    Qualifications <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    required
                    placeholder="MBBS, MD, MS, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">
                    Experience (years) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    placeholder="10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationNo">
                    Medical Council Registration No. <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="registrationNo"
                    value={formData.registrationNo}
                    onChange={handleChange}
                    required
                    placeholder="MCI-12345"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="about">About Doctor</Label>
                  <Textarea
                    id="about"
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="Brief description about the doctor's background, expertise, and achievements"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                  Back: Personal Information
                </Button>
                <Button type="button" onClick={moveToNextTab}>
                  Next: Consultation Details
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="consultation">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="consultationType">
                    Consultation Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
  value={formData.designation || ""}
  onValueChange={(value) => handleSelectChange("designation", value)}
>

                    <SelectTrigger id="consultationType">
                      <SelectValue placeholder="Select consultation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online Only</SelectItem>
                      <SelectItem value="offline">Offline Only</SelectItem>
                      <SelectItem value="both">Both Online & Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consultationFees">
                    Consultation Fees (INR) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="consultationFees"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.consultationFees}
                    onChange={handleChange}
                    required
                    placeholder="500.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consultationDuration">
                    Consultation Duration (minutes) <span className="text-red-500">*</span>
                  </Label>
                  <Select
  value={formData.consultationDuration || ""}
  onValueChange={(value) => handleSelectChange("consultationDuration", value)}
>

                    <SelectTrigger id="consultationDuration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPatientsPerSlot">Max Patients Per Slot</Label>
                  <Select
  value={formData.maxPatientsPerSlot || ""}
  onValueChange={(value) => handleSelectChange("maxPatientsPerSlot", value)}
>

                    <SelectTrigger id="maxPatientsPerSlot">
                      <SelectValue placeholder="Select max patients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 patient</SelectItem>
                      <SelectItem value="2">2 patients</SelectItem>
                      <SelectItem value="3">3 patients</SelectItem>
                      <SelectItem value="4">4 patients</SelectItem>
                      <SelectItem value="5">5 patients</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(formData.consultationType === "online" || formData.consultationType === "both") && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="onlineConsultationLink">
                      Online Consultation Link
                      {formData.consultationType === "online" && <span className="text-red-500"> *</span>}
                    </Label>
                    <Input
                      id="onlineConsultationLink"
                      value={formData.onlineConsultationLink}
                      onChange={handleChange}
                      required={formData.consultationType === "online"}
                      placeholder="https://zoom.us/j/123456789"
                    />
                    <p className="text-xs text-gray-500">Zoom, Google Meet, or any other video conferencing link</p>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                  Back: Professional Details
                </Button>
                <Button type="button" onClick={moveToNextTab}>
                  Next: Schedule Management
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="schedule">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Available Days <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries({
                      monday: "Monday",
                      tuesday: "Tuesday",
                      wednesday: "Wednesday",
                      thursday: "Thursday",
                      friday: "Friday",
                      saturday: "Saturday",
                      sunday: "Sunday",
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={formData.availableDays[key as keyof typeof formData.availableDays]}
                          onCheckedChange={(checked) => handleCheckboxChange(key, checked as boolean)}
                        />
                        <Label htmlFor={key} className="font-normal">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      Time Slots <span className="text-red-500">*</span>
                    </Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddTimeSlot}>
                      Add Time Slot
                    </Button>
                  </div>

                  {formData.timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-1 space-y-1">
                        <Label htmlFor={`start-${index}`}>Start Time</Label>
                        <Input
                          id={`start-${index}`}
                          type="time"
                          value={slot.start}
                          onChange={(e) => handleTimeSlotChange(index, "start", e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Label htmlFor={`end-${index}`}>End Time</Label>
                        <Input
                          id={`end-${index}`}
                          type="time"
                          value={slot.end}
                          onChange={(e) => handleTimeSlotChange(index, "end", e.target.value)}
                          required
                        />
                      </div>
                      {formData.timeSlots.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="mt-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveTimeSlot(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <p className="text-xs text-gray-500">
                    Add multiple time slots if the doctor has breaks between sessions
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unavailableDates">Unavailable Dates</Label>
                  <div className="relative">
                    <Input id="unavailableDates" type="date" className="pr-10" />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  </div>
                  <p className="text-xs text-gray-500">
                    Add dates when the doctor will be unavailable (leave, conferences, etc.)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isAvailable"
                    checked={formData.isAvailable}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isAvailable: checked as boolean }))}
                  />
                  <Label htmlFor="isAvailable" className="font-medium">
                    Doctor is currently available for appointments
                  </Label>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                  Back: Consultation Details
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
                >
                  {isLoading
                    ? isEditing
                      ? "Updating Doctor..."
                      : "Adding Doctor..."
                    : isEditing
                      ? "Update Doctor"
                      : "Add Doctor"}
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
