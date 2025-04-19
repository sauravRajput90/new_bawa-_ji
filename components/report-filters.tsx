"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Search, RefreshCw } from "lucide-react"

interface ReportFiltersProps {
  onDateRangeChange?: (range: { start: string; end: string }) => void
  onDepartmentChange?: (department: string) => void
  onDoctorChange?: (doctor: string) => void
  onSearch?: (term: string) => void
  onExport?: () => void
  onRefresh?: () => void
  showDepartmentFilter?: boolean
  showDoctorFilter?: boolean
  showSearch?: boolean
  showExport?: boolean
}

export function ReportFilters({
  onDateRangeChange,
  onDepartmentChange,
  onDoctorChange,
  onSearch,
  onExport,
  onRefresh,
  showDepartmentFilter = true,
  showDoctorFilter = true,
  showSearch = true,
  showExport = true,
}: ReportFiltersProps) {
  const [dateRange, setDateRange] = useState("month")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [department, setDepartment] = useState("all")
  const [doctor, setDoctor] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const handleDateRangeChange = (value: string) => {
    setDateRange(value)

    // Calculate actual date range based on selection
    const today = new Date()
    let start = new Date()
    let end = new Date()

    switch (value) {
      case "today":
        // Start and end are both today
        break
      case "week":
        // Last 7 days
        start.setDate(today.getDate() - 7)
        break
      case "month":
        // Current month
        start = new Date(today.getFullYear(), today.getMonth(), 1)
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        break
      case "quarter":
        // Current quarter
        const quarter = Math.floor(today.getMonth() / 3)
        start = new Date(today.getFullYear(), quarter * 3, 1)
        end = new Date(today.getFullYear(), (quarter + 1) * 3, 0)
        break
      case "year":
        // Current year
        start = new Date(today.getFullYear(), 0, 1)
        end = new Date(today.getFullYear(), 11, 31)
        break
      case "custom":
        // Use the custom date range inputs
        if (startDate && endDate) {
          start = new Date(startDate)
          end = new Date(endDate)
        }
        break
    }

    // Format dates as ISO strings
    const formattedStart = start.toISOString().split("T")[0]
    const formattedEnd = end.toISOString().split("T")[0]

    // Update state and call the callback
    setStartDate(formattedStart)
    setEndDate(formattedEnd)

    if (onDateRangeChange) {
      onDateRangeChange({ start: formattedStart, end: formattedEnd })
    }
  }

  const handleDepartmentChange = (value: string) => {
    setDepartment(value)
    if (onDepartmentChange) {
      onDepartmentChange(value)
    }
  }

  const handleDoctorChange = (value: string) => {
    setDoctor(value)
    if (onDoctorChange) {
      onDoctorChange(value)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  const handleExport = () => {
    if (onExport) {
      onExport()
    } else {
      alert("Exporting report data...")
    }
  }

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh()
    } else {
      alert("Refreshing report data...")
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Select value={dateRange} onValueChange={handleDateRangeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {dateRange === "custom" && (
            <>
              <div className="flex-1">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Start Date"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="End Date"
                />
              </div>
            </>
          )}

          {showDepartmentFilter && (
            <div className="flex-1">
              <Select value={department} onValueChange={handleDepartmentChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="general">General Medicine</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {showDoctorFilter && (
            <div className="flex-1">
              <Select value={doctor} onValueChange={handleDoctorChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  <SelectItem value="dr-sarah-johnson">Dr. Sarah Johnson</SelectItem>
                  <SelectItem value="dr-michael-chen">Dr. Michael Chen</SelectItem>
                  <SelectItem value="dr-emily-taylor">Dr. Emily Taylor</SelectItem>
                  <SelectItem value="dr-james-wilson">Dr. James Wilson</SelectItem>
                  <SelectItem value="dr-olivia-martinez">Dr. Olivia Martinez</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {showSearch && (
            <div className="flex-1">
              <div className="relative">
                <Input placeholder="Search..." value={searchTerm} onChange={handleSearchChange} className="pl-8" />
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          {showExport && (
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
