"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BreadCrumbs from "@/components/breadcrumbs"
import { createClient } from "@/lib/api/client"
import { createWallet } from "@/lib/api/wallet"
import { Loader2 } from "lucide-react"

export default function CreateClientPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [registration, setRegistration] = useState("")
  const [document, setDocument] = useState("")
  const [course, setCourse] = useState("")
  const [balance, setBalance] = useState(0)

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create client
      const newClient = await createClient({
        name,
        registration,
        username: registration, // Using registration as username
        course,
      })

      // Create wallet if balance > 0
      if (balance > 0 && newClient.id) {
        await createWallet({
          client_id: newClient.id,
          balance,
        })
      }

      toast({
        title: "Cliente criado com sucesso!",
        variant: "default",
      })

      router.push("/cliente")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar cliente",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBalanceChange = (value: number) => {
    setBalance(Number(Math.max(0, value).toFixed(2)))
  }

  return (
    <div className="w-full h-full flex flex-col p-12 gap-8">
      <h1 className="text-4xl font-bold">Freguês</h1>
      <BreadCrumbs />

      <form onSubmit={handleCreateClient} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Nome</label>
              <Input
                required
                className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
                placeholder="Digite o nome do freguês"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Matrícula</label>
              <Input
                required
                className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
                placeholder="Insira a matrícula"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Documento</label>
              <Input
                required
                className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
                placeholder="Digite o documento do freguês"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Curso</label>
              <Input
                required
                className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
                placeholder="Digite o curso do freguês"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Recarga</label>
              <Input
                type="number"
                step="0.01"
                className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full hide-number-arrows"
                value={balance}
                onChange={(e) => handleBalanceChange(Number.parseFloat(e.target.value))}
              />
            </div>
            <Button
              type="button"
              className="bg-red-to-white-100 text-white-800 hover:bg-red-to-white-300"
              onClick={() => handleBalanceChange(balance - 1)}
              disabled={balance <= 0}
            >
              -
            </Button>
            <Button
              type="button"
              className="bg-green-700 text-white-800 hover:bg-green-500"
              onClick={() => handleBalanceChange(balance + 1)}
            >
              +
            </Button>
          </div>
          <div>
            <p>Saldo atual R$0,00</p>
            <p>Saldo após a recarga R${balance.toFixed(2)}</p>
          </div>
        </div>
        <Button type="submit" className="bg-purple-900 text-white-800 hover:bg-purple-700 w-max" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Criar novo freguês"}
        </Button>
      </form>
    </div>
  )
}
