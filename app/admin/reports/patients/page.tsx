"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, ArrowLeft } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ReportFilters } from "@/components/report-filters"
import { ReportTable } from "@/components/report-table"
import { LineChart } from "@/components/line-chart"
import { PieChart } from "@/components/pie-chart"
import { BarChart } from "@/components/bar-chart"

// Sample data for patient reports
const patientTrendData = [
  { month: "Jan", newPatients: 85, returningPatients: 120 },
  { month: "Feb", newPatients: 92, returningPatients: 135 },
  { month: "Mar", newPatients: 78, returningPatients: 142 },
  { month: "Apr", newPatients: 96, returningPatients: 158 },
]

const patientDemographicsData = [
  { name: "Under 18", value: 85 },
  { name: "18-30", value: 120 },
  { name: "31-45", value: 164 },
  { name: "46-60", value: 97 },
  { name: "Above 60", value: 78 },
]

const patientGenderData = [
  { name: "Male", value: 268 },
  { name: "Female", value: 276 },
]

const departmentDistributionData = [
  { department: "Cardiology", patients: 124 },
  { department: "Neurology", patients: 85 },
  { department: "Orthopedics", patients: 92 },
  { department: "Pediatrics", patients: 110 },
  { department: "Dermatology", patients: 75 },
  { department: "General Medicine", patients: 145 },
]

const patientData = [
  {
    id: "PT-10234",
    name: "Emma Thompson",
    gender: "Female",
    age: 42,
    contactNumber: "+1 (555) 123-4567",
    lastVisit: "2025-04-12",
    totalVisits: 8,
    department: "Cardiology",
    status: "Active",
  },
  {
    id: "PT-10235",
    name: "James Wilson",
    gender: "Male",
    age: 35,
    contactNumber: "+1 (555) 234-5678",
    lastVisit: "2025-04-11",
    totalVisits: 3,
    department: "Orthopedics",
    status: "Active",
  },
  {
    id: "PT-10236",
    name: "Olivia Martinez",
    gender: "Female",
    age: 28,
    contactNumber: "+1 (555) 345-6789",
    lastVisit: "2025-04-10",
    totalVisits: 5,
    department: "Dermatology",
    status: "Active",
  },
  {
    id: "PT-10237",
    name: "William Johnson",
    gender: "Male",
    age: 56,
    contactNumber: "+1 (555) 456-7890",
    lastVisit: "2025-04-09",
    totalVisits: 12,
    department: "Cardiology",
    status: "Active",
  },
  {
    id: "PT-10238",
    name: "Sophia Brown",
    gender: "Female",
    age: 31,
    contactNumber: "+1 (555) 567-8901",
    lastVisit: "2025-04-08",
    totalVisits: 2,
    department: "General Medicine",
    status: "Inactive",
  },
]

export default function PatientReportsPage() {
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
              <h1 className="text-2xl font-bold text-gray-800">Patient Reports</h1>
              <p className="text-gray-600">Patient statistics, demographics, and visit trends</p>
            </div>
          </div>

          {/* Filters */}
          <ReportFilters showDoctorFilter={false} />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <LineChart
              title="Patient Trend"
              data={patientTrendData}
              lines={[
                { dataKey: "newPatients", stroke: "#0e7490", name: "New Patients" },
                { dataKey: "returningPatients", stroke: "#0891b2", name: "Returning Patients" },
              ]}
              xAxisDataKey="month"
            />
            <BarChart
              title="Patients by Department"
              data={departmentDistributionData}
              bars={[{ dataKey: "patients", fill: "#0e7490", name: "Patients" }]}
              xAxisDataKey="department"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <PieChart
              title="Patient Age Demographics"
              data={patientDemographicsData}
              dataKey="value"
              nameKey="name"
              colors={["#0e7490", "#0891b2", "#06b6d4", "#22d3ee", "#67e8f9"]}
              height={300}
            />
            <PieChart
              title="Patient Gender Distribution"
              data={patientGenderData}
              dataKey="value"
              nameKey="name"
              colors={["#0e7490", "#0891b2"]}
              height={300}
            />
          </div>

          {/* Patient Table */}
          <div className="mb-6">
            <ReportTable
              title="Patient Records"
              data={patientData}
              columns={[
                { key: "id", header: "Patient ID" },
                {
                  key: "name",
                  header: "Patient Name",
                },
                { key: "gender", header: "Gender" },
                { key: "age", header: "Age" },
                { key: "contactNumber", header: "Contact" },
                { key: "lastVisit", header: "Last Visit" },
                { key: "totalVisits", header: "Total Visits" },
                { key: "department", header: "Department" },
                {
                  key: "status",
                  header: "Status",
                  cell: (row) => (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  ),
                },
              ]}
              badge={{ text: "Total: 544" }}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
