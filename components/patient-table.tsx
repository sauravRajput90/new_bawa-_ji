"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Filter, MoreHorizontal, FileText, Edit, Trash2, Phone, Download } from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  phone: string
  email: string
  bloodGroup: string
  lastVisit: string
  nextAppointment?: string
  status: string
}

interface PatientTableProps {
  patients: Patient[]
  onEdit?: (patient: Patient) => void
  onDelete?: (patientId: string) => void
  onViewDetails?: (patient: Patient) => void
}

export function PatientTable({ patients, onEdit, onDelete, onViewDetails }: PatientTableProps) {
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const patientsPerPage = 5

  // Update filtered patients when props or filters change
  useEffect(() => {
    let result = [...patients]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.phone.includes(searchTerm) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((patient) => patient.status.toLowerCase() === statusFilter.toLowerCase())
    }

    // Apply year filter
    if (yearFilter !== "all") {
      result = result.filter((patient) => {
        const visitDate = new Date(patient.lastVisit)
        return visitDate.getFullYear().toString() === yearFilter
      })
    }

    setFilteredPatients(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [patients, searchTerm, statusFilter, yearFilter])

  // Calculate pagination
  const indexOfLastPatient = currentPage * patientsPerPage
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient)
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage)

  // Generate page numbers
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
  }

  const handleYearFilterChange = (value: string) => {
    setYearFilter(value)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleExportData = () => {
    // In a real application, this would generate a CSV or PDF
    alert("Exporting patient data...")
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Input
              placeholder="Search by name, ID, phone..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8 w-full"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={yearFilter} onValueChange={handleYearFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Patient List */}
      <div className="space-y-4">
        {currentPatients.length > 0 ? (
          currentPatients.map((patient, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center mb-3 md:mb-0">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-cyan-100 text-cyan-800">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{patient.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{patient.id}</span>
                    <span className="mx-1">•</span>
                    <span>
                      {patient.age} yrs, {patient.gender}
                    </span>
                    <span className="mx-1">•</span>
                    <span>{patient.bloodGroup}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Last Visit: {patient.lastVisit}</span>
                </div>
                {patient.nextAppointment && (
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-green-600">Next: {patient.nextAppointment}</span>
                  </div>
                )}
                <Badge
                  className={
                    patient.status === "Active"
                      ? "bg-green-500"
                      : patient.status === "Inactive"
                        ? "bg-gray-500"
                        : "bg-yellow-500"
                  }
                >
                  {patient.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewDetails?.(patient)}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(patient)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Patient</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete?.(patient.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete Patient</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No patients found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredPatients.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstPatient + 1} to {Math.min(indexOfLastPatient, filteredPatients.length)} of{" "}
            {filteredPatients.length} results
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
