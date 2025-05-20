"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function BreadCrumbs() {
  const pathname = usePathname()

  // Skip rendering breadcrumbs on the root path
  if (pathname === "/") return null

  // Split the pathname into segments
  const segments = pathname.split("/").filter(Boolean)

  // Map segments to readable names
  const segmentNames: Record<string, string> = {
    caixa: "Caixa",
    cliente: "Freguês",
    produto: "Produto",
    funcionario: "Funcionário",
    carteira: "Carteira",
    relatorios: "Relatórios",
    criar: "Criar",
    editar: "Editar",
  }

  return (
    <div className="flex items-center gap-2 text-white-300 text-sm">
      <Link href="/" className="hover:text-white-900">
        Home
      </Link>

      {segments.map((segment, index) => {
        // Build the href for this segment
        const href = `/${segments.slice(0, index + 1).join("/")}`

        // Check if this is the last segment
        const isLast = index === segments.length - 1

        // If the segment is a number (ID), try to get the previous segment's name
        const displayName = !isNaN(Number(segment)) && index > 0 ? `#${segment}` : segmentNames[segment] || segment

        return (
          <div key={segment} className="flex items-center gap-2">
            <span>/</span>
            {isLast ? (
              <span className="text-white-900">{displayName}</span>
            ) : (
              <Link href={href} className="hover:text-white-900">
                {displayName}
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}
