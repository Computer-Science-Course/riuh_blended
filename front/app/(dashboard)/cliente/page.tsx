"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import BreadCrumbs from "@/components/breadcrumbs"
import CRUDListItem from "@/components/crud-list-item"
import { getClients, deleteClient } from "@/lib/api/client"
import type { Client } from "@/lib/types/client"
import { useAuth } from "@/lib/auth-context"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ClientPage() {
  const router = useRouter()
  const { currentUser } = useAuth()
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchField, setSearchField] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedClientId, setSelectedClientId] = useState<number | undefined>(undefined)
  const [password, setPassword] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)

  const handleGetClients = async () => {
    setIsLoading(true)
    try {
      const clientsData = await getClients(page)
      setClients(clientsData)
    } catch (error: any) {
      toast.error("Erro ao carregar clientes")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClient = async () => {
    if (!selectedClientId) return

    setIsLoading(true)
    try {
      await deleteClient(selectedClientId, password)
      toast.success("Cliente deletado com sucesso!")
      setClients((prev) => prev.filter((client) => client.id !== selectedClientId))
      setShowConfirmModal(false)
    } catch (error: any) {
      toast.error("Erro ao deletar cliente")
    } finally {
      setIsLoading(false)
      setPassword("")
    }
  }

  useEffect(() => {
    handleGetClients()
  }, [page])

  const filteredClients = clients.filter((client) => {
    if (searchField === "") return true

    const nameMatch = client.name?.toLowerCase().includes(searchField.toLowerCase())
    const registrationMatch = client.registration?.toLowerCase().includes(searchField.toLowerCase())

    return nameMatch || registrationMatch
  })

  return (
    <div className="w-full h-full flex flex-col p-12 gap-8">
      <h1 className="text-4xl font-bold">Freguês</h1>
      <BreadCrumbs />

      <section className="flex gap-40">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Input
              className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 pr-10 w-[300px]"
              placeholder="Digite um nome ou documento"
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
                description={client.registration || ""}
                onClickDelete={() => {
                  setSelectedClientId(client.id)
                  setShowConfirmModal(true)
                }}
                onClickEdit={() => router.push(`/cliente/editar/${client.id}`)}
              />
            ))}
            {filteredClients.length === 0 && <p className="text-white-300">Nenhum cliente encontrado</p>}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (page > 1) setPage(page - 1)
                  }}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i

                return pageNumber <= totalPages ? (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setPage(pageNumber)
                      }}
                      isActive={pageNumber === page}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ) : null
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (page < totalPages) setPage(page + 1)
                  }}
                  className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>

      <Button
        onClick={() => router.push("/cliente/criar")}
        disabled={isLoading}
        className="bg-purple-900 text-white-800 hover:bg-purple-700 w-max"
      >
        Criar novo freguês
      </Button>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="bg-white-800 text-black-900">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>Você tem certeza que deseja deletar esse aluno?</DialogDescription>
          </DialogHeader>

          <Input
            type="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="font-mono"
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
              className="bg-red-to-white-100 text-white-800 hover:bg-red-to-white-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteClient}
              disabled={isLoading || !password}
              className="bg-green-700 text-white-800 hover:bg-green-500"
            >
              Prosseguir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
