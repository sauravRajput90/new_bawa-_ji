"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  X,
  Stethoscope,
  Building,
  ShoppingBag,
  BarChart3,
  User,
  Bell,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/hooks/use-auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"

interface AdminSidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export function AdminSidebar({ isOpen, toggleSidebar }: AdminSidebarProps) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { logout, user } = useAuth()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const menuItems = [
    { name: t("dashboard"), icon: <Home className="h-5 w-5" />, href: "/admin/dashboard" },
    { name: t("patients"), icon: <Users className="h-5 w-5" />, href: "/admin/patients" },
    { name: t("doctors"), icon: <Stethoscope className="h-5 w-5" />, href: "/admin/doctors" },
    { name: t("opd"), icon: <Calendar className="h-5 w-5" />, href: "/admin/opd" },
    { name: t("billing"), icon: <CreditCard className="h-5 w-5" />, href: "/admin/billing" },
    { name: t("staff"), icon: <Building className="h-5 w-5" />, href: "/admin/staff" },
    { name: t("inventory"), icon: <ShoppingBag className="h-5 w-5" />, href: "/admin/inventory" },
    { name: t("reports"), icon: <BarChart3 className="h-5 w-5" />, href: "/admin/reports" },
  ]

  return (
    <aside
      className={`
      fixed top-0 left-0 z-20 h-full w-64 bg-gradient-to-b from-[#3a7561] to-[#c64b7a] dark:from-[#2a5541] dark:to-[#a62b5a] text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white  flex items-center justify-center relative p-1">
            <Image
              src="/images/logo (2).jpeg"
              alt="New Bawa Lal Ji Hospital"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">NEW BAWA LAL JI</h1>
            <p className="text-xs font-medium -mt-1">HOSPITAL</p>
          </div>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden text-white">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#c64b7a]">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">{user?.name || "Admin User"}</p>
            <p className="text-xs text-white/70">{user?.role || "Administrator"}</p>
          </div>
        </div>
      </div>

      <nav className="mt-2 px-3">
        <p className="text-xs font-semibold text-white/50 uppercase tracking-wider px-3 mb-2">Main Menu</p>
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors
                  ${isActive(item.href) ? "bg-white/20 font-medium" : "hover:bg-white/10"}
                `}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-xs font-semibold text-white/50 uppercase tracking-wider px-3 mb-2 mt-6">Settings</p>
        <ul className="space-y-1">
          <li>
            <Link
              href="/admin/settings"
              className={`
                flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors
                ${isActive("/admin/settings") ? "bg-white/20 font-medium" : "hover:bg-white/10"}
              `}
            >
              <Settings className="h-5 w-5" />
              <span>{t("settings")}</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/notifications"
              className={`
                flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors
                ${isActive("/admin/notifications") ? "bg-white/20 font-medium" : "hover:bg-white/10"}
              `}
            >
              <Bell className="h-5 w-5" />
              <span>{t("notifications")}</span>
              <span className="ml-auto bg-white text-[#c64b7a] text-xs font-medium px-2 py-0.5 rounded-full">5</span>
            </Link>
          </li>
          <li>
            <div className="flex items-center justify-between px-3 py-2.5 mt-2">
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </li>
          <li>
            <button
              onClick={() => {
                logout()
                // Use window.location for a full page refresh to ensure clean logout
                window.location.href = "/login"
              }}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>{t("logout")}</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
