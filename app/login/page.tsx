"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff } from "lucide-react"
import PublicNavbar from "@/components/public-navbar"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("doctor")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password, role)

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to the Hospital Management System",
        })

        // Redirect based on role
        switch (role) {
          case "admin":
            router.push("/admin/dashboard")
            break
          case "doctor":
            router.push("/doctor/dashboard")
            break
          case "patient":
            router.push("/dashboard")
            break
          case "receptionist":
            router.push("/staff/dashboard")
            break
          default:
            router.push("/dashboard")
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <PublicNavbar />

      <div className="flex items-center justify-center p-4 py-16">
        <Card className="w-full max-w-md shadow-xl dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 relative">
                <Image
                  src="/images/logo (2).jpeg"
                  alt="New Bawa Lal Ji Hospital"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center dark:text-white">Welcome back</CardTitle>
            <CardDescription className="text-center dark:text-gray-300">
              Enter your credentials to access the hospital management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role" className="dark:text-white">
                  Login As
                </Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-11 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="receptionist">Receptionist</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="pharmacist">Pharmacist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="dark:text-white">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-[#c64b7a] dark:text-[#ff6b9a] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="dark:border-gray-500"
                />
                <Label htmlFor="remember" className="text-sm font-normal dark:text-gray-300">
                  Remember me for 30 days
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-[#3a7561] to-[#c64b7a] dark:from-[#2a5541] dark:to-[#a62b5a] text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : t("login")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" className="h-11 dark:border-gray-600 dark:text-gray-300">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-11 dark:border-gray-600 dark:text-gray-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </Button>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#c64b7a] dark:text-[#ff6b9a] hover:underline font-medium">
                Contact administrator
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
