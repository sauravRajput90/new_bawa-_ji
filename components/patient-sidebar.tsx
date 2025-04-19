"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, FileText, Users, MessageSquare, BarChart3, Settings, LogOut, X } from "lucide-react"

interface PatientSidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export function PatientSidebar({ isOpen, toggleSidebar }: PatientSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <aside
      className={`
      fixed top-0 left-0 z-20 h-full w-64 bg-gradient-to-b from-teal-600 to-cyan-700 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-cyan-600 text-xl font-bold">H</span>
          </div>
          <h1 className="text-xl font-bold">HealthCare</h1>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden text-white">
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {[
            { name: "Dashboard", icon: <Home className="h-5 w-5" />, href: "/dashboard" },
            { name: "Appointments", icon: <Calendar className="h-5 w-5" />, href: "/dashboard/appointments" },
            { name: "Medical Records", icon: <FileText className="h-5 w-5" />, href: "/dashboard/records" },
            { name: "Doctors", icon: <Users className="h-5 w-5" />, href: "/dashboard/doctors" },
            { name: "Messages", icon: <MessageSquare className="h-5 w-5" />, href: "/dashboard/messages" },
            { name: "Health Stats", icon: <BarChart3 className="h-5 w-5" />, href: "/dashboard/stats" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive(item.href) ? "bg-white/20 font-medium" : "hover:bg-white/10"}
                `}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 pt-6 border-t border-white/20">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard/settings"
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive("/dashboard/settings") ? "bg-white/20 font-medium" : "hover:bg-white/10"}
                `}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}
