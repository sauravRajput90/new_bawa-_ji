"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, Download } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { DashboardStats } from "@/components/dashboard-stats"
import { LineChart } from "@/components/line-chart"
import { BarChart } from "@/components/bar-chart"
import { PieChart } from "@/components/pie-chart"
import { ReportFilters } from "@/components/report-filters"

// Sample data for charts
const dailyFootfallData = [
  { day: "Mon", patients: 45, appointments: 52 },
  { day: "Tue", patients: 52, appointments: 58 },
  { day: "Wed", patients: 49, appointments: 62 },
  { day: "Thu", patients: 63, appointments: 78 },
  { day: "Fri", patients: 59, appointments: 68 },
  { day: "Sat", patients: 38, appointments: 42 },
  { day: "Sun", patients: 30, appointments: 30 },
]

const monthlyRevenueData = [
  { month: "Jan", revenue: 32500, expenses: 28000 },
  { month: "Feb", revenue: 34200, expenses: 27800 },
  { month: "Mar", revenue: 36800, expenses: 29500 },
  { month: "Apr", revenue: 38629, expenses: 30200 },
  { month: "May", revenue: 0, expenses: 0 },
  { month: "Jun", revenue: 0, expenses: 0 },
  { month: "Jul", revenue: 0, expenses: 0 },
  { month: "Aug", revenue: 0, expenses: 0 },
  { month: "Sep", revenue: 0, expenses: 0 },
  { month: "Oct", revenue: 0, expenses: 0 },
  { month: "Nov", revenue: 0, expenses: 0 },
  { month: "Dec", revenue: 0, expenses: 0 },
]

const departmentAppointmentsData = [
  { name: "Cardiology", value: 124 },
  { name: "Neurology", value: 85 },
  { name: "Orthopedics", value: 92 },
  { name: "Pediatrics", value: 110 },
  { name: "Dermatology", value: 75 },
  { name: "General Medicine", value: 145 },
]

const consultationTypeData = [
  { name: "Online", value: 124 },
  { name: "Offline", value: 362 },
]

const patientDemographicsData = [
  { name: "Under 18", value: 85 },
  { name: "18-30", value: 120 },
  { name: "31-45", value: 164 },
  { name: "46-60", value: 97 },
  { name: "Above 60", value: 78 },
]

export default function ReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [department, setDepartment] = useState("all")
  const [doctor, setDoctor] = useState("all")

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleDateRangeChange = (range: { start: string; end: string }) => {
    setDateRange(range)
    // In a real app, this would fetch new data based on the date range
  }

  const handleDepartmentChange = (value: string) => {
    setDepartment(value)
    // In a real app, this would filter data based on the department
  }

  const handleDoctorChange = (value: string) => {
    setDoctor(value)
    // In a real app, this would filter data based on the doctor
  }

  const handleExportDashboard = () => {
    // In a real app, this would export the dashboard data
    alert("Exporting dashboard data...")
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

            <div className="flex items-center ml-auto">
              <Button onClick={handleExportDashboard} className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                <Download className="mr-2 h-4 w-4" />
                Export Dashboard
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
              <p className="text-gray-600">Comprehensive insights and statistics for your hospital</p>
            </div>
          </div>

          {/* Filters */}
          <ReportFilters
            onDateRangeChange={handleDateRangeChange}
            onDepartmentChange={handleDepartmentChange}
            onDoctorChange={handleDoctorChange}
          />

          {/* Stats Cards */}
          <div className="mb-6">
            <DashboardStats />
          </div>

          {/* Charts - First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <LineChart
              title="Daily Footfall"
              data={dailyFootfallData}
              lines={[
                { dataKey: "patients", stroke: "#0e7490", name: "Patients" },
                { dataKey: "appointments", stroke: "#0891b2", name: "Appointments" },
              ]}
              xAxisDataKey="day"
            />
            <BarChart
              title="Monthly Revenue vs Expenses"
              data={monthlyRevenueData}
              bars={[
                { dataKey: "revenue", fill: "#0e7490", name: "Revenue" },
                { dataKey: "expenses", fill: "#0891b2", name: "Expenses" },
              ]}
              xAxisDataKey="month"
            />
          </div>

          {/* Charts - Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <PieChart
              title="Appointments by Department"
              data={departmentAppointmentsData}
              dataKey="value"
              nameKey="name"
              colors={["#0e7490", "#0891b2", "#06b6d4", "#22d3ee", "#67e8f9", "#a5f3fc"]}
            />
            <PieChart
              title="Consultation Type"
              data={consultationTypeData}
              dataKey="value"
              nameKey="name"
              colors={["#0e7490", "#0891b2"]}
            />
            <PieChart
              title="Patient Demographics"
              data={patientDemographicsData}
              dataKey="value"
              nameKey="name"
              colors={["#0e7490", "#0891b2", "#06b6d4", "#22d3ee", "#67e8f9"]}
            />
          </div>

          {/* Quick Links to Other Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Financial Reports", link: "/admin/reports/financial" },
              { title: "Patient Reports", link: "/admin/reports/patients" },
              { title: "Doctor Reports", link: "/admin/reports/doctors" },
              { title: "Staff Reports", link: "/admin/reports/staff" },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">View detailed reports and analytics</p>
                  <Button variant="outline" className="w-full" onClick={() => (window.location.href = item.link)}>
                    View Reports
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
