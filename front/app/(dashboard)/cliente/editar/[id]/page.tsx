"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import BreadCrumbs from "@/components/breadcrumbs"
import { getClient, updateClient } from "@/lib/api/client"
import { getWallet, updateWallet } from "@/lib/api/wallet"
import type { Client } from "@/lib/types/client"
import type { Wallet } from "@/lib/types/wallet"

export default function EditClientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [client, setClient] = useState<Client>({})
  const [wallet, setWallet] = useState<Wallet>({})
  const [name, setName] = useState("")
  const [registration, setRegistration] = useState("")
  const [course, setCourse] = useState("")
  const [active, setActive] = useState(true)
  const [balance, setBalance] = useState(0)
  const [additionalBalance, setAdditionalBalance] = useState(0)

  useEffect(() => {
    const fetchClientData = async () => {
      setIsLoading(true)
      try {
        const clientData = await getClient(params.id)
        setClient(clientData)
        setName(clientData.name || "")
        setRegistration(clientData.registration || "")
        setCourse(clientData.course || "")
        setActive(clientData.active || false)

        if (clientData.id) {
          const walletData = await getWallet(clientData.id)
          setWallet(walletData)
          setBalance(walletData.balance || 0)
        }
      } catch (error: any) {
        toast.error("Erro ao carregar dados do cliente")
        router.push("/cliente")
      } finally {
        setIsLoading(false)
      }
    }

    fetchClientData()
  }, [params.id, router, toast])

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Update client
      await updateClient(Number.parseInt(params.id), {
        name,
        registration,
        username: registration, // Using registration as username
        course,
        active,
      })

      // Update wallet if additional balance > 0
      if (additionalBalance > 0 && client.id) {
        await updateWallet(client.id, {
          balance: balance + additionalBalance,
        })
      }

      toast.success("Cliente atualizado com sucesso!")

      router.push("/cliente")
    } catch (error: any) {
      toast.error("Erro ao atualizar cliente")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdditionalBalanceChange = (value: number) => {
    setAdditionalBalance(Number(Math.max(0, value).toFixed(2)))
  }

  return (
    <div className="w-full h-full flex flex-col p-12 gap-8">
      <h1 className="text-4xl font-bold">Editar Freguês</h1>
      <BreadCrumbs />

      <form onSubmit={handleUpdateClient} className="flex flex-col gap-8">
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
              <label className="block text-white-900 mb-1">Curso</label>
              <Input
                required
                className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
                placeholder="Digite o curso do freguês"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center">
              <div className="flex items-center space-x-2">
                <Switch checked={active} onCheckedChange={setActive} id="active-status" />
                <label htmlFor="active-status" className="text-white-900 cursor-pointer">
                  Cliente ativo
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Recarga adicional</label>
              <Input
                type="number"
                step="0.01"
                className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full hide-number-arrows"
                value={additionalBalance}
                onChange={(e) => handleAdditionalBalanceChange(Number.parseFloat(e.target.value))}
              />
            </div>
            <Button
              type="button"
              className="bg-red-to-white-100 text-white-800 hover:bg-red-to-white-300"
              onClick={() => handleAdditionalBalanceChange(additionalBalance - 1)}
              disabled={additionalBalance <= 0}
            >
              -
            </Button>
            <Button
              type="button"
              className="bg-green-700 text-white-800 hover:bg-green-500"
              onClick={() => handleAdditionalBalanceChange(additionalBalance + 1)}
            >
              +
            </Button>
          </div>
          <div>
            <p>Saldo atual R${balance.toFixed(2)}</p>
            <p>Saldo após a recarga R${(balance + additionalBalance).toFixed(2)}</p>
          </div>
        </div>
        <Button type="submit" className="bg-purple-900 text-white-800 hover:bg-purple-700 w-max" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar alterações"}
        </Button>
      </form>
    </div>
  )
}
