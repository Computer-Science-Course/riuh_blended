"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { WifiOff } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function OfflineAlert() {
  const [isOffline, setIsOffline] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    const handleOffline = () => {
      setIsOffline(true)
      toast({
        variant: "destructive",
        title: "Sem conexão com a internet",
        description: "Você está offline. Algumas funcionalidades podem não estar disponíveis.",
        duration: 0, // Persist until dismissed
      })
    }

    const handleOnline = () => {
      setIsOffline(false)
      toast({
        title: "Conectado à internet",
        description: "Você está online novamente.",
      })
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
