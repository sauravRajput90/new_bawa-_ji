"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OpdRegistrationModal } from "@/components/opd-registration-modal"
import { CalendarDays, Clock, Users, Plus } from "lucide-react"

export function OpdManagementCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (data: any) => {
    console.log("OPD Registration Data:", data)
    // Here you would typically send this data to your backend
  }

  return (
    <>
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center text-xl">
            <Users className="mr-2 h-5 w-5" />
            OPD Management
          </CardTitle>
          <CardDescription className="text-teal-100">Register and manage outpatient department visits</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-cyan-50 p-4 rounded-lg flex items-center">
              <div className="bg-cyan-100 p-3 rounded-full mr-3">
                <Users className="h-6 w-6 text-cyan-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Today's OPD</p>
                <p className="text-2xl font-bold text-gray-800">42</p>
              </div>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg flex items-center">
              <div className="bg-teal-100 p-3 rounded-full mr-3">
                <Clock className="h-6 w-6 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Token</p>
                <p className="text-2xl font-bold text-gray-800">#1024</p>
              </div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full mr-3">
                <CalendarDays className="h-6 w-6 text-emerald-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointments</p>
                <p className="text-2xl font-bold text-gray-800">18</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Quick Actions</h3>
              <p className="text-sm text-gray-500">Register new patients or manage appointments</p>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow hover:shadow-md"
            >
              <Plus className="mr-2 h-4 w-4" />
              New OPD Registration
            </Button>
          </div>
        </CardContent>
      </Card>

      <OpdRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
    </>
  )
}
