import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"

export function UpcomingAppointments() {
  const appointments = [
    {
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "April 15, 2025",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "April 22, 2025",
      time: "2:30 PM",
      status: "Pending",
    },
  ]

  return (
    <div className="space-y-4">
      {appointments.map((appointment, index) => (
        <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center mb-3 md:mb-0">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 mr-4">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">{appointment.doctor}</h3>
              <p className="text-sm text-gray-500">{appointment.specialty}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm">{appointment.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm">{appointment.time}</span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                appointment.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {appointment.status}
            </div>
          </div>
        </div>
      ))}
      <div className="mt-4 text-center">
        <Button variant="outline" className="text-cyan-600 border-cyan-600 hover:bg-cyan-50">
          View All Appointments
        </Button>
      </div>
    </div>
  )
}
