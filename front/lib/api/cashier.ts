import { api } from "../api"
import type { Product } from "../types/product"
import type { Client } from "../types/client"
import type { Wallet } from "../types/wallet"
import type { Employee } from "../types/employee"

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/product")
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar produtos")
  }
}

export const getClientByDocument = async (document: string): Promise<Client> => {
  try {
    const response = await api.get(`/client/document/${document}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar cliente")
  }
}

export const getClient = async (id: string): Promise<Client> => {
  try {
    const response = await api.get(`/client/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar cliente")
  }
}

export const getWallet = async (clientId: number): Promise<Wallet> => {
  try {
    const response = await api.get(`/wallet/client/${clientId}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar carteira")
  }
}

export const getSelfEmployee = async (): Promise<Employee> => {
  try {
    const response = await api.get("/employee/self")
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar funcionário")
  }
}

type SellParams = {
  client_id: number
  employee_id: number
  product_id: number
  price: number
  quantity: number
  isPayingFromWallet: boolean
}

export const sell = async (params: SellParams): Promise<void> => {
  try {
    await api.post("/order", params)
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao realizar venda")
  }
}
