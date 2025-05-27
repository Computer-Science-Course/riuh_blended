
"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { WifiOff } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function OfflineAlert() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    const handleOffline = () => {
      setIsOffline(true)
      toast.error("Sem conexão com a internet")
    }

    const handleOnline = () => {
      setIsOffline(false)
      toast.success("Conectado à internet")
    }

    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    // Check initial state
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      handleOffline()
    }

    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [toast])

  if (!isOffline) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Alert variant="destructive">
        <WifiOff className="h-4 w-4" />
        <AlertTitle>Sem conexão com a internet</AlertTitle>
        <AlertDescription>Você está offline. Algumas funcionalidades podem não estar disponíveis.</AlertDescription>
      </Alert>
    </div>
  )
}
