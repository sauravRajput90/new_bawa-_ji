"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useReactToPrint } from "react-to-print"
import { format } from "date-fns"
import Letterhead from "./letterhead"
import { getDoctorById } from "@/data/doctors"

interface OpdRegistrationSlipProps {
  patientName: string
  patientId?: string
  age: string
  gender: string
  contactNumber: string
  department: string
  doctorId: string
  appointmentDate: string
  appointmentTime: string
  tokenNumber: number
  registrationTime: string
}

export default function OpdRegistrationSlip({
  patientName,
  patientId,
  age,
  gender,
  contactNumber,
  department,
  doctorId,
  appointmentDate,
  appointmentTime,
  tokenNumber,
  registrationTime,
}: OpdRegistrationSlipProps) {
  const [isPrinting, setIsPrinting] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const doctor = getDoctorById(doctorId)

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforeprint: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
    documentTitle: `OPD_Slip_${patientName}_${tokenNumber}`,
  })

  const formattedDate = appointmentDate ? format(new Date(appointmentDate), "dd MMM yyyy") : "N/A"

  const formattedRegistrationTime = registrationTime
    ? format(new Date(registrationTime), "dd MMM yyyy, hh:mm a")
    : format(new Date(), "dd MMM yyyy, hh:mm a")

  return (
    <>
      <div className={isPrinting ? "block" : "hidden"}>
        <div ref={printRef} className="p-6 max-w-[800px] mx-auto">
          <Letterhead />

          <div className="text-center my-6">
            <h2 className="text-xl font-bold border-b-2 border-t-2 border-gray-300 py-2 inline-block px-8">
              OPD REGISTRATION SLIP
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Registration Date & Time:</p>
              <p className="font-medium">{formattedRegistrationTime}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Token Number:</p>
              <p className="font-bold text-xl">{tokenNumber}</p>
            </div>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Patient Name:</p>
                <p className="font-semibold">{patientName}</p>
              </div>
              {patientId && (
                <div>
                  <p className="text-sm text-gray-500">Patient ID:</p>
                  <p className="font-semibold">{patientId}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Age / Gender:</p>
                <p>
                  {age} years / {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Number:</p>
                <p>{contactNumber}</p>
              </div>
            </div>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Department:</p>
                <p className="font-semibold">{department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Consulting Doctor:</p>
                <p className="font-semibold">{doctor ? doctor.name : "Unknown Doctor"}</p>
                {doctor && (
                  <p className="text-xs text-gray-500">
                    {doctor.qualification} - {doctor.designation}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointment Date:</p>
                <p>{formattedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointment Time:</p>
                <p>{appointmentTime}</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500 mt-8">
            <p className="mb-1">Important Instructions:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Please arrive 15 minutes before your appointment time.</li>
              <li>Bring all previous medical records and test reports.</li>
              <li>This slip must be presented at the reception counter.</li>
              <li>Rescheduling requires 24 hours advance notice.</li>
            </ol>
          </div>

          <div className="mt-8 text-center text-xs text-gray-400">
            <p>This is a computer-generated slip and does not require a signature.</p>
          </div>
        </div>
      </div>

      <Card className="mt-4">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">OPD Registration Slip</h3>
            <Button onClick={handlePrint} className="gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-printer"
              >
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect width="12" height="8" x="6" y="14"></rect>
              </svg>
              Print Slip
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Patient:</p>
                <p className="font-semibold">{patientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Token Number:</p>
                <p className="font-bold">{tokenNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Doctor:</p>
                <p>{doctor ? doctor.name : "Unknown Doctor"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department:</p>
                <p>{department}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date:</p>
                <p>{formattedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time:</p>
                <p>{appointmentTime}</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">Click the Print button to print the full registration slip.</p>
        </CardContent>
      </Card>
    </>
  )
}
