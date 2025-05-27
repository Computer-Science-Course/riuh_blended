"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BreadCrumbs from "@/components/breadcrumbs"
import { createEmployee } from "@/lib/api/employee"

export default function CreateEmployeePage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [document, setDocument] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("employee")

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Senhas não coincidem",
        description: "Por favor, verifique se as senhas são iguais",
      })
      return
    }

    setIsLoading(true)

    try {
      await createEmployee({
        name,
        username,
        document,
        password,
        role,
      })

      toast({
        title: "Funcionário criado com sucesso!",
        variant: "default",
      })

      router.push("/funcionario")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar funcionário",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col p-12 gap-8">
      <h1 className="text-4xl font-bold">Criar Funcionário</h1>
      <BreadCrumbs />

      <form onSubmit={handleCreateEmployee} className="flex flex-col gap-8">
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
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Senha</label>
              <Input
                required
                type="password"
                className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Confirmar Senha</label>
              <Input
                required
                type="password"
                className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
                placeholder="Confirme a senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="bg-purple-900 text-white-800 hover:bg-purple-700 w-max" disabled={isLoading}>
          {isLoading ? "Criando..." : "Criar funcionário"}
        </Button>
      </form>
    </div>
  )
}
