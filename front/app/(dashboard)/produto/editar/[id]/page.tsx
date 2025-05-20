"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import BreadCrumbs from "@/components/breadcrumbs"
import { getProduct, updateProduct } from "@/lib/api/product"
import type { Product } from "@/lib/types/product"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<Product>({})
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true)
      try {
        const productData = await getProduct(Number.parseInt(params.id))
        setProduct(productData)
        setName(productData.name || "")
        setPrice(productData.price || 0)
        setQuantity(productData.quantity || 0)
        setActive(productData.active || false)
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados do produto",
          description: error.message,
        })
        router.push("/produto")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProductData()
  }, [params.id, router, toast])

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateProduct(Number.parseInt(params.id), {
        name,
        price,
        quantity,
        active,
      })

      toast({
        title: "Produto atualizado com sucesso!",
        variant: "default",
      })

      router.push("/produto")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar produto",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePriceChange = (value: number) => {
    setPrice(Number(Math.max(0, value).toFixed(2)))
  }

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(0, Math.floor(value)))
  }

  return (
    <div className="w-full h-full flex flex-col p-12 gap-8">
      <h1 className="text-4xl font-bold">Editar Produto</h1>
      <BreadCrumbs />

      <form onSubmit={handleUpdateProduct} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-white-900 mb-1">Nome</label>
            <Input
              required
              className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
              placeholder="Digite o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Preço (R$)</label>
              <div className="flex gap-4 items-center">
                <Input
                  required
                  type="number"
                  step="0.01"
                  className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full hide-number-arrows"
                  value={price}
                  onChange={(e) => handlePriceChange(Number.parseFloat(e.target.value))}
                />
                <Button
                  type="button"
                  className="bg-red-to-white-100 text-white-800 hover:bg-red-to-white-300"
                  onClick={() => handlePriceChange(price - 1)}
                  disabled={price <= 0}
                >
                  -
                </Button>
                <Button
                  type="button"
                  className="bg-green-700 text-white-800 hover:bg-green-500"
                  onClick={() => handlePriceChange(price + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-white-900 mb-1">Quantidade</label>
              <div className="flex gap-4 items-center">
                <Input
                  required
                  type="number"
                  className="font-mono px-4 py-2 rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full hide-number-arrows"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value))}
                />
                <Button
                  type="button"
                  className="bg-red-to-white-100 text-white-800 hover:bg-red-to-white-300"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 0}
                >
                  -
                </Button>
                <Button
                  type="button"
                  className="bg-green-700 text-white-800 hover:bg-green-500"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={active} onCheckedChange={setActive} id="active-status" />
            <label htmlFor="active-status" className="text-white-900 cursor-pointer">
              Produto ativo
            </label>
          </div>
        </div>
        <Button type="submit" className="bg-purple-900 text-white-800 hover:bg-purple-700 w-max" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Salvar alterações"}
        </Button>
      </form>
    </div>
  )
}
