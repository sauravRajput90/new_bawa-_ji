"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { OpdDoctorSelector } from "@/components/opd-doctor-selector"
import { getDoctorById } from "@/data/doctors"
import {
  Bell,
  Search,
  Calendar,
  Clock,
  Users,
  Activity,
  FileText,
  ChevronRight,
  Plus,
  RefreshCw,
  User,
  Phone,
  CalendarIcon,
  ClipboardList,
  CheckCircle,
  XCircle,
  Settings,
  Menu,
} from "lucide-react"
import Link from "next/link"

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

export default function OpdDashboardPage() {
  const { toast } = useToast()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [recentRegistrations, setRecentRegistrations] = useState<OpdRegistration[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("registration")

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

  // Load existing registrations from localStorage
  useEffect(() => {
    const savedRegistrations = localStorage.getItem("opdRegistrations")
    if (savedRegistrations) {
      const parsedRegistrations = JSON.parse(savedRegistrations) as OpdRegistration[]
      // Sort by registration time (newest first)
      parsedRegistrations.sort(
        (a, b) => new Date(b.registrationTime).getTime() - new Date(a.registrationTime).getTime(),
      )
      setRecentRegistrations(parsedRegistrations)
    }
  }, [])

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

    // Get existing registrations from localStorage
    const existingRegistrations = JSON.parse(localStorage.getItem("opdRegistrations") || "[]")

    // Generate token number
    const tokenNumber = existingRegistrations.length + 1

    // Create new registration with ID
    const newRegistration: OpdRegistration = {
      ...formData,
      id: crypto.randomUUID(), // Generate unique ID
      registrationTime: new Date().toISOString(),
      status: "waiting",
      tokenNumber,
    }

    // Update localStorage and state
    const updatedRegistrations = [newRegistration, ...existingRegistrations]
    localStorage.setItem("opdRegistrations", JSON.stringify(updatedRegistrations))
    setRecentRegistrations(updatedRegistrations)

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

  const filteredRegistrations = recentRegistrations.filter((reg) => {
    // Apply search filter
    const matchesSearch =
      searchQuery === "" ||
      reg.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.contactNumber.includes(searchQuery) ||
      reg.tokenNumber.toString().includes(searchQuery)

    // Apply status filter
    const matchesStatus = statusFilter === "all" || reg.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "in-progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    if (!timeString) return ""

    // Handle ISO string or time string
    if (timeString.includes("T")) {
      const date = new Date(timeString)
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    }

    // Handle time string like "14:30"
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const updateStatus = (id: string, newStatus: OpdRegistration["status"]) => {
    const updatedRegistrations = recentRegistrations.map((reg) => (reg.id === id ? { ...reg, status: newStatus } : reg))
    setRecentRegistrations(updatedRegistrations)
    localStorage.setItem("opdRegistrations", JSON.stringify(updatedRegistrations))

    const registration = recentRegistrations.find((reg) => reg.id === id)
    if (registration) {
      toast({
        title: `Status Updated`,
        description: `Patient ${registration.patientName} is now ${newStatus.replace("-", " ")}`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-800/50 z-10 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10 border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="lg:hidden mr-2 p-2 rounded-md hover:bg-gray-100">
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-md bg-purple-600 flex items-center justify-center mr-3">
                  <ClipboardList className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-gray-800">OPD Management</h1>
              </div>
            </div>

            <div className="flex items-center space-x-5">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 rounded-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Avatar className="h-9 w-9 border-2 border-purple-100">
                  <AvatarImage src="/images/logo (2).jpeg" alt="User" />
                  <AvatarFallback className="bg-purple-100 text-purple-700">AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Dr. Admin</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-none shadow-md bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-100">Today's Appointments</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-xs ml-2 text-purple-200">+12% from yesterday</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-100">Patients Waiting</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs ml-2 text-emerald-200">Avg wait: 15 mins</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-gradient-to-br from-pink-500 to-rose-600 text-white">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-pink-100">Active Doctors</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold">7</p>
                    <p className="text-xs ml-2 text-pink-200">2 on leave today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-gradient-to-br from-amber-500 to-orange-600 text-white">
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-100">Avg. Consultation</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-bold">12m</p>
                    <p className="text-xs ml-2 text-amber-200">-2m from last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
              <TabsTrigger
                value="registration"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                Registration Form
              </TabsTrigger>
              <TabsTrigger value="queue" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <Users className="h-4 w-4 mr-2" />
                Patient Queue
              </TabsTrigger>
            </TabsList>

            {/* Registration Form Tab */}
            <TabsContent value="registration" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Registration Form */}
                <Card className="lg:col-span-2 border-none shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center text-lg">
                      <User className="mr-2 h-5 w-5" />
                      New Patient Registration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="patientName" className="text-sm font-medium">
                            Patient Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="patientName"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            className={`${errors.patientName ? "border-red-500" : "border-gray-200"} focus:border-purple-500 focus:ring-purple-500`}
                            placeholder="Enter patient name"
                          />
                          {errors.patientName && <p className="text-red-500 text-xs">{errors.patientName}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="patientId" className="text-sm font-medium">
                            Patient ID (Optional)
                          </Label>
                          <Input
                            id="patientId"
                            name="patientId"
                            value={formData.patientId}
                            onChange={handleChange}
                            placeholder="For existing patients"
                            className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="age" className="text-sm font-medium">
                            Age <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            type="number"
                            className={`${errors.age ? "border-red-500" : "border-gray-200"} focus:border-purple-500 focus:ring-purple-500`}
                            placeholder="Enter age"
                          />
                          {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="gender" className="text-sm font-medium">
                            Gender <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.gender}
                            onValueChange={(value) => handleSelectChange("gender", value)}
                          >
                            <SelectTrigger
                              className={`${errors.gender ? "border-red-500" : "border-gray-200"} focus:border-purple-500 focus:ring-purple-500`}
                            >
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contactNumber" className="text-sm font-medium">
                            Contact Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="contactNumber"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className={`${errors.contactNumber ? "border-red-500" : "border-gray-200"} focus:border-purple-500 focus:ring-purple-500`}
                            placeholder="Enter contact number"
                          />
                          {errors.contactNumber && <p className="text-red-500 text-xs">{errors.contactNumber}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-sm font-medium">
                            Address
                          </Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                            placeholder="Enter address"
                          />
                        </div>
                      </div>

                      {/* Doctor Selector Component */}
                      <OpdDoctorSelector
                        selectedDepartment={formData.department}
                        selectedDoctorId={formData.doctorId}
                        onDepartmentChange={(value) => handleSelectChange("department", value)}
                        onDoctorChange={(value) => handleSelectChange("doctorId", value)}
                        errors={{
                          department: errors.department,
                          doctorId: errors.doctorId,
                        }}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="appointmentDate" className="text-sm font-medium">
                            Appointment Date <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="appointmentDate"
                            name="appointmentDate"
                            type="date"
                            value={formData.appointmentDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            className={`${errors.appointmentDate ? "border-red-500" : "border-gray-200"} focus:border-purple-500 focus:ring-purple-500`}
                          />
                          {errors.appointmentDate && <p className="text-red-500 text-xs">{errors.appointmentDate}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="appointmentTime" className="text-sm font-medium">
                            Appointment Time <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="appointmentTime"
                            name="appointmentTime"
                            type="time"
                            value={formData.appointmentTime}
                            onChange={handleChange}
                            className={`${errors.appointmentTime ? "border-red-500" : "border-gray-200"} focus:border-purple-500 focus:ring-purple-500`}
                          />
                          {errors.appointmentTime && <p className="text-red-500 text-xs">{errors.appointmentTime}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="symptoms" className="text-sm font-medium">
                          Symptoms / Chief Complaints
                        </Label>
                        <Textarea
                          id="symptoms"
                          name="symptoms"
                          value={formData.symptoms}
                          onChange={handleChange}
                          rows={3}
                          className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Enter patient symptoms or complaints"
                        />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t flex justify-end space-x-4 py-3">
                    <Button variant="outline" type="button">
                      Clear Form
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    >
                      {isSubmitting ? "Registering..." : "Register Patient"}
                    </Button>
                  </CardFooter>
                </Card>

                {/* Recent Registrations */}
                <div className="lg:col-span-1">
                  <Card className="border-none shadow-lg h-full">
                    <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Recent Registrations</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center space-x-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search patients..."
                            className="pl-8 border-none bg-white/20 text-white placeholder:text-white/70 focus:ring-white/30"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 overflow-auto max-h-[600px]">
                      {filteredRegistrations.length > 0 ? (
                        <div className="divide-y">
                          {filteredRegistrations.slice(0, 10).map((registration) => {
                            const doctor = getDoctorById(registration.doctorId)
                            return (
                              <div key={registration.id} className="p-4 hover:bg-gray-50">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-3">
                                      <span className="font-semibold">#{registration.tokenNumber}</span>
                                    </div>
                                    <div>
                                      <h3 className="font-medium">{registration.patientName}</h3>
                                      <p className="text-sm text-gray-500">
                                        {registration.age} yrs,{" "}
                                        {registration.gender.charAt(0).toUpperCase() + registration.gender.slice(1)}
                                      </p>
                                    </div>
                                  </div>
                                  <Badge className={getStatusBadgeColor(registration.status)}>
                                    {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                                  </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-2 ml-13">
                                  <div className="flex items-center">
                                    <Phone className="h-3 w-3 text-gray-400 mr-1" />
                                    <span>{registration.contactNumber}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <CalendarIcon className="h-3 w-3 text-gray-400 mr-1" />
                                    <span>{formatTime(registration.appointmentTime)}</span>
                                  </div>
                                </div>

                                <div className="text-sm mb-3 ml-13">
                                  <span className="text-gray-500">Doctor:</span> {doctor ? doctor.name : "Unknown"}
                                  <span className="mx-2">•</span>
                                  <span className="text-gray-500">Dept:</span> {registration.department}
                                </div>

                                <div className="flex justify-end">
                                  <Link href={`/admin/opd/view/${registration.id}`}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 -mr-2 h-8"
                                    >
                                      View Details
                                      <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <p className="text-gray-500">No registrations found</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t flex justify-between py-3">
                      <p className="text-sm text-gray-500">
                        Showing {Math.min(filteredRegistrations.length, 10)} of {filteredRegistrations.length}
                      </p>
                      <Link href="/admin/opd">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-purple-600 border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                        >
                          View All
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Patient Queue Tab */}
            <TabsContent value="queue" className="mt-0">
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-lg">
                      <Users className="mr-2 h-5 w-5" />
                      Patient Queue Management
                    </CardTitle>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[130px] border-none bg-white/20 text-white focus:ring-white/30">
                        <SelectValue placeholder="Filter status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="waiting">Waiting</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {filteredRegistrations.length > 0 ? (
                      filteredRegistrations.map((registration) => {
                        const doctor = getDoctorById(registration.doctorId)
                        return (
                          <div
                            key={registration.id}
                            className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden"
                          >
                            <div className="flex flex-col md:flex-row">
                              <div className="bg-purple-50 p-4 md:p-6 flex items-center justify-center md:w-24">
                                <div className="text-center">
                                  <span className="block text-2xl font-bold text-purple-700">
                                    #{registration.tokenNumber}
                                  </span>
                                  <span className="text-xs text-gray-500">Token</span>
                                </div>
                              </div>

                              <div className="flex-1 p-4 md:p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                  <div>
                                    <h3 className="font-medium text-lg">{registration.patientName}</h3>
                                    <p className="text-sm text-gray-500">
                                      {registration.age} yrs,{" "}
                                      {registration.gender.charAt(0).toUpperCase() + registration.gender.slice(1)}
                                      <span className="mx-2">•</span>
                                      <span>{registration.contactNumber}</span>
                                    </p>
                                  </div>
                                  <Badge className={`mt-2 md:mt-0 ${getStatusBadgeColor(registration.status)}`}>
                                    {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                                  </Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500 block">Doctor</span>
                                    <span className="font-medium">{doctor ? doctor.name : "Unknown"}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 block">Department</span>
                                    <span className="font-medium">{registration.department}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 block">Appointment</span>
                                    <span className="font-medium">
                                      {formatDate(registration.appointmentDate)} at{" "}
                                      {formatTime(registration.appointmentTime)}
                                    </span>
                                  </div>
                                </div>

                                {registration.symptoms && (
                                  <div className="mt-3 text-sm">
                                    <span className="text-gray-500 block">Symptoms</span>
                                    <p className="text-gray-700">{registration.symptoms}</p>
                                  </div>
                                )}
                              </div>

                              <div className="bg-gray-50 p-4 flex flex-row md:flex-col justify-end space-x-2 md:space-x-0 md:space-y-2 border-t md:border-t-0 md:border-l">
                                {registration.status === "waiting" && (
                                  <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                    onClick={() => updateStatus(registration.id, "in-progress")}
                                  >
                                    <Clock className="h-4 w-4 mr-1" />
                                    Start
                                  </Button>
                                )}
                                {registration.status === "in-progress" && (
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => updateStatus(registration.id, "completed")}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Complete
                                  </Button>
                                )}
                                {(registration.status === "waiting" || registration.status === "in-progress") && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-200 text-red-600 hover:bg-red-50"
                                    onClick={() => updateStatus(registration.id, "cancelled")}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Cancel
                                  </Button>
                                )}
                                <Link href={`/admin/opd/view/${registration.id}`}>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-gray-200 text-gray-600 hover:bg-gray-100"
                                  >
                                    View
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Users className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No patients in queue</h3>
                        <p className="text-gray-500">Register new patients to see them in the queue</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-4 px-6 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">© 2023 New Bawa Lal Ji Hospital. All rights reserved.</p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Registration
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
