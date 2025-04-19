"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Moon, Sun, Lock, Upload } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [theme, setTheme] = useState("light")
  const [language, setLanguage] = useState("english")

  // User profile state
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [phone, setPhone] = useState("+91 9876543210")
  const [dob, setDob] = useState("1985-05-15")
  const [gender, setGender] = useState("male")
  const [emergencyContact, setEmergencyContact] = useState("Jane Doe - +91 9876543211")

  // Notification settings
  const [appointmentNotifications, setAppointmentNotifications] = useState(true)
  const [reportNotifications, setReportNotifications] = useState(true)
  const [medicationNotifications, setMedicationNotifications] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-800/50 z-10 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <PatientSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="lg:hidden text-gray-600">
              <User className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Settings</h1>
            <div></div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center gap-6 pb-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">{name}</h3>
                      <p className="text-sm text-gray-500">Patient ID: PAT-20250415</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        <Upload className="h-4 w-4 mr-2" /> Change Photo
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency">Emergency Contact</Label>
                      <Input
                        id="emergency"
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        placeholder="Name - Phone Number"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how the app looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Theme</Label>
                        <p className="text-sm text-gray-500">Select light or dark theme</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={theme === "light" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTheme("light")}
                          className={theme === "light" ? "bg-cyan-600" : ""}
                        >
                          <Sun className="h-4 w-4 mr-2" /> Light
                        </Button>
                        <Button
                          variant={theme === "dark" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTheme("dark")}
                          className={theme === "dark" ? "bg-cyan-600" : ""}
                        >
                          <Moon className="h-4 w-4 mr-2" /> Dark
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label className="text-base">Language</Label>
                      <p className="text-sm text-gray-500">Select your preferred language</p>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-full md:w-[200px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="gujarati">Gujarati</SelectItem>
                          <SelectItem value="marathi">Marathi</SelectItem>
                          <SelectItem value="tamil">Tamil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Appointment Reminders</Label>
                          <p className="text-sm text-gray-500">Get notified about upcoming appointments</p>
                        </div>
                        <Switch checked={appointmentNotifications} onCheckedChange={setAppointmentNotifications} />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Medical Reports</Label>
                          <p className="text-sm text-gray-500">Get notified when new reports are available</p>
                        </div>
                        <Switch checked={reportNotifications} onCheckedChange={setReportNotifications} />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Medication Reminders</Label>
                          <p className="text-sm text-gray-500">Get reminders to take your medication</p>
                        </div>
                        <Switch checked={medicationNotifications} onCheckedChange={setMedicationNotifications} />
                      </div>
                    </div>

                    <h3 className="text-lg font-medium pt-4">Notification Channels</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                        </div>
                        <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
                        <Lock className="h-4 w-4 mr-2" /> Update Password
                      </Button>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Account Actions</h3>
                      <div className="space-y-4">
                        <Button variant="outline" className="text-amber-600 border-amber-600 w-full sm:w-auto">
                          Download My Data
                        </Button>
                        <Button variant="outline" className="text-red-600 border-red-600 w-full sm:w-auto">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
