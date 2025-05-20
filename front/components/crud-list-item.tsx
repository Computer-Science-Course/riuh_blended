"use client"

import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

type CRUDListItemProps = {
  title: string
  description: string
  onClickEdit?: () => void
  onClickDelete?: () => void
}

export default function CRUDListItem({ title, description, onClickEdit, onClickDelete }: CRUDListItemProps) {
  return (
    <div className="flex items-center justify-between bg-black-500 rounded-lg p-4 w-[500px]">
      <div className="flex flex-col">
        <h3 className="text-white-900 font-semibold">{title}</h3>
        <p className="text-white-300 text-sm">{description}</p>
      </div>
      <div className="flex gap-2">
        {onClickEdit && (
          <Button variant="ghost" size="icon" onClick={onClickEdit} className="text-white-900 hover:bg-black-400">
            <Pencil size={20} />
          </Button>
        )}
        {onClickDelete && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClickDelete}
            className="text-red-to-white-100 hover:bg-black-400"
          >
            <Trash2 size={20} />
          </Button>
        )}
      </div>
    </div>
  )
}
