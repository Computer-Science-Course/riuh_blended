"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Image from "next/image"
import Footer from "@/components/footer"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(username, password)
      router.push("/caixa")
    } catch (error: any) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-900 text-white-900">
      <div className="flex items-center justify-center w-full h-full">
        <Card className="flex items-center justify-center bg-black-500 rounded-lg w-full max-w-[72rem] h-auto md:h-[40rem] border-none">
          <div className="flex flex-col gap-8 items-center justify-center w-full md:w-1/2 h-full p-6 md:p-24 box-border">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-white-900">Entre na sua conta</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <form onSubmit={handleLogin} className="flex flex-col gap-4 items-center justify-center w-full">
                <div className="w-full">
                  <Input
                    required
                    className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-900 w-full"
                    placeholder="Insira seu usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    aria-label="Nome de usuário"
                  />
                </div>
                <div className="w-full relative">
                  <Input
                    required
                    type={showPassword ? "text" : "password"}
                    className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-900 w-full pr-10"
                    placeholder="Insira sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Senha"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <Eye size={24} className="text-black-500" />
                    ) : (
                      <EyeOff size={24} className="text-black-500" />
                    )}
                  </button>
                </div>
                <Button
                  type="submit"
                  className="bg-purple-900 text-white-800 hover:bg-purple-700 w-full"
                  disabled={isLoading}
                  aria-disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </CardContent>
          </div>
          <div className="hidden md:block w-1/2 h-full">
            <Image
              src="/assets/login_cover.png"
              alt="Login cover"
              width={800}
              height={800}
              className="w-full h-full object-cover rounded-r-lg"
              priority
            />
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
