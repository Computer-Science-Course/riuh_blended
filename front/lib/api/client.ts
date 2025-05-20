import { api } from "../api"
import type { Client } from "../types/client"

export const getClients = async (page: number = 1, perPage: number = 10): Promise<Client[]> => {
  try {
    const response = await api.get("/client", {
      page: page,
      per_page: perPage
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar clientes")
  }
}

export const getClient = async (document: string): Promise<Client> => {
  try {
    const response = await api.get(`/client/${document}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar cliente")
  }
}

export const createClient = async (clientData: Partial<Client>): Promise<Client> => {
  try {
    const response = await api.post("/client", clientData)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao criar cliente")
  }
}

export const updateClient = async (id: number, clientData: Partial<Client>): Promise<Client> => {
  try {
    const response = await api.put(`/client/${id}`, clientData)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao atualizar cliente")
  }
}

export const deleteClient = async (id: number, password: string): Promise<void> => {
  try {
    await api.delete(`/client/${id}`, { password })
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao deletar cliente")
  }
}
