// Modernize auth context with better error handling and React 18 patterns
"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { api } from "./api"

type User = {
  id?: number
  name?: string
  username?: string
  role?: string
}

type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  currentUser: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  currentUser: null,
  login: async () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check on server side
      if (typeof window === "undefined") {
        setIsLoading(false)
        return
      }

      const token = localStorage.getItem("accessToken")

      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        // Set the token in the API instance
        api.setToken(token)

        // Get current user info
        const response = await api.get("/employee/self")
        setCurrentUser(response.data)
        setIsAuthenticated(true)
      } catch (error) {
        // If token is invalid, clear it
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post("/login", { username, password })
      const { access_token, refresh_token } = response.data

      // Store tokens
      localStorage.setItem("accessToken", access_token)
      localStorage.setItem("refreshToken", refresh_token)

      // Set token in API instance
      api.setToken(access_token)

      // Get user info
      const userResponse = await api.get("/employee/self")
      setCurrentUser(userResponse.data)
      setIsAuthenticated(true)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Falha na autenticação")
    }
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setCurrentUser(null)
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
