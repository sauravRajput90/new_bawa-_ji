"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, role: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  register: async () => false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        if (typeof window !== "undefined") {
          localStorage.removeItem("user")
        }
      }
    }
  }, [])

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    // In a real app, this would be an API call to authenticate
    // For demo purposes, we'll simulate a successful login
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "user-123",
        name: email.split("@")[0],
        email,
        role,
      }

      setUser(mockUser)
      setIsAuthenticated(true)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(mockUser))
      }
      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    if (typeof window !== "undefined") {
      // Clear all auth-related items from localStorage
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      // Clear any session cookies if you're using them
      document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.trim().split("=")
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      })
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call to register a new user
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: "patient",
      }

      setUser(mockUser)
      setIsAuthenticated(true)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(mockUser))
      }
      return true
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
