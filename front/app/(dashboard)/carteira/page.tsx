"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BreadCrumbs from "@/components/breadcrumbs"
import CRUDListItem from "@/components/crud-list-item"
import { getClients } from "@/lib/api/client"
import { getWallet, updateWallet } from "@/lib/api/wallet"
import type { Client } from "@/lib/types/client"
import type { Wallet } from "@/lib/types/wallet"

export default function WalletPage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [wallets, setWallets] = useState<Record<number, Wallet>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [searchField, setSearchField] = useState("")
  const [selectedClientId, setSelectedClientId] = useState<number | undefined>(undefined)
  const [additionalBalance, setAdditionalBalance] = useState(0)

  const handleGetClients = async () => {
    setIsLoading(true)
    try {
      const clientsData = await getClients()
      setClients(clientsData)

      // Load wallets for all clients
      const walletsData: Record<number, Wallet> = {}
      for (const client of clientsData) {
        if (client.id) {
          try {
            const wallet = await getWallet(client.id)
            walletsData[client.id] = wallet
          } catch (error) {
            // If wallet doesn't exist, create an empty one
            walletsData[client.id] = { client_id: client.id, balance: 0 }
          }
        }
      }
      setWallets(walletsData)
    } catch (error: any) {
      toast.error("Erro ao carregar clientes")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddBalance = async () => {
    if (!selectedClientId || additionalBalance <= 0) return

    setIsLoading(true)
    try {
      const currentWallet = wallets[selectedClientId]
      const currentBalance = currentWallet?.balance || 0

      await updateWallet(selectedClientId, {
        balance: currentBalance + additionalBalance,
      })

      // Update local state
      setWallets((prev) => ({
        ...prev,
        [selectedClientId]: {
          ...prev[selectedClientId],
          balance: (prev[selectedClientId]?.balance || 0) + additionalBalance,
        },
      }))

      toast.success("Saldo adicionado com sucesso!")

      setAdditionalBalance(0)
      setSelectedClientId(undefined)
    } catch (error: any) {
      toast.error("Erro ao adicionar saldo")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleGetClients()
  }, [])

  const filteredClients = clients.filter((client) => {
    if (searchField === "") return true

    const nameMatch = client.name?.toLowerCase().includes(searchField.toLowerCase())
    const registrationMatch = client.registration?.toLowerCase().includes(searchField.toLowerCase())

    return nameMatch || registrationMatch
  })

  const handleAdditionalBalanceChange = (value: number) => {
    setAdditionalBalance(Number(Math.max(0, value).toFixed(2)))
  }

  return (
    <div className="w-full h-full flex flex-col p-12 gap-8">
      <h1 className="text-4xl font-bold">Carteira</h1>
      <BreadCrumbs />

      <section className="flex gap-40">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Input
              className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 pr-10 w-[300px]"
              placeholder="Digite um nome ou matrícula"
              onChange={(e) => setSearchField(e.target.value)}
              disabled={clients.length === 0}
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex flex-col max-h-96 overflow-y-auto gap-4 p-2 pr-12 scrollbar-thin scrollbar-thumb-white-200 scrollbar-track-black-0 scrollbar-rounded-lg scrollbar-track-rounded-lg">
            {filteredClients.map((client) => (
              <CRUDListItem
                key={client.id}
                title={client.name || ""}
                description={`${client.registration} | Saldo: R$ ${wallets[client.id!]?.balance?.toFixed(2) || "0.00"}`}
                onClickEdit={() => setSelectedClientId(client.id)}
              />
            ))}
            {filteredClients.length === 0 && <p className="text-white-300">Nenhum cliente encontrado</p>}
          </div>
        </div>

        {selectedClientId && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">
              Adicionar saldo para {clients.find((c) => c.id === selectedClientId)?.name}
            </h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-white-900 mb-1">Valor a adicionar</label>
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
              <p>Saldo atual R${wallets[selectedClientId]?.balance?.toFixed(2) || "0.00"}</p>
              <p>
                Saldo após a recarga R$
                {((wallets[selectedClientId]?.balance || 0) + additionalBalance).toFixed(2)}
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setSelectedClientId(undefined)}
                className="bg-red-to-white-100 text-white-800 hover:bg-red-to-white-300"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddBalance}
                disabled={isLoading || additionalBalance <= 0}
                className="bg-green-700 text-white-800 hover:bg-green-500"
              >
                Adicionar saldo
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
