import { useState } from 'react';

import { ChevronsUpDown } from 'lucide-react';

import { DropdownProps } from './DropdownProps';
import './styles.css';

const dropdownContainer: string = 'relative w-max';
const labelStyles: string = 'flex gap-1 text-white-900';
const requiredTagStyles: string = 'text-purple-900';
const dropdownButtonStyles: string = 'flex gap-10 justify-between items-center font-mono rounded-lg px-4 py-2 text-black-500 max-w-xs bg-white-700 hover:cursor-pointer font-semibold';
const dropdownListStyles: string = 'absolute -bottom-2 left-0 translate-y-full mt-100 w-max bg-white-700 rounded-lg max-h-60 overflow-y-auto z-10 no-scrollbar';

/** TODO: Close dropdown when value is selected. */
const Dropdown = ({
  children,
  value,
  label,
  required = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const fixStringLength = (str: string, limit: number) => {
    if (str.length > limit) {
      return str.slice(0, limit) + '...';
    }

    return str;
  };

  return (
    <div className={dropdownContainer}>
      {
        label &&
        <span className={labelStyles}>
          {label}
          {required && <span className={requiredTagStyles}>*</span>}
        </span>
      }
      <div className={dropdownButtonStyles} onClick={handleToggle} title={value}>
        <span>{fixStringLength(value, 20)}</span>
        <ChevronsUpDown size={24} />
      </div>
      {isOpen && (
        <ul className={dropdownListStyles} onClick={handleToggle}>
          {children}
        </ul>
      )}
    </div>
  );
};


export default Dropdown;