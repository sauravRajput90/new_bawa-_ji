"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, ArrowLeft } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ReportFilters } from "@/components/report-filters"
import { ReportTable } from "@/components/report-table"
import { BarChart } from "@/components/bar-chart"
import { PieChart } from "@/components/pie-chart"

// Sample data for doctor reports
const doctorAppointmentsData = [
  { name: "Dr. Sarah Johnson", appointments: 124 },
  { name: "Dr. Michael Chen", appointments: 98 },
  { name: "Dr. Emily Taylor", appointments: 112 },
  { name: "Dr. James Wilson", appointments: 86 },
  { name: "Dr. Olivia Martinez", appointments: 104 },
]

const consultationTypeData = [
  { name: "Online", value: 124 },
  { name: "Offline", value: 362 },
]

const averageConsultationTimeData = [
  { name: "Dr. Sarah Johnson", time: 18 },
  { name: "Dr. Michael Chen", time: 22 },
  { name: "Dr. Emily Taylor", time: 15 },
  { name: "Dr. James Wilson", time: 25 },
  { name: "Dr. Olivia Martinez", time: 20 },
]

const doctorRevenueData = [
  { name: "Dr. Sarah Johnson", revenue: 12400 },
  { name: "Dr. Michael Chen", revenue: 9800 },
  { name: "Dr. Emily Taylor", revenue: 11200 },
  { name: "Dr. James Wilson", revenue: 8600 },
  { name: "Dr. Olivia Martinez", revenue: 10400 },
]

const doctorData = [
  {
    id: "DOC-1001",
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    experience: "15 years",
    appointmentsToday: 8,
    appointmentsWeek: 42,
    appointmentsMonth: 124,
    avgConsultTime: "18 mins",
    revenue: "$12,400",
    rating: 4.8,
  },
  {
    id: "DOC-1002",
    name: "Dr. Michael Chen",
    specialization: "Neurology",
    experience: "8 years",
    appointmentsToday: 6,
    appointmentsWeek: 32,
    appointmentsMonth: 98,
    avgConsultTime: "22 mins",
    revenue: "$9,800",
    rating: 4.5,
  },
  {
    id: "DOC-1003",
    name: "Dr. Emily Taylor",
    specialization: "Pediatrics",
    experience: "5 years",
    appointmentsToday: 7,
    appointmentsWeek: 38,
    appointmentsMonth: 112,
    avgConsultTime: "15 mins",
    revenue: "$11,200",
    rating: 4.7,
  },
  {
    id: "DOC-1004",
    name: "Dr. James Wilson",
    specialization: "Orthopedics",
    experience: "20 years",
    appointmentsToday: 5,
    appointmentsWeek: 28,
    appointmentsMonth: 86,
    avgConsultTime: "25 mins",
    revenue: "$8,600",
    rating: 4.9,
  },
  {
    id: "DOC-1005",
    name: "Dr. Olivia Martinez",
    specialization: "Dermatology",
    experience: "7 years",
    appointmentsToday: 6,
    appointmentsWeek: 35,
    appointmentsMonth: 104,
    avgConsultTime: "20 mins",
    revenue: "$10,400",
    rating: 4.6,
  },
]

export default function DoctorReportsPage() {
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
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="lg:hidden text-gray-600 mr-2">
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/admin/reports">
                <Button variant="ghost" className="flex items-center gap-2 text-gray-600">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Reports
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Doctor Reports</h1>
              <p className="text-gray-600">Doctor performance, appointments, and revenue metrics</p>
            </div>
          </div>

          {/* Filters */}
          <ReportFilters showDepartmentFilter={true} showDoctorFilter={true} />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <BarChart
              title="Appointments by Doctor"
              data={doctorAppointmentsData}
              bars={[{ dataKey: "appointments", fill: "#0e7490", name: "Appointments" }]}
              xAxisDataKey="name"
            />
            <BarChart
              title="Revenue by Doctor"
              data={doctorRevenueData}
              bars={[{ dataKey: "revenue", fill: "#0e7490", name: "Revenue ($)" }]}
              xAxisDataKey="name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <BarChart
              title="Average Consultation Time (minutes)"
              data={averageConsultationTimeData}
              bars={[{ dataKey: "time", fill: "#0e7490", name: "Minutes" }]}
              xAxisDataKey="name"
              height={300}
            />
            <PieChart
              title="Consultation Type"
              data={consultationTypeData}
              dataKey="value"
              nameKey="name"
              colors={["#0e7490", "#0891b2"]}
              height={300}
            />
          </div>

          {/* Doctor Table */}
          <div className="mb-6">
            <ReportTable
              title="Doctor Performance"
              data={doctorData}
              columns={[
                { key: "id", header: "Doctor ID" },
                { key: "name", header: "Doctor Name" },
                { key: "specialization", header: "Specialization" },
                { key: "experience", header: "Experience" },
                { key: "appointmentsMonth", header: "Monthly Appointments" },
                { key: "avgConsultTime", header: "Avg. Consult Time" },
                { key: "revenue", header: "Revenue", className: "text-right" },
                {
                  key: "rating",
                  header: "Rating",
                  cell: (row) => (
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{row.rating}</span>
                    </div>
                  ),
                },
              ]}
              badge={{ text: "Total: 36 Doctors" }}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
