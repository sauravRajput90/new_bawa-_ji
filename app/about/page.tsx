import PublicNavbar from "@/components/public-navbar"
import PublicFooter from "@/components/public-footer"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50">
      <PublicNavbar />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About MediCare HMS</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're on a mission to transform healthcare management with innovative technology solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                MediCare HMS was founded in 2015 by a team of healthcare professionals and technology experts who
                recognized the need for a comprehensive, user-friendly hospital management system that could address the
                unique challenges faced by healthcare providers.
              </p>
              <p className="text-gray-600 mb-4">
                What began as a solution for a single hospital has grown into a robust platform serving hundreds of
                healthcare facilities across the country. Our team has expanded, but our mission remains the same: to
                empower healthcare providers with technology that enhances patient care and operational efficiency.
              </p>
              <p className="text-gray-600">
                Today, MediCare HMS is recognized as a leader in healthcare management solutions, continuously
                innovating to meet the evolving needs of the healthcare industry.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/2025-02-10.jpg"
                alt="MediCare HMS Team"
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Our Mission & Vision</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-teal-500">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
                  <p className="text-gray-600">
                    To empower healthcare providers with innovative technology solutions that streamline operations,
                    enhance patient care, and improve overall healthcare delivery. We are committed to developing
                    user-friendly, secure, and efficient systems that address the unique challenges of the healthcare
                    industry.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-cyan-500">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
                  <p className="text-gray-600">
                    To be the global leader in healthcare management technology, setting the standard for innovation,
                    reliability, and excellence. We envision a future where healthcare providers worldwide leverage our
                    solutions to deliver exceptional patient care, achieve operational excellence, and drive positive
                    health outcomes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Innovation",
                  description:
                    "We continuously seek new and better ways to solve healthcare management challenges, embracing emerging technologies and creative thinking.",
                },
                {
                  title: "Excellence",
                  description:
                    "We are committed to delivering the highest quality solutions and services, exceeding expectations and setting new standards in the industry.",
                },
                {
                  title: "Integrity",
                  description:
                    "We operate with honesty, transparency, and ethical conduct in all our interactions, building trust with our clients and partners.",
                },
                {
                  title: "Collaboration",
                  description:
                    "We believe in the power of teamwork and partnership, working closely with our clients to understand their needs and develop tailored solutions.",
                },
                {
                  title: "Empathy",
                  description:
                    "We understand the challenges faced by healthcare providers and patients, and design our solutions with their needs and experiences in mind.",
                },
                {
                  title: "Reliability",
                  description:
                    "We build dependable systems and provide consistent support, ensuring our clients can rely on our solutions for their critical operations.",
                },
              ].map((value, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-teal-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Join Our Journey</h2>
              <p className="max-w-2xl mx-auto mt-2">
                We're constantly evolving and improving our solutions to meet the changing needs of healthcare
                providers. Partner with us to be part of this exciting journey.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div>Healthcare Facilities</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div>Healthcare Professionals</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">2M+</div>
                <div>Patients Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div>Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
