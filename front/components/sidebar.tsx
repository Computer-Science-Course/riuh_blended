"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  Users,
  Package,
  UserCircle2,
  Wallet,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  // Save sidebar state in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebar-collapsed")
      if (savedState !== null) {
        setIsCollapsed(savedState === "true")
      }
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-collapsed", String(newState))
    }
  }

  const menuItems = [
    {
      name: "Caixa",
      icon: <ShoppingCart size={24} />,
      path: "/caixa",
    },
    {
      name: "Freguês",
      icon: <Users size={24} />,
      path: "/cliente",
    },
    {
      name: "Produtos",
      icon: <Package size={24} />,
      path: "/produto",
    },
    {
      name: "Funcionários",
      icon: <UserCircle2 size={24} />,
      path: "/funcionario",
    },
    {
      name: "Carteira",
      icon: <Wallet size={24} />,
      path: "/carteira",
    },
    {
      name: "Relatórios",
      icon: <BarChart3 size={24} />,
      path: "/relatorios",
    },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center mb-8">
          {!isCollapsed && <h2 className="text-2xl font-bold">Riuh</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white-900 hover:bg-black-500 hidden md:flex"
            aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path} onClick={() => isMobile && setIsOpen(false)}>
              <div
                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                  pathname === item.path || pathname.startsWith(`${item.path}/`)
                    ? "bg-purple-900 text-white-800"
                    : "hover:bg-black-500"
                }`}
                aria-current={pathname === item.path || pathname.startsWith(`${item.path}/`) ? "page" : undefined}
              >
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-black-500 text-white-900 w-full justify-start"
        onClick={logout}
        aria-label="Sair do sistema"
      >
        <LogOut size={24} />
        {!isCollapsed && <span>Sair</span>}
      </Button>
    </div>
  )

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden fixed top-4 left-4 z-50 text-white-900 hover:bg-black-500"
              aria-label="Abrir menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-black-700 border-black-400 text-white-900 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  // Desktop sidebar
  return (
    <div
      className={`h-full rounded-lg bg-black-700 border border-black-400 text-white-900 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <SidebarContent />
    </div>
  )
}
