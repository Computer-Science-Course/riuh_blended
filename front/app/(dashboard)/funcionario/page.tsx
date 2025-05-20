"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
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
import { getEmployees, deleteEmployee } from "@/lib/api/employee"
import type { Employee } from "@/lib/types/employee"
import { useAuth } from "@/lib/auth-context"

export default function EmployeePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { currentUser } = useAuth()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchField, setSearchField] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | undefined>(undefined)
  const [password, setPassword] = useState("")

  const handleGetEmployees = async () => {
    setIsLoading(true)
    try {
      const employeesData = await getEmployees()
      setEmployees(employeesData)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar funcionários",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEmployee = async () => {
    if (!selectedEmployeeId) return

    setIsLoading(true)
    try {
      await deleteEmployee(selectedEmployeeId, password)
      toast({
        title: "Funcionário deletado com sucesso!",
        variant: "default",
      })
      setEmployees((prev) => prev.filter((employee) => employee.id !== selectedEmployeeId))
      setShowConfirmModal(false)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao deletar funcionário",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
      setPassword("")
    }
  }

  useEffect(() => {
    handleGetEmployees()
  }, [])

  const filteredEmployees = employees.filter((employee) => {
    if (searchField === "") return true

    const nameMatch = employee.name?.toLowerCase().includes(searchField.toLowerCase())
    const usernameMatch = employee.username?.toLowerCase().includes(searchField.toLowerCase())
    const documentMatch = employee.document?.toLowerCase().includes(searchField.toLowerCase())

    return nameMatch || usernameMatch || documentMatch
  })

  return (
    <div className="w-full h-full flex flex-col p-12 gap-8">
      <h1 className="text-4xl font-bold">Funcionários</h1>
      <BreadCrumbs />

      <section className="flex gap-40">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Input
              className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 pr-10 w-[300px]"
              placeholder="Digite um nome, usuário ou documento"
              onChange={(e) => setSearchField(e.target.value)}
              disabled={employees.length === 0}
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
            {filteredEmployees.map((employee) => (
              <CRUDListItem
                key={employee.id}
                title={employee.name || ""}
                description={`${employee.username} | ${employee.document}`}
                onClickDelete={() => {
                  setSelectedEmployeeId(employee.id)
                  setShowConfirmModal(true)
                }}
                onClickEdit={() => router.push(`/funcionario/editar/${employee.id}`)}
              />
            ))}
            {filteredEmployees.length === 0 && <p className="text-white-300">Nenhum funcionário encontrado</p>}
          </div>
        </div>
      </section>

      <Button
        onClick={() => router.push("/funcionario/criar")}
        disabled={isLoading}
        className="bg-purple-900 text-white-800 hover:bg-purple-700 w-max"
      >
        Criar novo funcionário
      </Button>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="bg-white-800 text-black-900">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>Você tem certeza que deseja deletar esse funcionário?</DialogDescription>
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
              onClick={handleDeleteEmployee}
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
