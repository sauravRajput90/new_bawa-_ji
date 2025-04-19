"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Printer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import Letterhead from "@/components/letterhead"

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

interface Doctor {
  id: string
  name: string
  department: string
  qualification: string
  designation: string
  specialization: string
  experience: number
  consultationFee: number
  availability: {
    days: string[]
    timeSlots: string[]
  }
}

interface OpdInvoiceGeneratorProps {
  registration: OpdRegistration
  doctor: Doctor
}

export default function OpdInvoiceGenerator({ registration, doctor }: OpdInvoiceGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

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

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    try {
      const invoiceElement = document.getElementById("opd-invoice")
      if (!invoiceElement) {
        toast({
          title: "Error",
          description: "Could not find invoice element",
          variant: "destructive",
        })
        return
      }

      // Create a clone of the invoice element to modify for PDF
      const clone = invoiceElement.cloneNode(true) as HTMLElement
      clone.style.padding = "20px"
      clone.style.backgroundColor = "white"
      clone.style.width = "800px"
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
      pdf.save(`OPD_Registration_${registration.tokenNumber}.pdf`)

      toast({
        title: "Success",
        description: "PDF downloaded successfully",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2 print:hidden">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handlePrint}
          disabled={isGenerating}
        >
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={handleDownloadPDF}
          disabled={isGenerating}
        >
          <Download className="h-4 w-4" />
          {isGenerating ? "Generating..." : "Download PDF"}
        </Button>
      </div>

      <Card className="p-6 shadow-md" id="opd-invoice">
        <div className="space-y-6">
          <Letterhead />

          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-center text-primary">OPD Registration</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Patient Details</h3>
              <div className="mt-2 space-y-1">
                <p>
                  <span className="text-gray-500">Name:</span> {registration.patientName}
                </p>
                <p>
                  <span className="text-gray-500">Age/Gender:</span> {registration.age} years,{" "}
                  {registration.gender.charAt(0).toUpperCase() + registration.gender.slice(1)}
                </p>
                <p>
                  <span className="text-gray-500">Contact:</span> {registration.contactNumber}
                </p>
                {registration.address && (
                  <p>
                    <span className="text-gray-500">Address:</span> {registration.address}
                  </p>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block border-2 border-primary px-4 py-2 rounded-md">
                <p className="font-bold text-lg text-primary">OPD #{registration.tokenNumber}</p>
              </div>
              <div className="mt-2 space-y-1">
                <p>
                  <span className="text-gray-500">Registration Date:</span> {formatDate(registration.registrationTime)}
                </p>
                <p>
                  <span className="text-gray-500">Registration Time:</span> {formatTime(registration.registrationTime)}
                </p>
                <p>
                  <span className="text-gray-500">Registration ID:</span>{" "}
                  {registration.id.substring(0, 8).toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-700">Appointment Details</h3>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p>
                  <span className="text-gray-500">Department:</span> {registration.department}
                </p>
                <p>
                  <span className="text-gray-500">Doctor:</span> {doctor?.name || "Not assigned"}
                </p>
                {doctor?.qualification && (
                  <p>
                    <span className="text-gray-500">Qualification:</span> {doctor.qualification}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <p>
                  <span className="text-gray-500">Appointment Date:</span> {formatDate(registration.appointmentDate)}
                </p>
                <p>
                  <span className="text-gray-500">Appointment Time:</span> {formatTime(registration.appointmentTime)}
                </p>
               
              </div>
            </div>
          </div>

          {registration.symptoms && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-700">Chief Complaints</h3>
              <p className="mt-2">{registration.symptoms}</p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
            
            <p>Valid for 7 days only.</p>
            <p>Please arrive 15 minutes before your scheduled appointment time.</p>
            <p>Note: Not for Medico Legal Purposes</p>
            <p>📍 Patient Safety & Quality of Care - NABH Entry Level Certified
            24/7 Emergency Services</p>
            
           
          </div>

          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <p>Generated on: {new Date().toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Authorized Signature</p>
              <div className="h-10"></div>
              <p className="text-sm text-gray-500">New Bawa lal Ji Hospital</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
