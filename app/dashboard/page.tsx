"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, User, Bell, Menu, FileText, Heart } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { UpcomingAppointments } from "@/components/upcoming-appointments"
import { HealthTips } from "@/components/health-tips"
import { RecentActivities } from "@/components/recent-activities"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-800/50 z-10 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <PatientSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="lg:hidden text-gray-600">
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4 ml-auto">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center text-white">
                  <User className="h-6 w-6" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">Patient</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Welcome back, John! Here's your health summary.</p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              {
                title: "Upcoming Appointment",
                value: "Apr 15, 2025",
                icon: <Calendar className="h-8 w-8 text-cyan-600" />,
              },
              { title: "Last Checkup", value: "Mar 10, 2025", icon: <Clock className="h-8 w-8 text-cyan-600" /> },
              { title: "Prescriptions", value: "3 Active", icon: <FileText className="h-8 w-8 text-cyan-600" /> },
              { title: "Health Score", value: "92/100", icon: <Heart className="h-8 w-8 text-cyan-600" /> },
            ].map((stat, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className="bg-cyan-50 p-3 rounded-full">{stat.icon}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming appointments */}
          <Card className="mb-6 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-cyan-600" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UpcomingAppointments />
            </CardContent>
          </Card>

          {/* Recent activities and health tips */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-cyan-600" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-cyan-600" />
                  Health Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HealthTips />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
