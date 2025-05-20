import { api } from "../api"
import type { Wallet } from "../types/wallet"

export const getWallet = async (clientId: number): Promise<Wallet> => {
  try {
    const response = await api.get(`/wallet/client/${clientId}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar carteira")
  }
}

export const createWallet = async (walletData: Partial<Wallet>): Promise<Wallet> => {
  try {
    const response = await api.post("/wallet", walletData)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao criar carteira")
  }
}

export const updateWallet = async (clientId: number, walletData: Partial<Wallet>): Promise<Wallet> => {
  try {
    const response = await api.put(`/wallet/client/${clientId}`, walletData)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao atualizar carteira")
  }
}
