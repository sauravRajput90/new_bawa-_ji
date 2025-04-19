"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getDoctorById } from "@/data/doctors"

export interface DoctorInfo {
  id: string | number
  name: string
  qualifications: string[]
  designation: string
  department: string
  specialization: string
  experience: number
  profileImage?: string
}

interface DoctorInfoDisplayProps {
  doctorId: string | number
  showAvatar?: boolean
  showBadge?: boolean
  showExperience?: boolean
  className?: string
}

export default function DoctorInfoDisplay({
  doctorId,
  showAvatar = true,
  showBadge = true,
  showExperience = true,
  className = "",
}: DoctorInfoDisplayProps) {
  const doctor = getDoctorById(String(doctorId))

  if (!doctor) {
    return (
      <Card className={`p-4 ${className}`}>
        <CardContent className="p-0">
          <p className="text-sm text-gray-500">Doctor information not available</p>
        </CardContent>
      </Card>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className={`p-4 ${className}`}>
      <CardContent className="p-0">
        <div className="flex items-start gap-4">
          {showAvatar && (
            <Avatar className="h-16 w-16">
              <AvatarImage src={doctor.profilePhoto || "/placeholder.svg"} alt={doctor.name} />
              <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{doctor.name}</h3>
              {showBadge && (
                <Badge variant="outline" className="text-xs">
                  {doctor.department}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">{doctor.qualification}</p>
            <p className="text-sm">{doctor.designation}</p>
            {showExperience && <p className="text-sm text-gray-500 mt-1">{doctor.experience} years of experience</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
