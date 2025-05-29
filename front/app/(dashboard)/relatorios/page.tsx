"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BreadCrumbs from "@/components/breadcrumbs"
import { api } from "@/lib/api"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import DatePicker from "@/components/date-picker"

type ReportData = {
  totalSales: number
  totalRevenue: number
  topProducts: {
    name: string
    quantity: number
    revenue: number
  }[]
  topClients: {
    name: string
    purchases: number
    spent: number
  }[]
  salesByDay: {
    date: string
    sales: number
    revenue: number
  }[]
}

export default function ReportsPage() {

  const [isLoading, setIsLoading] = useState(false)
  const [reportType, setReportType] = useState("daily")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [reportData, setReportData] = useState<ReportData | null>(null)

  useEffect(() => {
    // Set default dates (current month)
    const today = new Date()
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)

    setEndDate(today)
    setStartDate(firstDay)
  }, [])

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      toast.error("Datas inválidas", {
        description: "Por favor, selecione datas válidas para o relatório",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await api.get(`/reports/${reportType}`, {
        start_date: startDate,
        end_date: endDate,
      })

      setReportData(response.data)
    } catch (error: any) {
      toast.error("Erro ao gerar relatório", {
        description: error.response?.data?.message || "Ocorreu um erro ao gerar o relatório",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col p-12 gap-8">
      <h1 className="text-4xl font-bold">Relatórios</h1>
      <BreadCrumbs />

      <div className="flex flex-col gap-4 w-60">
        <div>
          <label className="block text-white-900 mb-1">Tipo de Relatório</label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[200px] bg-white-700 text-black-500 font-mono font-semibold">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diário</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-white-900 mb-1">Data Inicial</label>
          <DatePicker
            date={startDate}
            setDate={setStartDate}
          />
        </div>
        <div>
          <label className="block text-white-900 mb-1">Data Final</label>
          <DatePicker
            date={endDate}
            setDate={setEndDate}
          />
        </div>
        <Button
          onClick={handleGenerateReport}
          disabled={isLoading}
          className="bg-purple-900 text-white-800 hover:bg-purple-700 w-max"
        >
          {isLoading ? "Gerando..." : "Gerar Relatório"}
        </Button>
      </div>

      {reportData && (
        <div className="mt-8 grid grid-cols-2 gap-8">
          <div className="bg-black-500 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Resumo</h2>
            <div className="flex flex-col gap-2">
              <p>Total de Vendas: {reportData.totalSales}</p>
              <p>Receita Total: R$ {reportData.totalRevenue.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-black-500 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Produtos Mais Vendidos</h2>
            <div className="flex flex-col gap-2">
              {reportData.topProducts.map((product, index) => (
                <div key={index} className="flex justify-between">
                  <span>{product.name}</span>
                  <span>
                    {product.quantity} unidades - R$ {product.revenue.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black-500 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Clientes Mais Frequentes</h2>
            <div className="flex flex-col gap-2">
              {reportData.topClients.map((client, index) => (
                <div key={index} className="flex justify-between">
                  <span>{client.name}</span>
                  <span>
                    {client.purchases} compras - R$ {client.spent.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black-500 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Vendas por Período</h2>
            <div className="flex flex-col gap-2">
              {reportData.salesByDay.map((day, index) => (
                <div key={index} className="flex justify-between">
                  <span>{new Date(day.date).toLocaleDateString("pt-BR")}</span>
                  <span>
                    {day.sales} vendas - R$ {day.revenue.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
