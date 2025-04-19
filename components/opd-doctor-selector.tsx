"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllDepartments, getDoctorsByDepartment } from "@/data/doctors"

interface Doctor {
  id: string
  name: string
  department: string
  qualification: string
  designation: string
  isActive: boolean
}

interface OpdDoctorSelectorProps {
  selectedDepartment: string
  selectedDoctorId: string
  onDepartmentChange: (department: string) => void
  onDoctorChange: (doctorId: string) => void
  errors?: {
    department?: string
    doctorId?: string
  }
}

export function OpdDoctorSelector({
  selectedDepartment,
  selectedDoctorId,
  onDepartmentChange,
  onDoctorChange,
  errors,
}: OpdDoctorSelectorProps) {
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([])
  const [departments, setDepartments] = useState<string[]>([])

  // Load departments on component mount
  useEffect(() => {
    setDepartments(getAllDepartments())
  }, [])

  // Update available doctors when department changes
  useEffect(() => {
    if (selectedDepartment) {
      setAvailableDoctors(getDoctorsByDepartment(selectedDepartment))
    } else {
      setAvailableDoctors([])
    }
  }, [selectedDepartment])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="department">
          Department <span className="text-red-500">*</span>
        </Label>
        <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
          <SelectTrigger className={errors?.department ? "border-red-500" : ""}>
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
        {errors?.department && <p className="text-red-500 text-sm">{errors.department}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="doctorId">
          Consulting Doctor <span className="text-red-500">*</span>
        </Label>
        <Select value={selectedDoctorId} onValueChange={onDoctorChange} disabled={!selectedDepartment}>
          <SelectTrigger className={errors?.doctorId ? "border-red-500" : ""}>
            <SelectValue placeholder={selectedDepartment ? "Select doctor" : "Select department first"} />
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
        {errors?.doctorId && <p className="text-red-500 text-sm">{errors.doctorId}</p>}
      </div>
    </div>
  )
}
