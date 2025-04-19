"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  FileText,
  Users,
  BarChart3,
  DollarSign,
  Briefcase,
  CreditCard,
  Search,
  ChevronDown,
} from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PatientManagementCard } from "@/components/patient-management-card"
import { DoctorManagementCard } from "@/components/doctor-management-card"
import { StaffManagementCard } from "@/components/staff-management-card"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handlePatientAdded = (patientData: any) => {
    // In a real app, this would save to a database
    console.log("New patient added:", patientData)

    // Navigate to the patients page to see the new patient
    router.push("/admin/patients")
  }

  const handleDoctorAdded = (doctorData: any) => {
    // In a real app, this would save to a database
    console.log("New doctor added:", doctorData)

    // Navigate to the doctors page to see the new doctor
    router.push("/admin/doctors")
  }

  const handleStaffAdded = (staffData: any) => {
    // In a real app, this would save to a database
    console.log("New staff added:", staffData)

    // Navigate to the staff page to see the new staff member
    router.push("/admin/staff")
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
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="lg:hidden text-gray-600">
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center ml-auto space-x-4">
              <div className="relative">
                <Input placeholder="Search..." className="w-[200px] lg:w-[300px] h-9 pl-8" />
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              </div>

              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  5
                </span>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-cyan-600 text-white">AD</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block">
                      <p className="text-sm font-medium">Admin User</p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin! Here's what's happening today.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <PatientManagementCard onPatientAdded={handlePatientAdded} />
            <DoctorManagementCard onDoctorAdded={handleDoctorAdded} />
            <StaffManagementCard onStaffAdded={handleStaffAdded} />

            <Link href="/admin/billing/new">
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                  <div className="bg-purple-500 text-white p-3 rounded-full mb-3">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <p className="font-medium text-sm">Create Invoice</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              {
                title: "Total Patients",
                value: "1,248",
                icon: <Users className="h-8 w-8 text-cyan-600" />,
                change: "+12% from last month",
              },
              {
                title: "Total Doctors",
                value: "36",
                icon: <Briefcase className="h-8 w-8 text-cyan-600" />,
                change: "+2 new this month",
              },
              {
                title: "Today's Appointments",
                value: "48",
                icon: <Calendar className="h-8 w-8 text-cyan-600" />,
                change: "8 pending confirmation",
              },
              {
                title: "Monthly Revenue",
                value: "$38,629",
                icon: <DollarSign className="h-8 w-8 text-cyan-600" />,
                change: "+18% from last month",
              },
            ].map((stat, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </div>
                    <div className="bg-cyan-50 p-3 rounded-full">{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="appointments" className="mb-6">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
              <TabsTrigger value="patients">Recent Patients</TabsTrigger>
              <TabsTrigger value="activities">Recent Activities</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-cyan-600" />
                    Today's Appointments
                    <Badge className="ml-2 bg-cyan-600">48 Total</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        patient: "Sarah Johnson",
                        doctor: "Dr. Michael Chen",
                        time: "09:00 AM",
                        type: "Consultation",
                        status: "Confirmed",
                      },
                      {
                        patient: "Robert Williams",
                        doctor: "Dr. Emily Taylor",
                        time: "10:30 AM",
                        type: "Follow-up",
                        status: "Checked In",
                      },
                      {
                        patient: "Jennifer Davis",
                        doctor: "Dr. James Wilson",
                        time: "11:45 AM",
                        type: "New Patient",
                        status: "Pending",
                      },
                      {
                        patient: "Michael Brown",
                        doctor: "Dr. Sarah Johnson",
                        time: "01:15 PM",
                        type: "Consultation",
                        status: "Confirmed",
                      },
                    ].map((appointment, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center mb-3 md:mb-0">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback className="bg-cyan-100 text-cyan-800">
                              {appointment.patient
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{appointment.patient}</h3>
                            <p className="text-sm text-gray-500">{appointment.doctor}</p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{appointment.type}</span>
                          </div>
                          <Badge
                            className={
                              appointment.status === "Confirmed"
                                ? "bg-green-500"
                                : appointment.status === "Checked In"
                                  ? "bg-blue-500"
                                  : "bg-yellow-500"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="text-cyan-600 border-cyan-600 hover:bg-cyan-50">
                      View All Appointments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patients">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="h-5 w-5 mr-2 text-cyan-600" />
                    Recent Patients
                    <Badge className="ml-2 bg-cyan-600">12 New</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Emma Thompson",
                        id: "PT-10234",
                        date: "Apr 12, 2025",
                        doctor: "Dr. Michael Chen",
                        status: "Active",
                      },
                      {
                        name: "James Wilson",
                        id: "PT-10235",
                        date: "Apr 11, 2025",
                        doctor: "Dr. Emily Taylor",
                        status: "Active",
                      },
                      {
                        name: "Olivia Martinez",
                        id: "PT-10236",
                        date: "Apr 10, 2025",
                        doctor: "Dr. James Wilson",
                        status: "Pending",
                      },
                      {
                        name: "William Johnson",
                        id: "PT-10237",
                        date: "Apr 09, 2025",
                        doctor: "Dr. Sarah Johnson",
                        status: "Active",
                      },
                    ].map((patient, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
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
                            <p className="text-sm text-gray-500">{patient.id}</p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{patient.date}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{patient.doctor}</span>
                          </div>
                          <Badge className={patient.status === "Active" ? "bg-green-500" : "bg-yellow-500"}>
                            {patient.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link href="/admin/patients">
                      <Button variant="outline" className="text-cyan-600 border-cyan-600 hover:bg-cyan-50">
                        View All Patients
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-cyan-600" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { activity: "New patient registered", user: "Admin User", date: "Today", time: "09:15 AM" },
                      {
                        activity: "Appointment rescheduled",
                        user: "Dr. Emily Taylor",
                        date: "Today",
                        time: "08:30 AM",
                      },
                      {
                        activity: "Invoice #INV-2025 generated",
                        user: "Admin User",
                        date: "Yesterday",
                        time: "04:45 PM",
                      },
                      {
                        activity: "New doctor profile created",
                        user: "Admin User",
                        date: "Yesterday",
                        time: "02:15 PM",
                      },
                      { activity: "Inventory updated", user: "Pharmacy Staff", date: "Yesterday", time: "11:30 AM" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 mt-2 rounded-full bg-cyan-600 mr-3"></div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.activity}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{activity.user}</span>
                            <span className="mx-2">•</span>
                            <span>
                              {activity.date} at {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Hospital Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-cyan-600" />
                  Revenue Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Revenue chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Users className="h-5 w-5 mr-2 text-cyan-600" />
                  Department Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Department statistics chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
