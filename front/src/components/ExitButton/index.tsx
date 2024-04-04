import { LogOutIcon } from 'lucide-react'

import { ExitButtonProps } from './ExitButtonProps';

const iconStyles = {
  standard: 'flex justify-center items-center text-red-to-black-0 bg-red-to-black-500 w-12 h-12',
  hover: 'hover:text-red-to-black-800 hover:bg-red-to-black-200',
  active: 'active:text-red-to-white-200 active:bg-red-to-white-500',
}

const ExitButton = ({
  onClick,
}: ExitButtonProps): JSX.Element => {
  const { active, hover, standard } = iconStyles;

  return (
    <button
      className={`${active} ${hover} ${standard}`}
      onClick={onClick}
    >
      <LogOutIcon size={32} />
    </button>
  )
}

export default ExitButton;