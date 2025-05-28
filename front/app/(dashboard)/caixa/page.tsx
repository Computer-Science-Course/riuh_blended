"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { UserCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BreadCrumbs from "@/components/breadcrumbs"
import { getProducts, getClientByDocument, getWallet, sell, getSelfEmployee } from "@/lib/api/cashier"
import type { Product } from "@/lib/types/product"
import type { Client } from "@/lib/types/client"
import type { Wallet } from "@/lib/types/wallet"
import { toast } from "sonner"

const convertToBrazilianCurrency = (value: number) => (
  value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
)

export default function CashierPage() {
  const [isFastCashier, setIsFastCashier] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPayingFromWallet, setIsPayingFromWallet] = useState(false)
  const [client, setClient] = useState<Client>({
    active: false,
    registration: "",
    name: "",
    id: undefined,
  })
  const [wallet, setWallet] = useState<Wallet>({})
  const [clientDocument, setClientDocument] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product>({})

  // Get all products when page is loaded
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const loadedProducts = await getProducts()
        setProducts(loadedProducts)
        if (loadedProducts.length > 0) {
          setSelectedProduct(loadedProducts[0])
        }
      } catch (error: any) {
        toast.error("Erro ao carregar produtos")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [toast])

  // Perform a sell when client changes and "fast cashier" is on
  useEffect(() => {
    if (client.id && isFastCashier && selectedProduct.id) {
      handleSell()
    }
  }, [client.id, isFastCashier, selectedProduct.id])

  // Get new wallet when client changes
  useEffect(() => {
    const fetchWallet = async () => {
      if (client.id) {
        try {
          const walletData = await getWallet(client.id)
          setWallet(walletData)
        } catch (error: any) {
          toast.error("Erro ao carregar carteira")
        }
      }
    }

    fetchWallet()
  }, [client, toast])

  // Get client info when client document changes and "fast cashier" is on
  useEffect(() => {
    if (isFastCashier && clientDocument.trim()) {
      handleGetClient()
    }
  }, [clientDocument, isFastCashier])

  const handleGetClient = async () => {
    setIsLoading(true)
    try {
      const clientData = await getClientByDocument(clientDocument)
      if (clientData) {
        setClient(clientData)
      } else {
        setClient({
          active: false,
          registration: "",
          name: "",
          id: undefined,
        })
      }
    } catch (error: any) {
      toast.error("Erro ao buscar cliente")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSell = async () => {
    if (!client.id || !selectedProduct.id) return

    setIsLoading(true)
    try {
      const employee = await getSelfEmployee()
      await sell({
        client_id: client.id,
        employee_id: employee.id!,
        product_id: selectedProduct.id!,
        price: selectedProduct.price!,
        quantity: 1,
        isPayingFromWallet,
      })

      toast.success("Venda efetuada com sucesso!")

      if (isPayingFromWallet) {
        // Refresh client data to update wallet balance
        handleGetClient()
      }
    } catch (error: any) {
      toast.error("Erro ao realizar venda")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col p-12 gap-8">
      <h1 className="text-4xl font-bold">Caixa</h1>
      <BreadCrumbs />

      <section className="flex gap-40">
        <div className="flex flex-col gap-4">
          <Select
            value={selectedProduct.id?.toString()}
            onValueChange={(value) => {
              const product = products.find((p) => p.id === Number.parseInt(value))
              if (product) setSelectedProduct(product)
            }}
            disabled={products.length === 0}
          >
            <SelectTrigger className="w-[280px] bg-white-700 text-black-500 font-mono font-semibold">
              <SelectValue placeholder="Selecione um produto" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id?.toString() || ""}>
                  {product.name} | R${product.price?.toFixed(2)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <form className="flex gap-4 items-end">
            <Input
              className="font-mono rounded-lg placeholder:text-white-0 text-black-500 bg-white-700"
              placeholder="Documento"
              onChange={(e) => setClientDocument(e.target.value)}
            />
            <Button
              onClick={handleGetClient}
              disabled={isFastCashier || isLoading}
              className="bg-green-700 text-white-800 hover:bg-green-500"
            >
              +
            </Button>
          </form>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="fast-cashier"
              checked={isFastCashier}
              onCheckedChange={(checked) => setIsFastCashier(checked as boolean)}
            />
            <label htmlFor="fast-cashier" className="text-white-900 cursor-pointer">
              Caixa rápido
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="wallet-payment"
              checked={isPayingFromWallet}
              onCheckedChange={(checked) => setIsPayingFromWallet(checked as boolean)}
            />
            <label htmlFor="wallet-payment" className="text-white-900 cursor-pointer">
              Pagar com a carteirinha
            </label>
          </div>
        </div>

        <div className="flex flex-col p-4 border border-purple-600 border-solid rounded-lg">
          <span className="flex gap-6">
            <span className="flex flex-col gap-2 w-72">
              <div>
                <label className="text-white-0" >Nome</label>
                {
                  client.name ?
                    <p className="text-2xl">{client.name}</p>
                    :
                    <p className="text-black-100">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . </p>
                }
              </div>

              <div>
                <label className="text-white-0" >Curso</label>
                {
                  client.course ?
                    <p className="text-2xl">{client.course}</p>
                    :
                    <p className="text-black-100">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . </p>
                }
              </div>

              <div>
                <label className="text-white-0" >Saldo</label>
                {
                  wallet.balance ?
                    <p className="text-2xl">R$ {convertToBrazilianCurrency(wallet.balance)}</p>
                    :
                    <p className="text-black-100">. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . </p>

                }
              </div>
            </span>

            <span className="bg-purple-600 w-px rounded-full"></span>

            <span className="flex flex-col justify-center items-center gap-2.5 text-purple-600">
              <UserCircle2 size={100} strokeWidth={.5} />
              <p>//// /// ////</p>
            </span>
          </span>
        </div>
      </section>

      <Button
        onClick={handleSell}
        disabled={isLoading || !(client.name && selectedProduct.name)}
        className="bg-purple-900 text-white-800 hover:bg-purple-700 w-max"
      >
        {isLoading ? "Processando..." : "Realizar venda"}
      </Button>
    </div>
  )
}
