import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { AuthProvider } from "@/hooks/use-auth"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "New Bawa Lal Ji Hospital - HMS",
  description: "Hospital Management System for New Bawa Lal Ji Hospital",
  icons: {
    icon: "/favicon.ico",
  },
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <AuthProvider>{children}</AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import "./globals.css"

import "./globals.css"


import './globals.css'