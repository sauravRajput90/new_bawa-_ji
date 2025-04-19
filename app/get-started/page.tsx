import Link from "next/link"
import PublicNavbar from "@/components/public-navbar"
import PublicFooter from "@/components/public-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, ChevronRight } from "lucide-react"

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50">
      <PublicNavbar />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Get Started with MediCare HMS</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Begin your journey to streamlined hospital management with our comprehensive system. Follow these simple
              steps to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "Step 1",
                title: "Create an Account",
                description:
                  "Register for an account to access our hospital management system. You'll need to provide basic information about your healthcare facility.",
              },
              {
                step: "Step 2",
                title: "Configure Your System",
                description:
                  "Set up your system with departments, staff roles, and other essential configurations tailored to your facility's needs.",
              },
              {
                step: "Step 3",
                title: "Start Managing",
                description:
                  "Begin using the system to manage patients, appointments, staff, billing, and more. Our support team is available to help you every step of the way.",
              },
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden border-t-4 border-cyan-500">
                <div className="absolute top-0 right-0 bg-cyan-500 text-white px-3 py-1 text-sm font-medium">
                  {item.step}
                </div>
                <CardContent className="pt-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Why Choose MediCare HMS?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mt-2">
                Our hospital management system offers numerous benefits to healthcare facilities of all sizes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Comprehensive Solution",
                  description: "All-in-one system for patient management, appointments, billing, inventory, and more.",
                },
                {
                  title: "User-Friendly Interface",
                  description: "Intuitive design that requires minimal training and enhances productivity.",
                },
                {
                  title: "Customizable",
                  description: "Tailor the system to your specific needs and workflows.",
                },
                {
                  title: "Secure & Compliant",
                  description: "Built with security in mind and compliant with healthcare regulations.",
                },
                {
                  title: "24/7 Support",
                  description: "Round-the-clock technical support to assist with any issues.",
                },
                {
                  title: "Regular Updates",
                  description: "Continuous improvements and new features based on user feedback.",
                },
                {
                  title: "Data Analytics",
                  description: "Powerful reporting tools to gain insights and make informed decisions.",
                },
                {
                  title: "Cost-Effective",
                  description: "Affordable pricing plans with excellent return on investment.",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-teal-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-800">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "What is a Hospital Management System?",
                  answer:
                    "A Hospital Management System (HMS) is a comprehensive software solution designed to manage all aspects of hospital operations, including patient management, appointment scheduling, billing, inventory, staff management, and more. It helps streamline workflows, improve efficiency, and enhance patient care.",
                },
                {
                  question: "How long does it take to implement the system?",
                  answer:
                    "Implementation time varies depending on the size of your facility and the complexity of your requirements. Typically, basic implementation can be completed in 2-4 weeks, while more comprehensive setups may take 1-3 months. Our team works closely with you to ensure a smooth and efficient implementation process.",
                },
                {
                  question: "Is training provided for staff?",
                  answer:
                    "Yes, we provide comprehensive training for all staff members who will be using the system. This includes both online and on-site training options, detailed documentation, video tutorials, and ongoing support to ensure your team can effectively use all features of the system.",
                },
                {
                  question: "Can the system be customized for our specific needs?",
                  answer:
                    "Our system is highly customizable to meet the unique requirements of your healthcare facility. We can tailor modules, workflows, reports, and interfaces to align with your specific processes and preferences.",
                },
                {
                  question: "Is the system secure and compliant with healthcare regulations?",
                  answer:
                    "Yes, security and compliance are top priorities. Our system is designed to meet healthcare industry standards and regulations, including HIPAA. We implement robust security measures such as encryption, access controls, audit trails, and regular security updates to protect sensitive patient data.",
                },
                {
                  question: "What kind of support do you offer?",
                  answer:
                    "We provide 24/7 technical support through multiple channels including phone, email, and chat. Our support team is highly trained and responsive, ensuring that any issues are resolved quickly. We also offer regular maintenance, updates, and a comprehensive knowledge base.",
                },
                {
                  question: "Can we migrate data from our existing systems?",
                  answer:
                    "Yes, we offer data migration services to help you transition from your existing systems to our HMS. Our team will work with you to ensure a smooth data transfer process, maintaining data integrity and minimizing disruption to your operations.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-gray-800">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="max-w-2xl mx-auto mb-6">
              Join thousands of healthcare facilities that have transformed their operations with MediCare HMS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button className="bg-white text-cyan-600 hover:bg-teal-100 px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all text-lg">
                  Register Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/request-demo">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-lg text-lg"
                >
                  Request a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
