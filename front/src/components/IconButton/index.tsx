import {
  Trash2Icon,
  PencilIcon,
  MoveLeftIcon,
  MoveRightIcon,
  LucideIcon,
} from 'lucide-react'

import { IconButtonProps, IconVariations } from './IconButtonProps';

const standard = 'flex items-center justify-center bg-transparent text-white-900 w-8 h-8 rounded-lg';
const hover = 'hover:bg-black-100';
const active = 'active:bg-white-500 active:text-white-0';

const iconVariants: Record<IconVariations, LucideIcon> = {
  delete: Trash2Icon,
  edit: PencilIcon,
  goToLeft: MoveLeftIcon,
  goToRight: MoveRightIcon,
}

const IconButton = ({
  icon = 'delete',
  onClick,
}: IconButtonProps): JSX.Element => {

  const Icon = iconVariants[icon];

  return (
    <button
      className={`${standard} ${hover} ${active}`}
      onClick={onClick}
    >
      <Icon size={24} />
    </button>
  )
}

export default IconButton;