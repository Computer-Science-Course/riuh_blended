import {
  DollarSignIcon,
  CreditCardIcon,
  UserCircleIcon,
  UtensilsIcon,
  BookMinusIcon,
} from 'lucide-react'

import { MenuButtonProps } from './MenuButtonProps';

const iconStyles = {
  standard: 'flex justify-center items-center text-white-0 bg-transparent w-12 h-12',
  hover: 'hover:text-white-800 hover:bg-white-0',
  active: 'active:text-white-800 active:bg-white-400',
  selected: 'flex justify-center items-center text-black-700 bg-white-0 w-12 h-12',
};

const icons = {
  'cashier': DollarSignIcon,
  'client': CreditCardIcon,
  'employee': UserCircleIcon,
  'product': UtensilsIcon,
  'report': BookMinusIcon,
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const MenuButton = ({
  currentSelected = false,
  onClick,
  variation = 'cashier',
}: MenuButtonProps): JSX.Element => {
  const { active, hover, selected, standard } = iconStyles;
  const IconMenu = icons[variation];

  return (
    <button
      className={`${currentSelected ? selected : standard} ${hover} ${active}`}
      onClick={onClick}
      title={capitalize(variation)}
    >
      <IconMenu size={32} />
    </button>
  )
}

export default MenuButton;