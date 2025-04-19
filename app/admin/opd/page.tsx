"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin-sidebar"
import { getDoctorById } from "@/data/doctors"
import { Download, FileDown, FilePlus, Printer, Search } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { useToast } from "@/components/ui/use-toast"

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

export default function OpdManagementPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [registrations, setRegistrations] = useState<OpdRegistration[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<OpdRegistration[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "waiting" | "in-progress" | "completed" | "cancelled">("all")
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    // Load registrations from localStorage
    const savedRegistrations = localStorage.getItem("opdRegistrations")
    if (savedRegistrations) {
      const parsedRegistrations = JSON.parse(savedRegistrations) as OpdRegistration[]
      // Sort by registration time (newest first)
      parsedRegistrations.sort(
        (a, b) => new Date(b.registrationTime).getTime() - new Date(a.registrationTime).getTime(),
      )
      setRegistrations(parsedRegistrations)
      setFilteredRegistrations(parsedRegistrations)
    }
  }, [])

  useEffect(() => {
    // Filter registrations based on search query and active tab
    let filtered = [...registrations]

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((reg) => reg.status === activeTab)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (reg) =>
          reg.patientName.toLowerCase().includes(query) ||
          reg.contactNumber.includes(query) ||
          reg.tokenNumber.toString().includes(query),
      )
    }

    setFilteredRegistrations(filtered)
  }, [searchQuery, activeTab, registrations])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    try {
      // Handle ISO string or time string
      if (timeString.includes("T")) {
        return new Date(timeString).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      } else {
        const [hours, minutes] = timeString.split(":")
        const date = new Date()
        date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
        return date.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      }
    } catch (e) {
      return timeString
    }
  }

  const handlePrintList = () => {
    window.print()
  }

  const handleDownloadReport = async () => {
    setIsGeneratingReport(true)
    try {
      const reportElement = document.getElementById("opd-report")
      if (!reportElement) {
        toast({
          title: "Error",
          description: "Could not find report element",
          variant: "destructive",
        })
        return
      }

      // Create a clone of the report element to modify for PDF
      const clone = reportElement.cloneNode(true) as HTMLElement

      // Add letterhead to the clone
      const letterheadDiv = document.createElement("div")
      letterheadDiv.innerHTML = `
        <div class="border-b-2 border-gray-200 pb-4 mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="relative h-16 w-16">
                <img src="/images/logo (2).jpeg" alt="Hospital Logo" width="64" height="64" class="object-contain" />
              </div>
              <div>
                <h1 class="text-2xl font-bold text-primary">Babalal Ji Hospital</h1>
                <p class="text-sm text-gray-500">Multi-Specialty Healthcare Center</p>
              </div>
            </div>
            <div class="text-right text-sm">
              <p>Khehra Road, Dhianpur (Gurdaspur)</p>
              <p>Phone: +91 98722-15406</p>
              <p>Email: info@babalalhospital.com</p>
            </div>
          </div>
        </div>
        <h2 class="text-xl font-bold text-center text-primary mb-4">OPD Registrations Report</h2>
      `

      clone.insertBefore(letterheadDiv, clone.firstChild)

      clone.style.padding = "20px"
      clone.style.backgroundColor = "white"
      clone.style.width = "800px"

      // Remove action buttons from the clone
      const actionButtons = clone.querySelectorAll(".action-buttons")
      actionButtons.forEach((button) => button.remove())

      document.body.appendChild(clone)

      const canvas = await html2canvas(clone, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      })

      document.body.removeChild(clone)

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`OPD_Registrations_Report_${new Date().toISOString().split("T")[0]}.pdf`)

      toast({
        title: "Success",
        description: "Report downloaded successfully",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReport(false)
    }
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
        <header className="bg-white shadow-sm z-10 print:hidden">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold text-gray-800">OPD Management</h1>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => router.push("/admin/opd/new")}
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <FilePlus className="h-4 w-4" />
                New Registration
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Search and filters */}
            <div className="flex flex-col sm:flex-row gap-4 print:hidden">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, phone or token..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("all")}
                  className={activeTab === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  All
                </Button>
                <Button
                  variant={activeTab === "waiting" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("waiting")}
                  className={activeTab === "waiting" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  Waiting
                </Button>
                <Button
                  variant={activeTab === "in-progress" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("in-progress")}
                  className={activeTab === "in-progress" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  In Progress
                </Button>
                <Button
                  variant={activeTab === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("completed")}
                  className={activeTab === "completed" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  Completed
                </Button>
              </div>
            </div>

            {/* Export buttons */}
            <div className="flex justify-end gap-2 print:hidden">
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handlePrintList}>
                <Printer className="h-4 w-4" />
                Print List
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleDownloadReport}
                disabled={isGeneratingReport}
              >
                <Download className="h-4 w-4" />
                {isGeneratingReport ? "Generating..." : "Download Report"}
              </Button>
            </div>

            {/* Registrations list */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>OPD Registrations</CardTitle>
                <CardDescription>
                  {filteredRegistrations.length} {filteredRegistrations.length === 1 ? "registration" : "registrations"}{" "}
                  found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto" id="opd-report">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Token</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Patient</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Doctor</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Date & Time</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-500 print:hidden">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.length > 0 ? (
                        filteredRegistrations.map((registration) => {
                          const doctor = getDoctorById(registration.doctorId)
                          return (
                            <tr key={registration.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">#{registration.tokenNumber}</td>
                              <td className="py-3 px-4">
                                <div>
                                  <p className="font-medium">{registration.patientName}</p>
                                  <p className="text-sm text-gray-500">
                                    {registration.age} yrs, {registration.gender.charAt(0).toUpperCase()}
                                    {registration.gender.slice(1)}
                                  </p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div>
                                  <p>{doctor?.name || "Unknown"}</p>
                                  <p className="text-sm text-gray-500">{registration.department}</p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div>
                                  <p>{formatDate(registration.appointmentDate)}</p>
                                  <p className="text-sm text-gray-500">{formatTime(registration.appointmentTime)}</p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <Badge className={getStatusColor(registration.status)}>
                                  {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-right print:hidden">
                                <div className="flex justify-end gap-2 action-buttons">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.push(`/admin/opd/view/${registration.id}`)}
                                  >
                                    View
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                    onClick={() => router.push(`/admin/opd/view/${registration.id}?tab=invoice`)}
                                  >
                                    <FileDown className="h-3 w-3" />
                                    Invoice
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-gray-500">
                            No registrations found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
