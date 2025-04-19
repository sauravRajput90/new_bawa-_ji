"use client"

import type React from "react"

import { useState } from "react"
import PublicNavbar from "@/components/public-navbar"
import PublicFooter from "@/components/public-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2 } from "lucide-react"

export default function RequestDemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    employees: "",
    message: "",
  })
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Demo request submitted:", { ...formData, preferredDate: date })
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50">
      <PublicNavbar />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Request a Demo</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how MediCare HMS can transform your healthcare facility. Fill out the form below to schedule a
              personalized demo with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6">
                <h2 className="text-2xl font-bold mb-2">Experience MediCare HMS in Action</h2>
                <p>
                  Our personalized demos are tailored to your specific needs and showcase the features most relevant to
                  your facility.
                </p>
              </div>
              <CardContent className="pt-6">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      Your demo request has been successfully submitted. One of our representatives will contact you
                      shortly to confirm your demo appointment.
                    </p>
                    <p className="text-gray-600">
                      If you have any questions in the meantime, please contact us at{" "}
                      <a href="mailto:demos@medicarehms.com" className="text-cyan-600 hover:underline">
                        demos@medicarehms.com
                      </a>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name*
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address*
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number*
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                          Organization Name*
                        </label>
                        <Input
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          required
                          placeholder="City General Hospital"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Role*
                        </label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) => handleSelectChange("role", value)}
                          required
                        >
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administrator">Hospital Administrator</SelectItem>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="it">IT Manager</SelectItem>
                            <SelectItem value="operations">Operations Manager</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Employees
                        </label>
                        <Select
                          value={formData.employees}
                          onValueChange={(value) => handleSelectChange("employees", value)}
                        >
                          <SelectTrigger id="employees">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10</SelectItem>
                            <SelectItem value="11-50">11-50</SelectItem>
                            <SelectItem value="51-200">51-200</SelectItem>
                            <SelectItem value="201-500">201-500</SelectItem>
                            <SelectItem value="500+">500+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Demo Date*
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Select a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => {
                              // Disable past dates and weekends
                              const today = new Date()
                              today.setHours(0, 0, 0, 0)
                              const day = date.getDay()
                              return date < today || day === 0 || day === 6
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Information
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your specific needs or questions..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-6"
                      disabled={isSubmitting || !date}
                    >
                      {isSubmitting ? "Submitting..." : "Request Demo"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">What to Expect in Your Demo</h3>
                  <ul className="space-y-3">
                    {[
                      "A personalized walkthrough of MediCare HMS tailored to your facility's needs",
                      "Demonstration of key features and modules relevant to your operations",
                      "Q&A session with our product specialists",
                      "Discussion of implementation process and timeline",
                      "Overview of pricing and package options",
                      "Post-demo resources and next steps",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Demo FAQs</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800">How long is the demo?</h4>
                      <p className="text-gray-600 text-sm">
                        Our standard demo session lasts approximately 45-60 minutes, including time for questions.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Who should attend the demo?</h4>
                      <p className="text-gray-600 text-sm">
                        We recommend including key decision-makers and stakeholders who will be using or overseeing the
                        system, such as administrators, IT managers, and department heads.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Is there a cost for the demo?</h4>
                      <p className="text-gray-600 text-sm">
                        No, our demos are completely free of charge and come with no obligation.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Can we request a follow-up demo?</h4>
                      <p className="text-gray-600 text-sm">
                        If you need a more in-depth look at specific features or want to include additional team
                        members, we're happy to schedule follow-up sessions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Need Immediate Assistance?</h3>
                <p className="mb-4">
                  Our team is available to answer your questions and provide more information about our system.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Email:</span>
                    <a href="mailto:demos@medicarehms.com" className="text-white hover:underline">
                      demos@medicarehms.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Phone:</span>
                    <a href="tel:+15551234567" className="text-white hover:underline">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
