"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Edit, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import ScheduleEditModal from "./schedule-edit-modal"
import { getActiveDoctors, getAllDepartments } from "@/data/doctors"

interface Schedule {
  id: string
  doctorId: string
  date: Date
  startTime: string
  endTime: string
  maxPatients: number
  bookedPatients: number
  status: "available" | "full" | "leave" | "holiday"
  notes?: string
}

export default function DoctorSchedule() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [department, setDepartment] = useState<string>("")
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)
  const [doctors, setDoctors] = useState(getActiveDoctors())
  const [departments, setDepartments] = useState(getAllDepartments())

  // Load schedules from localStorage on component mount
  useEffect(() => {
    const savedSchedules = localStorage.getItem("doctorSchedules")
    if (savedSchedules) {
      // Convert string dates back to Date objects
      const parsedSchedules = JSON.parse(savedSchedules).map((schedule: any) => ({
        ...schedule,
        date: new Date(schedule.date),
      }))
      setSchedules(parsedSchedules)
    } else {
      // Generate dummy data if no schedules exist
      generateDummySchedules()
    }
  }, [])

  // Filter schedules when date or department changes
  useEffect(() => {
    filterSchedules()
  }, [date, department, schedules])

  // Filter schedules based on selected date and department
  const filterSchedules = () => {
    if (!date) return

    let filtered = [...schedules]

    // Filter by date
    filtered = filtered.filter((schedule) => schedule.date.toDateString() === date.toDateString())

    // Filter by department if selected
    if (department) {
      const doctorsInDepartment = doctors.filter((doc) => doc.department === department).map((doc) => doc.id)
      filtered = filtered.filter((schedule) => doctorsInDepartment.includes(schedule.doctorId))
    }

    setFilteredSchedules(filtered)
  }

  // Generate dummy schedules for demonstration
  const generateDummySchedules = () => {
    const activeDoctors = getActiveDoctors()
    const today = new Date()
    const dummySchedules: Schedule[] = []

    // Generate schedules for the next 7 days
    for (let i = 0; i < 7; i++) {
      const scheduleDate = new Date(today)
      scheduleDate.setDate(today.getDate() + i)

      // Create schedules for each doctor
      activeDoctors.forEach((doctor) => {
        // Skip weekends for some doctors
        if ((scheduleDate.getDay() === 0 || scheduleDate.getDay() === 6) && Math.random() > 0.5) {
          return
        }

        const schedule: Schedule = {
          id: `SCH-${doctor.id}-${format(scheduleDate, "yyyyMMdd")}`,
          doctorId: doctor.id,
          date: new Date(scheduleDate),
          startTime: "09:00",
          endTime: "17:00",
          maxPatients: 20,
          bookedPatients: Math.floor(Math.random() * 15),
          status: "available",
          notes: "",
        }

        // Some doctors have different timings
        if (doctor.id.includes("1003") || doctor.id.includes("1007")) {
          schedule.startTime = "10:00"
          schedule.endTime = "18:00"
        }

        // Some doctors have leave
        if (i === 3 && (doctor.id.includes("1002") || doctor.id.includes("1005"))) {
          schedule.status = "leave"
          schedule.notes = "Personal leave"
        }

        // Some schedules are full
        if (i === 1 && doctor.id.includes("1001")) {
          schedule.bookedPatients = schedule.maxPatients
          schedule.status = "full"
        }

        dummySchedules.push(schedule)
      })
    }

    setSchedules(dummySchedules)
    localStorage.setItem("doctorSchedules", JSON.stringify(dummySchedules))
  }

  const handleEditSchedule = (schedule: Schedule) => {
    setSelectedSchedule(schedule)
    setIsEditModalOpen(true)
  }

  const handleSaveSchedule = (updatedSchedule: Schedule) => {
    const updatedSchedules = schedules.map((schedule) =>
      schedule.id === updatedSchedule.id ? updatedSchedule : schedule,
    )

    setSchedules(updatedSchedules)
    localStorage.setItem("doctorSchedules", JSON.stringify(updatedSchedules))

    // Update filtered schedules
    filterSchedules()

    setIsEditModalOpen(false)
    setSelectedSchedule(null)

    toast({
      title: "Schedule Updated",
      description: `Schedule for ${getDoctorName(updatedSchedule.doctorId)} on ${format(updatedSchedule.date, "dd MMM yyyy")} has been updated.`,
    })
  }

  const getDoctorName = (doctorId: string) => {
    const doctor = doctors.find((doc) => doc.id === doctorId)
    return doctor ? doctor.name : "Unknown Doctor"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="space-y-2 w-full md:w-auto">
          <label className="text-sm font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2 w-full md:w-auto">
          <label className="text-sm font-medium">Department</label>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full md:w-[240px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="gap-2" onClick={filterSchedules}>
          <Filter className="h-4 w-4" />
          Apply Filters
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => {
                    const doctor = doctors.find((doc) => doc.id === schedule.doctorId)
                    return (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">{doctor ? doctor.name : "Unknown Doctor"}</TableCell>
                        <TableCell>{doctor?.department || "N/A"}</TableCell>
                        <TableCell>
                          {schedule.status !== "leave" && schedule.status !== "holiday"
                            ? `${schedule.startTime} - ${schedule.endTime}`
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {schedule.status !== "leave" && schedule.status !== "holiday"
                            ? `${schedule.bookedPatients}/${schedule.maxPatients}`
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium",
                              schedule.status === "available" && "bg-green-100 text-green-800",
                              schedule.status === "full" && "bg-amber-100 text-amber-800",
                              schedule.status === "leave" && "bg-red-100 text-red-800",
                              schedule.status === "holiday" && "bg-blue-100 text-blue-800",
                            )}
                          >
                            {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{schedule.notes || "—"}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEditSchedule(schedule)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No schedules found for the selected date and filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {isEditModalOpen && selectedSchedule && (
        <ScheduleEditModal
          schedule={selectedSchedule}
          onSave={handleSaveSchedule}
          onCancel={() => {
            setIsEditModalOpen(false)
            setSelectedSchedule(null)
          }}
        />
      )}
    </div>
  )
}
