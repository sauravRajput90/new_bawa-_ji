"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, FileText, Edit, Trash2, Calendar, Download, Star, Video } from "lucide-react"

interface Doctor {
  id: string
  name: string
  profilePhoto?: string
  specialization: string
  qualification: string
  designation: string
  experience: string
  availability: boolean
  consultationType: string
  rating?: number
}

interface DoctorTableProps {
  doctors: Doctor[]
  onEdit?: (doctor: Doctor) => void
  onDelete?: (doctorId: string) => void
  onViewProfile?: (doctor: Doctor) => void
}

export function DoctorTable({ doctors, onEdit, onDelete, onViewProfile }: DoctorTableProps) {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors)
  const [searchTerm, setSearchTerm] = useState("")
  const [specializationFilter, setSpecializationFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)
  const doctorsPerPage = 5

  // Update filtered doctors when props or filters change
  useEffect(() => {
    let result = [...doctors]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.qualification.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply specialization filter
    if (specializationFilter !== "all") {
      result = result.filter((doctor) => doctor.specialization.toLowerCase() === specializationFilter.toLowerCase())
    }

    // Apply availability filter
    if (availabilityFilter !== "all") {
      const isAvailable = availabilityFilter === "available"
      result = result.filter((doctor) => doctor.availability === isAvailable)
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "experience") {
        return Number.parseInt(b.experience) - Number.parseInt(a.experience)
      } else if (sortBy === "rating" && a.rating && b.rating) {
        return b.rating - a.rating
      }
      return 0
    })

    setFilteredDoctors(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [doctors, searchTerm, specializationFilter, availabilityFilter, sortBy])

  // Calculate pagination
  const indexOfLastDoctor = currentPage * doctorsPerPage
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor)
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage)

  // Generate page numbers
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSpecializationFilterChange = (value: string) => {
    setSpecializationFilter(value)
  }

  const handleAvailabilityFilterChange = (value: string) => {
    setAvailabilityFilter(value)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleExportData = () => {
    // In a real application, this would generate a CSV or PDF
    alert("Exporting doctor data...")
  }

  const getConsultationTypeIcon = (type: string) => {
    switch (type) {
      case "online":
        return <Video className="h-4 w-4 text-blue-500" title="Online Only" />
      case "offline":
        return <Calendar className="h-4 w-4 text-green-500" title="Offline Only" />
      case "both":
        return (
          <div className="flex space-x-1">
            <Video className="h-4 w-4 text-blue-500" title="Online" />
            <Calendar className="h-4 w-4 text-green-500" title="Offline" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Input
              placeholder="Search by name, ID, specialization..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8 w-full"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Select value={specializationFilter} onValueChange={handleSpecializationFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="general">General Medicine</SelectItem>
            </SelectContent>
          </Select>
          <Select value={availabilityFilter} onValueChange={handleAvailabilityFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Doctor List */}
      <div className="space-y-4">
        {currentDoctors.length > 0 ? (
          currentDoctors.map((doctor, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center mb-3 md:mb-0">
                <Avatar className="h-12 w-12 mr-3">
                  {doctor.profilePhoto ? (
                    <AvatarImage src={doctor.profilePhoto} alt={doctor.name} />
                  ) : (
                    <AvatarFallback className="bg-green-100 text-green-800">
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{doctor.name}</h3>
                    {doctor.rating && (
                      <div className="flex items-center ml-2">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs ml-0.5">{doctor.rating}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{doctor.specialization}</span>
                    <span className="mx-1">•</span>
                    <span>{doctor.qualification}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 mr-2">Experience:</span>
                  <span>{doctor.experience} years</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 mr-2">Designation:</span>
                  <span>{doctor.designation}</span>
                </div>
                <div className="flex items-center">{getConsultationTypeIcon(doctor.consultationType)}</div>
                <Badge className={doctor.availability ? "bg-green-500" : "bg-gray-500"}>
                  {doctor.availability ? "Available" : "Unavailable"}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewProfile?.(doctor)}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>View Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(doctor)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Doctor</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete?.(doctor.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete Doctor</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No doctors found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredDoctors.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstDoctor + 1} to {Math.min(indexOfLastDoctor, filteredDoctors.length)} of{" "}
            {filteredDoctors.length} results
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {pageNumbers.map((number) => (
              <Button
                key={number}
                variant="outline"
                size="sm"
                className={currentPage === number ? "bg-cyan-50" : ""}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
