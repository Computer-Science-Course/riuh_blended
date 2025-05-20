"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
// Import the LoadingSpinner component
import LoadingSpinner from "@/components/loading-spinner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  // Update the loading state in the layout
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black-900">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="w-full h-screen flex flex-col bg-black-900 gap-3 px-4 py-4">
      <div className="w-full h-full flex gap-3">
        <Sidebar />
        <div className="h-full w-full rounded-lg bg-black-700 border border-black-400 text-white-900">{children}</div>
      </div>
      <Footer />
    </div>
  )
}
