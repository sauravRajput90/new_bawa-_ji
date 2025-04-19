"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface StaffModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (staffData: any) => void
  initialData?: any
}

export function StaffModal({ isOpen, onClose, onSubmit, initialData }: StaffModalProps) {
  const isEditing = !!initialData
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(
    initialData || {
      fullName: "",
      gender: "male",
      dob: "",
      email: "",
      phone: "",
      address: "",
      bloodGroup: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelation: "",
      profilePhoto: null,
      department: "",
      designation: "",
      employeeId: "",
      joiningDate: "",
      experience: "",
      qualification: "",
      reportingManager: "",
      shift: "morning",
      shiftTiming: { start: "09:00", end: "17:00" },
      weeklyOffs: {
        sunday: true,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
      },
      basicSalary: "",
      allowances: "",
      deductions: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRadioChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleCheckboxChange = (day: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      weeklyOffs: {
        ...prev.weeklyOffs,
        [day]: checked,
      },
    }))
  }

  const handleShiftTimingChange = (field: "start" | "end", value: string) => {
    setFormData((prev) => ({
      ...prev,
      shiftTiming: {
        ...prev.shiftTiming,
        [field]: value,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Calculate total salary
    const basicSalary = Number.parseFloat(formData.basicSalary) || 0
    const allowances = Number.parseFloat(formData.allowances) || 0
    const deductions = Number.parseFloat(formData.deductions) || 0
    const totalSalary = basicSalary + allowances - deductions

    // Simulate API call to save staff data
    setTimeout(() => {
      onSubmit({
        ...formData,
        totalSalary,
      })
      setIsLoading(false)
      onClose()

      // Reset form data if not editing
      if (!isEditing) {
        setFormData({
          fullName: "",
          gender: "male",
          dob: "",
          email: "",
          phone: "",
          address: "",
          bloodGroup: "",
          emergencyContactName: "",
          emergencyContactPhone: "",
          emergencyContactRelation: "",
          profilePhoto: null,
          department: "",
          designation: "",
          employeeId: "",
          joiningDate: "",
          experience: "",
          qualification: "",
          reportingManager: "",
          shift: "morning",
          shiftTiming: { start: "09:00", end: "17:00" },
          weeklyOffs: {
            sunday: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
          },
          basicSalary: "",
          allowances: "",
          deductions: "",
          bankName: "",
          accountNumber: "",
          ifscCode: "",
        })
        setActiveTab("personal")
      }
    }, 1500)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const moveToNextTab = () => {
    if (activeTab === "personal") setActiveTab("job")
    else if (activeTab === "job") setActiveTab("shift")
    else if (activeTab === "shift") setActiveTab("salary")
  }

  const moveToPreviousTab = () => {
    if (activeTab === "salary") setActiveTab("shift")
    else if (activeTab === "shift") setActiveTab("job")
    else if (activeTab === "job") setActiveTab("personal")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {isEditing ? "Edit Staff Member" : "Add New Staff Member"}
          </DialogTitle>
          <DialogDescription>
            Enter staff details to {isEditing ? "update" : "create"} a record. All fields marked with{" "}
            <span className="text-red-500">*</span> are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="job">Job Details</TabsTrigger>
              <TabsTrigger value="shift">Shift Management</TabsTrigger>
              <TabsTrigger value="salary">Salary & Bank Details</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="profilePhoto">Profile Photo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border">
                      {formData.profilePhoto ? (
                        <img
                          src={formData.profilePhoto || "/images/logo (2).jpeg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <Button type="button" variant="outline">
                      Upload Photo
                    </Button>
                    <p className="text-sm text-gray-500">Recommended: 300x300px, Max 2MB</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => handleRadioChange("gender", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input id="dob" type="date" value={formData.dob} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(value) => handleSelectChange("bloodGroup", value)}
                  >
                    <SelectTrigger id="bloodGroup">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a+">A+</SelectItem>
                      <SelectItem value="a-">A-</SelectItem>
                      <SelectItem value="b+">B+</SelectItem>
                      <SelectItem value="b-">B-</SelectItem>
                      <SelectItem value="ab+">AB+</SelectItem>
                      <SelectItem value="ab-">AB-</SelectItem>
                      <SelectItem value="o+">O+</SelectItem>
                      <SelectItem value="o-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="staff@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Full residential address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyContactPhone"
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    placeholder="+1 (555) 987-6543"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactRelation">Relationship</Label>
                  <Input
                    id="emergencyContactRelation"
                    value={formData.emergencyContactRelation}
                    onChange={handleChange}
                    placeholder="Spouse, Parent, Sibling, etc."
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="button" onClick={moveToNextTab}>
                  Next: Job Details
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="job">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange("department", value)}
                    required
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nursing">Nursing</SelectItem>
                      <SelectItem value="reception">Reception</SelectItem>
                      <SelectItem value="laboratory">Laboratory</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="admin">Administration</SelectItem>
                      <SelectItem value="accounts">Accounts</SelectItem>
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="it">IT & Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation">
                    Designation <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    placeholder="Head Nurse, Junior Staff, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeId">
                    Employee ID / Staff Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                    placeholder="EMP-1001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="joiningDate">
                    Joining Date <span className="text-red-500">*</span>
                  </Label>
                  <Input id="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="BSc Nursing, MBA, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportingManager">
                    Reporting Manager <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.reportingManager}
                    onValueChange={(value) => handleSelectChange("reportingManager", value)}
                    required
                  >
                    <SelectTrigger id="reportingManager">
                      <SelectValue placeholder="Select reporting manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john-doe">John Doe (Admin)</SelectItem>
                      <SelectItem value="jane-smith">Jane Smith (Head Nurse)</SelectItem>
                      <SelectItem value="robert-johnson">Robert Johnson (Lab Manager)</SelectItem>
                      <SelectItem value="emily-williams">Emily Williams (Pharmacy Head)</SelectItem>
                      <SelectItem value="michael-brown">Michael Brown (HR Manager)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                  Back: Personal Information
                </Button>
                <Button type="button" onClick={moveToNextTab}>
                  Next: Shift Management
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="shift">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="shift">
                    Shift Assignment <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.shift} onValueChange={(value) => handleSelectChange("shift", value)} required>
                    <SelectTrigger id="shift">
                      <SelectValue placeholder="Select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning Shift</SelectItem>
                      <SelectItem value="evening">Evening Shift</SelectItem>
                      <SelectItem value="night">Night Shift</SelectItem>
                      <SelectItem value="rotating">Rotating Shift</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Shift Timing <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="shift-start">Start Time</Label>
                      <Input
                        id="shift-start"
                        type="time"
                        value={formData.shiftTiming.start}
                        onChange={(e) => handleShiftTimingChange("start", e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="shift-end">End Time</Label>
                      <Input
                        id="shift-end"
                        type="time"
                        value={formData.shiftTiming.end}
                        onChange={(e) => handleShiftTimingChange("end", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Weekly Off Days <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries({
                      sunday: "Sunday",
                      monday: "Monday",
                      tuesday: "Tuesday",
                      wednesday: "Wednesday",
                      thursday: "Thursday",
                      friday: "Friday",
                      saturday: "Saturday",
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={formData.weeklyOffs[key as keyof typeof formData.weeklyOffs]}
                          onCheckedChange={(checked) => handleCheckboxChange(key, checked as boolean)}
                        />
                        <Label htmlFor={key} className="font-normal">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Select days when the staff member is off duty</p>
                </div>

                {formData.shift === "rotating" && (
                  <div className="space-y-2">
                    <Label htmlFor="rotationPattern">Rotation Pattern</Label>
                    <Select
                      value={formData.rotationPattern || "weekly"}
                      onValueChange={(value) => handleSelectChange("rotationPattern", value)}
                    >
                      <SelectTrigger id="rotationPattern">
                        <SelectValue placeholder="Select rotation pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly Rotation</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly Rotation</SelectItem>
                        <SelectItem value="monthly">Monthly Rotation</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">How often the shift changes for this staff member</p>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                  Back: Job Details
                </Button>
                <Button type="button" onClick={moveToNextTab}>
                  Next: Salary & Bank Details
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="salary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basicSalary">
                    Basic Salary (USD) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="basicSalary"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.basicSalary}
                    onChange={handleChange}
                    required
                    placeholder="3000.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowances">Allowances (USD)</Label>
                  <Input
                    id="allowances"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.allowances}
                    onChange={handleChange}
                    placeholder="500.00"
                  />
                  <p className="text-xs text-gray-500">Housing, transport, medical, etc.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deductions">Deductions (USD)</Label>
                  <Input
                    id="deductions"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.deductions}
                    onChange={handleChange}
                    placeholder="200.00"
                  />
                  <p className="text-xs text-gray-500">Tax, insurance, etc.</p>
                </div>

                <div className="space-y-2">
                  <Label>Total Salary (USD)</Label>
                  <div className="h-10 px-3 py-2 rounded-md border border-input bg-gray-100 text-sm">
                    {(() => {
                      const basicSalary = Number.parseFloat(formData.basicSalary) || 0
                      const allowances = Number.parseFloat(formData.allowances) || 0
                      const deductions = Number.parseFloat(formData.deductions) || 0
                      return (basicSalary + allowances - deductions).toFixed(2)
                    })()}
                  </div>
                  <p className="text-xs text-gray-500">Basic + Allowances - Deductions</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankName">
                    Bank Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    required
                    placeholder="Bank of America"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">
                    Account Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required
                    placeholder="123456789012"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ifscCode">
                    IFSC/Routing Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    required
                    placeholder="ABCD0123456"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                  Back: Shift Management
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
                >
                  {isLoading
                    ? isEditing
                      ? "Updating Staff..."
                      : "Adding Staff..."
                    : isEditing
                      ? "Update Staff"
                      : "Add Staff"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
