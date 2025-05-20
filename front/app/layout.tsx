import type React from "react"
import type { Metadata } from "next"
import { Inter, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/toaster"

// Import the OfflineAlert component
import OfflineAlert from "@/components/offline-alert"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Improve font loading performance
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap", // Improve font loading performance
})

export const metadata: Metadata = {
  title: "Riuh",
  description: "Sistema de gerenciamento para cantinas",
  generator: "v0.dev",
}

// Add it to the layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexMono.variable} font-sans bg-black-900`}>
        <Providers>
          {children}
          <Toaster />
          <OfflineAlert />
        </Providers>
      </body>
    </html>
  )
}
