import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ChevronRight,
  Clock,
  Phone,
  MapPin,
  Calendar,
  Users,
  Stethoscope,
  Building,
  CreditCard,
  Shield,
} from "lucide-react"
import PublicNavbar from "@/components/public-navbar"
import PublicFooter from "@/components/public-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-green-50 dark:from-gray-900 dark:to-gray-800 dark:text-white">
      {/* Header */}
      <PublicNavbar />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              <span className="text-[#c64b7a] dark:text-[#ff6b9a]">NEW BAWA LAL JI</span> <br />
              Hospital Management System
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Streamline your hospital operations with our comprehensive management system. Manage patients, doctors,
              staff, billing, and more from a single platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-started">
                <Button className="bg-gradient-to-r from-[#3a7561] to-[#c64b7a] dark:from-[#2a5541] dark:to-[#a62b5a] text-white px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all text-lg">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/request-demo">
                <Button
                  variant="outline"
                  className="border-[#c64b7a] text-[#c64b7a] dark:border-[#ff6b9a] dark:text-[#ff6b9a] px-8 py-6 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 text-lg"
                >
                  Request Demo
                  <Calendar className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full h-64 md:h-96 rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <Image src="/unnamed (1).jpg" alt="New Bawa Lal Ji Hospital" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Consultants Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#c64b7a] dark:text-[#ff6b9a] mb-4">Our Consultants</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Meet our team of experienced and dedicated healthcare professionals committed to providing you with the
              best medical care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Dr. Simran Kaur",
                role: "M. Director",
                image: "/placeholder.svg?height=150&width=150",
                color: "#c64b7a",
              },
              {
                name: "Dr. Krishan Chand",
                role: "M.S (Surgery), Retd. Civil Surgeon Gurdaspur",
                image: "/placeholder.svg?height=150&width=150",
                color: "#3a7561",
              },
              {
                name: "Dr. Gurpreet Josan",
                role: "MBBS (MD) Anaesthesia",
                image: "/placeholder.svg?height=150&width=150",
                color: "#c64b7a",
              },
              {
                name: "Dr. Jaspal Singh",
                role: "M.S (Surgery)",
                image: "/placeholder.svg?height=150&width=150",
                color: "#3a7561",
              },
              {
                name: "Dr. H.P. Singh",
                role: "M.S Orthopedic Surgeon",
                image: "/placeholder.svg?height=150&width=150",
                color: "#3a7561",
              },
              {
                name: "Dr. Nidhi Puri",
                role: "M.D (Pathology)",
                image: "/placeholder.svg?height=150&width=150",
                color: "#c64b7a",
              },
              {
                name: "Dr. Navjot Singh",
                role: "M.S (Surgery)",
                image: "/placeholder.svg?height=150&width=150",
                color: "#3a7561",
              },
            ].map((doctor, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-700">
                <div style={{ backgroundColor: doctor.color, height: "0.5rem" }}></div>
                <div className="p-6 text-center">
                  <div
                    className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4"
                    style={{ borderColor: doctor.color }}
                  >
                    <img
                      src={doctor.image || "/images/logo (2).jpeg"}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{doctor.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{doctor.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 px-4 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Comprehensive Features</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our hospital management system offers a wide range of features to streamline your operations and improve
              patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Patient Management",
                description: "Register, track, and manage patient records, medical history, and appointments.",
                icon: <Users className="h-10 w-10 text-[#c64b7a] dark:text-[#ff6b9a]" />,
              },
              {
                title: "Doctor Management",
                description: "Manage doctor profiles, schedules, and consultations efficiently.",
                icon: <Stethoscope className="h-10 w-10 text-[#3a7561] dark:text-[#4a9571]" />,
              },
              {
                title: "Staff & HR",
                description: "Handle staff records, attendance, shifts, and payroll in one place.",
                icon: <Building className="h-10 w-10 text-[#c64b7a] dark:text-[#ff6b9a]" />,
              },
              {
                title: "OPD Management",
                description: "Schedule appointments, manage queues, and handle consultations.",
                icon: <Calendar className="h-10 w-10 text-[#3a7561] dark:text-[#4a9571]" />,
              },
              {
                title: "Billing & Payments",
                description: "Generate invoices, process payments, and handle insurance claims.",
                icon: <CreditCard className="h-10 w-10 text-[#c64b7a] dark:text-[#ff6b9a]" />,
              },
              {
                title: "Reports & Analytics",
                description: "Get insights with comprehensive reports on finances, patients, and more.",
                icon: <Shield className="h-10 w-10 text-[#3a7561] dark:text-[#4a9571]" />,
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow dark:bg-gray-700">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                <Link href="/features">
                  <Button
                    variant="link"
                    className="text-[#c64b7a] dark:text-[#ff6b9a] p-0 hover:text-[#3a7561] dark:hover:text-[#4a9571]"
                  >
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-10 px-4 bg-gradient-to-r from-[#3a7561] to-[#c64b7a] dark:from-[#2a5541] dark:to-[#a62b5a] text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center">
              <Clock className="h-10 w-10 mr-4" />
              <div>
                <h3 className="font-bold text-xl">24/7 Support</h3>
                <p>Our team is available round the clock</p>
                <p>to assist with any issues</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-10 w-10 mr-4" />
              <div>
                <h3 className="font-bold text-xl">Contact Us</h3>
                <p>+91 99152-15406</p>
                <p>+91 98722-15406</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-10 w-10 mr-4" />
              <div>
                <h3 className="font-bold text-xl">Location</h3>
                <p>Khehra Road, Dhianpur</p>
                <p>Gurdaspur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#3a7561] to-[#c64b7a] dark:from-[#2a5541] dark:to-[#a62b5a] text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your healthcare operations?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare providers who have streamlined their operations with our system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started">
              <Button className="bg-white text-[#c64b7a] hover:bg-pink-100 dark:hover:bg-pink-100 px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all text-lg">
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-lg text-lg"
              >
                Contact Sales
                <Phone className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  )
}
