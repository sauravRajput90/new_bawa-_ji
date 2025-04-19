"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, DollarSign, Video, UserCheck, Briefcase, Bed, Building } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  change?: string
  changeType?: "positive" | "negative" | "neutral"
}

function StatCard({ title, value, icon, change, changeType = "neutral" }: StatCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
            {change && (
              <p
                className={`text-xs mt-1 ${
                  changeType === "positive"
                    ? "text-green-500"
                    : changeType === "negative"
                      ? "text-red-500"
                      : "text-gray-500"
                }`}
              >
                {change}
              </p>
            )}
          </div>
          <div className="bg-cyan-50 p-3 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  const stats = [
    {
      title: "Total Patients",
      value: "1,248",
      icon: <Users className="h-8 w-8 text-cyan-600" />,
      change: "+12% from last month",
      changeType: "positive" as const,
    },
    {
      title: "Appointments",
      value: "486",
      icon: <Calendar className="h-8 w-8 text-cyan-600" />,
      change: "+8% from last month",
      changeType: "positive" as const,
    },
    {
      title: "Revenue",
      value: "$38,629",
      icon: <DollarSign className="h-8 w-8 text-cyan-600" />,
      change: "+18% from last month",
      changeType: "positive" as const,
    },
    {
      title: "Online Consults",
      value: "124",
      icon: <Video className="h-8 w-8 text-cyan-600" />,
      change: "+32% from last month",
      changeType: "positive" as const,
    },
    {
      title: "Active Doctors",
      value: "36",
      icon: <Briefcase className="h-8 w-8 text-cyan-600" />,
      change: "2 on leave",
      changeType: "neutral" as const,
    },
    {
      title: "Staff Attendance",
      value: "92%",
      icon: <UserCheck className="h-8 w-8 text-cyan-600" />,
      change: "-3% from last month",
      changeType: "negative" as const,
    },
    {
      title: "Occupied Beds",
      value: "42/50",
      icon: <Bed className="h-8 w-8 text-cyan-600" />,
      change: "84% occupancy",
      changeType: "neutral" as const,
    },
    {
      title: "Active Departments",
      value: "8",
      icon: <Building className="h-8 w-8 text-cyan-600" />,
      change: "All operational",
      changeType: "positive" as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          changeType={stat.changeType}
        />
      ))}
    </div>
  )
}
