"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Menu, ArrowLeft, Save, X } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AddPatientPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Patient added successfully")
      setIsLoading(false)
      router.push("/admin/patients")
    }, 1500)
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
            <button onClick={toggleSidebar} className="lg:hidden text-gray-600">
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center">
              <Link href="/admin/patients">
                <Button variant="ghost" className="flex items-center gap-2 text-gray-600">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Patients
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => router.push("/admin/patients")}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
                disabled={isLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Saving..." : "Save Patient"}
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Add New Patient</h1>
            <p className="text-gray-600">Enter patient details to create a new record</p>
          </div>

          <Tabs defaultValue="personal" className="mb-6">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
              <TabsTrigger value="medical">Medical Information</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="personal">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input id="lastName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">
                          Date of Birth <span className="text-red-500">*</span>
                        </Label>
                        <Input id="dob" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">
                          Gender <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup defaultValue="male" className="flex space-x-4">
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
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <Select>
                          <SelectTrigger>
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
                        <Label htmlFor="maritalStatus">Marital Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select marital status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input id="occupation" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nationalId">National ID / SSN</Label>
                        <Input id="nationalId" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Contact Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input id="email" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input id="phone" type="tel" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alternatePhone">Alternate Phone</Label>
                        <Input id="alternatePhone" type="tel" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">
                          Address <span className="text-red-500">*</span>
                        </Label>
                        <Textarea id="address" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input id="city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">
                          State/Province <span className="text-red-500">*</span>
                        </Label>
                        <Input id="state" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">
                          Zip/Postal Code <span className="text-red-500">*</span>
                        </Label>
                        <Input id="zipCode" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">
                          Country <span className="text-red-500">*</span>
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            {/* Add more countries as needed */}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Medical Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="allergies">Known Allergies</Label>
                        <Textarea id="allergies" placeholder="List any known allergies or write 'None'" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="currentMedications">Current Medications</Label>
                        <Textarea id="currentMedications" placeholder="List any current medications or write 'None'" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="pastMedicalHistory">Past Medical History</Label>
                        <Textarea
                          id="pastMedicalHistory"
                          placeholder="Include surgeries, hospitalizations, chronic conditions, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input id="height" type="number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input id="weight" type="number" />
                      </div>
                      <div className="space-y-2">
                        <Label>Smoker</Label>
                        <RadioGroup defaultValue="no" className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="smoker-yes" />
                            <Label htmlFor="smoker-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="smoker-no" />
                            <Label htmlFor="smoker-no">No</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="former" id="smoker-former" />
                            <Label htmlFor="smoker-former">Former</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="familyHistory">Family Medical History</Label>
                        <Textarea id="familyHistory" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emergency">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyName">
                          Contact Name <span className="text-red-500">*</span>
                        </Label>
                        <Input id="emergencyName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyRelationship">
                          Relationship <span className="text-red-500">*</span>
                        </Label>
                        <Input id="emergencyRelationship" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input id="emergencyPhone" type="tel" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyAltPhone">Alternate Phone</Label>
                        <Input id="emergencyAltPhone" type="tel" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="emergencyAddress">Address</Label>
                        <Textarea id="emergencyAddress" />
                      </div>
                    </div>

                    <div className="mt-6 border-t pt-6">
                      <div className="space-y-2">
                        <Label htmlFor="additionalNotes">Additional Notes</Label>
                        <Textarea id="additionalNotes" placeholder="Any additional information about the patient" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6 flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => router.push("/admin/patients")}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Patient"}
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
