"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
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
import { getProducts, deleteProduct } from "@/lib/api/product"
import type { Product } from "@/lib/types/product"
import { useAuth } from "@/lib/auth-context"
import { Search } from "lucide-react"

export default function ProductPage() {
  const router = useRouter()

  const { currentUser } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchField, setSearchField] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<number | undefined>(undefined)
  const [password, setPassword] = useState("")

  const handleGetProducts = async () => {
    setIsLoading(true)
    try {
      const productsData = await getProducts()
      setProducts(productsData)
    } catch (error: any) {
      toast.error("Erro ao carregar produtos", {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProduct = async () => {
    if (!selectedProductId) return

    setIsLoading(true)
    try {
      await deleteProduct(selectedProductId, password)
      toast.success("Produto deletado com sucesso!")
      setProducts((prev) => prev.filter((product) => product.id !== selectedProductId))
      setShowConfirmModal(false)
    } catch (error: any) {
      toast.error("Erro ao deletar produto", {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
      setPassword("")
    }
  }

  useEffect(() => {
    handleGetProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    if (searchField === "") return true

    return product.name?.toLowerCase().includes(searchField.toLowerCase())
  })

  return (
    <div className="w-full h-full flex flex-col p-12 gap-8">
      <h1 className="text-4xl font-bold">Produtos</h1>
      <BreadCrumbs />

      <section className="flex gap-40">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Input
              className="font-mono rounded-lg placeholder:text-white-0 text-black-500 bg-white-700 w-full"
              placeholder="Digite o nome do produto"
              onChange={(e) => setSearchField(e.target.value)}
              disabled={products.length === 0}
              icon={<Search />}
            />
          </div>

          <div className="flex flex-col h-96 overflow-y-auto gap-4 p-2 pr-12 scrollbar-thin scrollbar-thumb-white-200 scrollbar-track-black-0 scrollbar-rounded-lg scrollbar-track-rounded-lg">
            {filteredProducts.map((product) => (
              <CRUDListItem
                key={product.id}
                title={product.name || ""}
                description={`R$ ${product.price?.toFixed(2)} | Qtd: ${product.quantity}`}
                onClickDelete={() => {
                  setSelectedProductId(product.id)
                  setShowConfirmModal(true)
                }}
                onClickEdit={() => router.push(`/produto/editar/${product.id}`)}
              />
            ))}
            {filteredProducts.length === 0 && <p className="text-white-300">Nenhum produto encontrado</p>}
          </div>
        </div>
      </section>

      <Button
        onClick={() => router.push("/produto/criar")}
        disabled={isLoading}
        className="bg-purple-900 text-white-800 hover:bg-purple-700 w-max"
      >
        Criar novo produto
      </Button>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="bg-white-800 text-black-900">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>Você tem certeza que deseja deletar esse produto?</DialogDescription>
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
              onClick={handleDeleteProduct}
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
