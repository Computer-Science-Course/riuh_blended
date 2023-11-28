import { useState } from 'react';

import { ChevronsUpDown } from 'lucide-react';

import { DropdownProps } from './DropdownProps';
import './styles.css';

const dropdownContainer: string = 'relative w-max';
const labelStyles: string = 'flex gap-1';
const requiredTagStyles: string = 'text-purple-900';
const dropdownButtonStyles: string = 'flex gap-10 justify-between items-center font-mono rounded-lg px-4 py-2 text-black-500 max-w-xs bg-white-700 hover:cursor-pointer font-semibold';
const dropdownListStyles: string = 'absolute -bottom-2 left-0 translate-y-full mt-100 w-max bg-white-700 rounded-lg max-h-60 overflow-y-auto z-10';
const dropdownItemStyles: string = 'px-4 py-2 hover:bg-white-300 hover:text-white-900 hover:cursor-pointer';

const Dropdown = ({
  onChange,
  options,
  label,
  required = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const fixStringLength = (str: string, limit: number) => {
    if (str.length > limit) {
      return str.slice(0, limit) + '...';
    }

    return str;
  };

  const handleSelect = (selectedValue: string) => {
    setIsOpen(false);
    setCurrentValue(selectedValue);
    onChange(selectedValue);
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
      <div className={dropdownButtonStyles} onClick={handleToggle} title={currentValue}>
        <span>{fixStringLength(currentValue, 20)}</span>
        <ChevronsUpDown size={24} />
      </div>
      {isOpen && (
        <ul className={`${dropdownListStyles} no-scrollbar`}>
          {options.map((option) => (
            <li key={option} className={dropdownItemStyles} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default Dropdown;