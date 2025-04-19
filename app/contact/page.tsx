"use client"

import type React from "react"

import { useState } from "react"
import PublicNavbar from "@/components/public-navbar"
import PublicFooter from "@/components/public-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50">
      <PublicNavbar />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our hospital management system? We're here to help. Reach out to our team for
              support, demos, or more information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Phone</h3>
                  <p className="text-gray-600 mb-1">+91 98722-15406</p>
                  <p className="text-gray-600">+91 99152-15406</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600 mb-1">info@bawalalhospital.com</p>
                  <p className="text-gray-600"></p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Location</h3>
                  <p className="text-gray-600 mb-1">ਨਿਊ ਬਾਵਾ ਲਾਲ ਜੀ ਹਸਪਤਾਲ</p>
                  <p className="text-gray-600"> Khehra Road, Dhianpur (Gurdaspur)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                  {isSubmitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4">
                      <p className="font-medium">Thank you for contacting us!</p>
                      <p>We've received your message and will get back to you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
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
                            Email Address
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
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            Subject
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="How can we help you?"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Please provide details about your inquiry..."
                          rows={5}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Business Hours</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monday - Friday:</span>
                          <span className="font-medium">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Saturday:</span>
                          <span className="font-medium">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sunday:</span>
                          <span className="font-medium">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-white rounded-lg shadow-md overflow-hidden h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596552044!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1617715725456!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Office Location"
                ></iframe>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-800">How can I request a demo?</h4>
                      <p className="text-gray-600 text-sm">
                        You can request a demo by filling out the form on our Request Demo page or by contacting us
                        directly.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Do you offer technical support?</h4>
                      <p className="text-gray-600 text-sm">
                        Yes, we provide 24/7 technical support for all our clients through phone, email, and chat.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Is training provided with the system?</h4>
                      <p className="text-gray-600 text-sm">
                        Yes, comprehensive training is included with all our packages to ensure your team can
                        effectively use the system.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
