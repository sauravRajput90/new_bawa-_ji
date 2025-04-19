import PublicNavbar from "@/components/public-navbar"
import PublicFooter from "@/components/public-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Stethoscope, Calendar, CreditCard, Building, ShoppingBag, BarChart3 } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50">
      <PublicNavbar />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Features</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the comprehensive features of our hospital management system designed to streamline operations and
              improve patient care.
            </p>
          </div>

          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-8">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
              <TabsTrigger value="opd">OPD</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="staff">Staff & HR</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="patient" id="patient">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Users className="h-10 w-10 text-cyan-600" />
                    <div>
                      <CardTitle>Patient Management</CardTitle>
                      <CardDescription>Comprehensive patient information management system</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Complete patient registration with demographic details</li>
                        <li>Medical history tracking and documentation</li>
                        <li>Appointment scheduling and management</li>
                        <li>Patient visit history and treatment plans</li>
                        <li>Document upload for test reports and prescriptions</li>
                        <li>Patient portal for self-service</li>
                        <li>Insurance and billing information management</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Streamlined patient registration process</li>
                        <li>Quick access to complete patient history</li>
                        <li>Reduced paperwork and administrative burden</li>
                        <li>Improved patient experience and satisfaction</li>
                        <li>Better coordination between departments</li>
                        <li>Enhanced data security and privacy compliance</li>
                        <li>Efficient appointment management</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doctor" id="doctor">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Stethoscope className="h-10 w-10 text-cyan-600" />
                    <div>
                      <CardTitle>Doctor Management</CardTitle>
                      <CardDescription>Efficient doctor scheduling and practice management</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Doctor profile management with specializations</li>
                        <li>Schedule management and availability tracking</li>
                        <li>Patient appointment calendar</li>
                        <li>Consultation notes and prescription management</li>
                        <li>Performance analytics and patient feedback</li>
                        <li>Leave management and substitution</li>
                        <li>Online and offline consultation tracking</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Optimized doctor scheduling and resource allocation</li>
                        <li>Reduced appointment conflicts and no-shows</li>
                        <li>Improved doctor productivity and satisfaction</li>
                        <li>Better patient-doctor matching based on specialization</li>
                        <li>Enhanced communication between doctors and departments</li>
                        <li>Streamlined consultation workflow</li>
                        <li>Data-driven insights for practice improvement</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opd" id="opd">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Calendar className="h-10 w-10 text-cyan-600" />
                    <div>
                      <CardTitle>OPD Management</CardTitle>
                      <CardDescription>Outpatient department operations and queue management</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Patient registration and token generation</li>
                        <li>Queue management and display system</li>
                        <li>Department and doctor selection</li>
                        <li>Appointment scheduling and rescheduling</li>
                        <li>Consultation tracking and history</li>
                        <li>Billing integration for OPD services</li>
                        <li>Follow-up appointment management</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Reduced waiting times and improved patient flow</li>
                        <li>Better resource utilization and planning</li>
                        <li>Enhanced patient experience with transparent queuing</li>
                        <li>Streamlined registration and consultation process</li>
                        <li>Improved staff productivity and efficiency</li>
                        <li>Real-time monitoring of OPD operations</li>
                        <li>Data-driven insights for service improvement</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" id="billing">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-10 w-10 text-cyan-600" />
                    <div>
                      <CardTitle>Billing & Payments</CardTitle>
                      <CardDescription>Comprehensive financial management and billing system</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Service-based billing with customizable price lists</li>
                        <li>Insurance claim processing and management</li>
                        <li>Multiple payment method support</li>
                        <li>Invoice generation and receipt printing</li>
                        <li>Patient billing history and statement generation</li>
                        <li>Tax calculation and reporting</li>
                        <li>Financial reporting and analytics</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Streamlined billing process with reduced errors</li>
                        <li>Improved cash flow management</li>
                        <li>Enhanced transparency in patient billing</li>
                        <li>Faster insurance claim processing</li>
                        <li>Comprehensive financial reporting</li>
                        <li>Reduced revenue leakage</li>
                        <li>Better financial planning and forecasting</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="staff" id="staff">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Building className="h-10 w-10 text-cyan-600" />
                    <div>
                      <CardTitle>Staff & HR Management</CardTitle>
                      <CardDescription>Complete human resource management for healthcare staff</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Staff profile and credential management</li>
                        <li>Attendance tracking and shift management</li>
                        <li>Leave management and approval workflow</li>
                        <li>Payroll processing and salary disbursement</li>
                        <li>Performance evaluation and feedback</li>
                        <li>Training and certification tracking</li>
                        <li>Department-wise staff allocation</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Streamlined HR operations and reduced paperwork</li>
                        <li>Improved staff scheduling and resource allocation</li>
                        <li>Enhanced compliance with healthcare regulations</li>
                        <li>Better staff satisfaction and retention</li>
                        <li>Accurate payroll processing and reporting</li>
                        <li>Data-driven insights for workforce planning</li>
                        <li>Improved communication between management and staff</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" id="inventory">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <ShoppingBag className="h-10 w-10 text-cyan-600" />
                    <div>
                      <CardTitle>Inventory & Pharmacy</CardTitle>
                      <CardDescription>Complete medicine and equipment inventory management</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Medicine stock management with batch tracking</li>
                        <li>Expiry date monitoring and alerts</li>
                        <li>Purchase order management and vendor tracking</li>
                        <li>Automated reorder level notifications</li>
                        <li>Pharmacy sales and billing integration</li>
                        <li>Equipment and asset management</li>
                        <li>Inventory reports and analytics</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Optimized inventory levels and reduced wastage</li>
                        <li>Prevention of stock-outs and emergency purchases</li>
                        <li>Better control over expired medicines</li>
                        <li>Streamlined procurement process</li>
                        <li>Enhanced pharmacy operations and customer service</li>
                        <li>Improved financial control over inventory costs</li>
                        <li>Data-driven insights for inventory planning</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" id="reports">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <BarChart3 className="h-10 w-10 text-cyan-600" />
                    <div>
                      <CardTitle>Reports & Analytics</CardTitle>
                      <CardDescription>Comprehensive data analysis and reporting tools</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Dashboard with key performance indicators</li>
                        <li>Financial reports and revenue analysis</li>
                        <li>Patient statistics and demographics</li>
                        <li>Doctor performance and appointment analytics</li>
                        <li>Staff attendance and productivity reports</li>
                        <li>Inventory and pharmacy sales analysis</li>
                        <li>Customizable report generation and export</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>Data-driven decision making and planning</li>
                        <li>Improved operational efficiency and resource allocation</li>
                        <li>Better financial management and cost control</li>
                        <li>Enhanced patient care through insights</li>
                        <li>Performance monitoring and improvement</li>
                        <li>Regulatory compliance and reporting</li>
                        <li>Strategic planning based on trends and patterns</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
