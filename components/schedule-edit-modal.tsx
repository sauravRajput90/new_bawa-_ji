"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { getDoctorById, formatDoctorInfo } from "@/data/doctors"

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

interface ScheduleEditModalProps {
  schedule: Schedule
  onSave: (schedule: Schedule) => void
  onCancel: () => void
}

export default function ScheduleEditModal({ schedule, onSave, onCancel }: ScheduleEditModalProps) {
  const [editedSchedule, setEditedSchedule] = useState<Schedule>({
    ...schedule,
    date: new Date(schedule.date),
  })

  const doctor = getDoctorById(schedule.doctorId)

  const handleChange = (field: keyof Schedule, value: any) => {
    setEditedSchedule((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-update status if patients are at max capacity
    if (field === "bookedPatients" || field === "maxPatients") {
      const booked = field === "bookedPatients" ? value : editedSchedule.bookedPatients
      const max = field === "maxPatients" ? value : editedSchedule.maxPatients

      if (editedSchedule.status !== "leave" && editedSchedule.status !== "holiday") {
        if (Number.parseInt(booked) >= Number.parseInt(max)) {
          setEditedSchedule((prev) => ({
            ...prev,
            status: "full",
          }))
        } else {
          setEditedSchedule((prev) => ({
            ...prev,
            status: "available",
          }))
        }
      }
    }

    // If status is changed to leave or holiday, reset patient counts
    if (field === "status" && (value === "leave" || value === "holiday")) {
      setEditedSchedule((prev) => ({
        ...prev,
        bookedPatients: 0,
      }))
    }
  }

  const handleSave = () => {
    onSave(editedSchedule)
  }

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Schedule</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Doctor</Label>
            <div className="p-2 border rounded-md bg-muted/50">
              {doctor ? formatDoctorInfo(doctor) : "Unknown Doctor"}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <div className="p-2 border rounded-md bg-muted/50">{format(editedSchedule.date, "PPP")}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={editedSchedule.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
                disabled={editedSchedule.status === "leave" || editedSchedule.status === "holiday"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={editedSchedule.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
                disabled={editedSchedule.status === "leave" || editedSchedule.status === "holiday"}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxPatients">Max Patients</Label>
              <Input
                id="maxPatients"
                type="number"
                min="0"
                value={editedSchedule.maxPatients}
                onChange={(e) => handleChange("maxPatients", Number.parseInt(e.target.value))}
                disabled={editedSchedule.status === "leave" || editedSchedule.status === "holiday"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookedPatients">Booked Patients</Label>
              <Input
                id="bookedPatients"
                type="number"
                min="0"
                max={editedSchedule.maxPatients}
                value={editedSchedule.bookedPatients}
                onChange={(e) => handleChange("bookedPatients", Number.parseInt(e.target.value))}
                disabled={editedSchedule.status === "leave" || editedSchedule.status === "holiday"}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={editedSchedule.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="leave">Leave</SelectItem>
                <SelectItem value="holiday">Holiday</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={editedSchedule.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Add any notes or special instructions"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
