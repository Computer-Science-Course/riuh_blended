import { api } from "../api"
import type { Product } from "../types/product"
// Import the cache
import { cache } from "../cache"

export const getProducts = async (): Promise<Product[]> => {
  // Check cache first
  const cachedProducts = cache.get<Product[]>("products")
  if (cachedProducts) {
    return cachedProducts
  }

  try {
    const response = await api.get("/product")
    // Store in cache for 5 minutes
    cache.set("products", response.data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar produtos")
  }
}

export const getProduct = async (id: number): Promise<Product> => {
  try {
    const response = await api.get(`/product/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao buscar produto")
  }
}

// Update other methods to invalidate cache when needed
export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  try {
    const response = await api.post("/product", productData)
    // Invalidate products cache
    cache.invalidate("products")
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao criar produto")
  }
}

export const updateProduct = async (id: number, productData: Partial<Product>): Promise<Product> => {
  try {
    const response = await api.put(`/product/${id}`, productData)
    // Invalidate products cache
    cache.invalidate("products")
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao atualizar produto")
  }
}

export const deleteProduct = async (id: number, password: string): Promise<void> => {
  try {
    await api.delete(`/product/${id}`, { password })
    // Invalidate products cache
    cache.invalidate("products")
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao deletar produto")
  }
}
