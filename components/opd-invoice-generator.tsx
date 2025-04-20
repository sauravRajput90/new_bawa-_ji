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

      const canvas = await html2canvas(invoiceElement, { scale: 2 })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgProps = pdf.getImageProperties(imgData)
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight)

      const marginBottom = 20
      pdf.setFontSize(10)
      pdf.setTextColor(80)

      const centerFooterText = [
        "Valid for 7 days only.",
        "Please arrive 15 minutes before your scheduled appointment time.",
        "Note: Not for Medico Legal Purposes",
      ]
      centerFooterText.forEach((line, i) => {
        pdf.text(line, pdfWidth / 2, pdfHeight - marginBottom + i * 4, { align: "center" })
      })

      pdf.text(`Generated on: ${new Date().toLocaleString()}`, 10, pdfHeight - marginBottom)
      pdf.setFont("helvetica", "bold")
      pdf.text("Authorized Signature", pdfWidth - 10, pdfHeight - marginBottom - 5, { align: "right" })
      pdf.setFont("helvetica", "normal")
      pdf.text("New Bawa Lal Ji Hospital", pdfWidth - 10, pdfHeight - marginBottom, { align: "right" })

      pdf.save(`OPD_Registration_${registration.tokenNumber}.pdf`)
    } catch (error) {
      console.error("PDF generation failed:", error)
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
            <div>
              <h3 className="font-semibold text-gray-700">Patient Details</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="text-gray-500">Name:</span> {registration.patientName}</p>
                <p><span className="text-gray-500">Age/Gender:</span> {registration.age} yrs, {registration.gender.charAt(0).toUpperCase() + registration.gender.slice(1)}</p>
                <p><span className="text-gray-500">Contact:</span> {registration.contactNumber}</p>
                {registration.address && (
                  <p><span className="text-gray-500">Address:</span> {registration.address}</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Registration Info</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="text-gray-500">OPD No:</span> <strong className="text-primary">#{registration.tokenNumber}</strong></p>
                <p><span className="text-gray-500">Reg Date:</span> {formatDate(registration.registrationTime)}</p>
                <p><span className="text-gray-500">Reg Time:</span> {formatTime(registration.registrationTime)}</p>
                <p><span className="text-gray-500">Reg ID:</span> {registration.id.substring(0, 8).toUpperCase()}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Appointment Details</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="text-gray-500">Date:</span> {formatDate(registration.appointmentDate)}</p>
                <p><span className="text-gray-500">Time:</span> {formatTime(registration.appointmentTime)}</p>
                <p><span className="text-gray-500">Department:</span> {registration.department}</p>
                <p><span className="text-gray-500">Doctor:</span> {doctor?.name || "Not assigned"}</p>
               {/* {doctor?.qualification && (
  <p><span className="text-gray-500">Qualification:</span> {doctor.qualification}</p>
)} */}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-center font-semibold text-gray-700 text-lg mb-4 mt-4">Prescription</h3>
              <div className="h-[500px] bg-white mx-auto w-full md:w-4/5"></div>
            </div>

            <div className="border-t border-gray-300 pt-4 flex justify-between items-start text-sm text-gray-600">
              <div className="text-center w-full">
                
              </div>
              <div className="text-right text-black">
               
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}