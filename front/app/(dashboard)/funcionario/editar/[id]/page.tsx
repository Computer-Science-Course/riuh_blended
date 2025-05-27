"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BreadCrumbs from "@/components/breadcrumbs"
import { getEmployee, updateEmployee } from "@/lib/api/employee"
import type { Employee } from "@/lib/types/employee"

export default function EditEmployeePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [employee, setEmployee] = useState<Employee>({})
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [document, setDocument] = useState("")
  const [role, setRole] = useState("employee")
  const [active, setActive] = useState(true)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setIsLoading(true)
      try {
        const employeeData = await getEmployee(Number.parseInt(params.id))
        setEmployee(employeeData)
        setName(employeeData.name || "")
        setUsername(employeeData.username || "")
        setDocument(employeeData.document || "")
        setRole(employeeData.role || "employee")
        setActive(employeeData.active || false)
      } catch (error: any) {
        toast.error("Erro ao carregar dados do funcionário")
        router.push("/funcionario")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmployeeData()
  }, [params.id, router, toast])

  const handleUpdateEmployee = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isChangingPassword && password !== confirmPassword) {
      toast.error("Senhas não coincidem", {
        description: "Por favor, verifique se as senhas são iguais",
      })
      return
    }

    setIsLoading(true)

    try {
      const updateData: Partial<Employee> = {
        name,
        username,
        document,
        role,
        active,
      }

      if (isChangingPassword && password) {
        updateData.password = password
      }

      await updateEmployee(Number.parseInt(params.id), updateData)

      toast.success("Funcionário atualizado com sucesso!")

      router.push("/funcionario")
    } catch (error: any) {
      toast.error("Erro ao atualizar funcionário", {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col p-12 gap-8">
      <h1 className="text-4xl font-bold">Editar Funcionário</h1>
      <BreadCrumbs />

      <form onSubmit={handleUpdateEmployee} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Nome</label>
              <Input
                required
                className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
                placeholder="Digite o nome do funcionário"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Usuário</label>
              <Input
                required
                className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
                placeholder="Digite o nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Documento</label>
              <Input
                required
                className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
                placeholder="Digite o documento do funcionário"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Função</label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="bg-white-700 text-black-500 font-mono font-semibold">
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="employee">Funcionário</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={active} onCheckedChange={setActive} id="active-status" />
            <label htmlFor="active-status" className="text-white-900 cursor-pointer">
              Funcionário ativo
            </label>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Switch checked={isChangingPassword} onCheckedChange={setIsChangingPassword} id="change-password" />
            <label htmlFor="change-password" className="text-white-900 cursor-pointer">
              Alterar senha
            </label>
          </div>
          {isChangingPassword && (
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-white-900 mb-1">Nova Senha</label>
                <Input
                  type="password"
                  className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
                  placeholder="Digite a nova senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-white-900 mb-1">Confirmar Nova Senha</label>
                <Input
                  type="password"
                  className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
                  placeholder="Confirme a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        <Button type="submit" className="bg-purple-900 text-white-800 hover:bg-purple-700 w-max" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar alterações"}
        </Button>
      </form>
    </div>
  )
}
