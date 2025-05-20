import { api } from "../api"
import type { Employee } from "../types/employee"

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await api.get("/employee")
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar funcionários")
  }
}

export const getEmployee = async (id: number): Promise<Employee> => {
  try {
    const response = await api.get(`/employee/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar funcionário")
  }
}

export const createEmployee = async (employeeData: Partial<Employee>): Promise<Employee> => {
  try {
    const response = await api.post("/employee", employeeData)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao criar funcionário")
  }
}

export const updateEmployee = async (id: number, employeeData: Partial<Employee>): Promise<Employee> => {
  try {
    const response = await api.put(`/employee/${id}`, employeeData)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao atualizar funcionário")
  }
}

export const deleteEmployee = async (id: number, password: string): Promise<void> => {
  try {
    await api.delete(`/employee/${id}`, { password })
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao deletar funcionário")
  }
}
