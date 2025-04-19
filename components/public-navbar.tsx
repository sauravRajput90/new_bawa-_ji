"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/hooks/use-auth"

export default function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  const { isAuthenticated } = useAuth()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("features"), href: "/features" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ]

  return (
    <header className="bg-gradient-to-r from-[#3a7561] to-[#c64b7a] dark:from-[#2a5541] dark:to-[#a62b5a] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="flex items-center space-x-3">
            <div className="w-12 h-12 relative bg-white p-1">
  <Image
    src="/images/logo (2).jpeg"
    alt="New Bawa Lal Ji Hospital"
    width={48}
    height={48}
    className="object-contain"
  />
</div>

              <div>
                <h1 className="text-xl font-bold leading-tight">NEW BAWA LAL JI</h1>
                <p className="text-sm font-medium -mt-1">HOSPITAL</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={isAuthenticated ? "/admin/dashboard" : link.href}
              className={`hover:text-pink-100 font-medium transition-colors ${
                isActive(link.href) ? "text-pink-100 font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Theme and Language selectors */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <LanguageSelector />

          {!isAuthenticated ? (
            <div className="flex space-x-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-[#c64b7a] transition-all"
                >
                  {t("login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-white text-[#3a7561] hover:bg-pink-100 shadow-md transform hover:-translate-y-1 transition-all">
                  {t("register")}
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/admin/dashboard">
              <Button className="bg-white text-[#3a7561] hover:bg-pink-100 shadow-md transform hover:-translate-y-1 transition-all">
                {t("dashboard")}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#3a7561] to-[#c64b7a] dark:from-[#2a5541] dark:to-[#a62b5a] py-4 px-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={isAuthenticated ? "/admin/dashboard" : link.href}
                className={`hover:text-pink-100 font-medium transition-colors ${
                  isActive(link.href) ? "text-pink-100 font-semibold" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center space-x-3 pt-2 border-t border-white/20">
              <ThemeToggle />
              <LanguageSelector />
            </div>

            {!isAuthenticated ? (
              <div className="flex flex-col space-y-2 pt-2 border-t border-white/20">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-white text-white hover:bg-white hover:text-[#c64b7a] transition-all"
                  >
                    {t("login")}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full bg-white text-[#3a7561] hover:bg-pink-100 transition-all">
                    {t("register")}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="pt-2 border-t border-white/20">
                <Link href="/admin/dashboard">
                  <Button className="w-full bg-white text-[#3a7561] hover:bg-pink-100 transition-all">
                    {t("dashboard")}
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
