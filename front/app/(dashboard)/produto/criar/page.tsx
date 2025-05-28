"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BreadCrumbs from "@/components/breadcrumbs"
import { createProduct } from "@/lib/api/product"

export default function CreateProductPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createProduct({
        name,
        price,
        quantity,
      })

      toast({
        title: "Produto criado com sucesso!",
        variant: "default",
      })

      router.push("/produto")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar produto",
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
      <h1 className="text-4xl font-bold">Criar Produto</h1>
      <BreadCrumbs />

      <form onSubmit={handleCreateProduct} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-white-900 mb-1">Nome</label>
            <Input
              required
              className="font-mono rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
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
                  className="font-mono rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full hide-number-arrows"
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
                  className="font-mono rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full hide-number-arrows"
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
        </div>
        <Button type="submit" className="bg-purple-900 text-white-800 hover:bg-purple-700 w-max" disabled={isLoading}>
          {isLoading ? "Criando..." : "Criar produto"}
        </Button>
      </form>
    </div>
  )
}
