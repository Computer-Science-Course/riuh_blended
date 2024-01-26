import { SearchIcon } from 'lucide-react';

import { SearchFieldProps } from './SearchFieldProps';

const containerStyles: string = 'flex flex-col text-white-900 gap-1';
const labelStyles: string = 'flex gap-1';
const requiredTagStyles: string = 'text-purple-900';
const inputStyles: string = 'font-mono px-4 py-2 placeholder:text-white-0 text-black-500 max-w-xs w-full rounded-lg focus:outline-none';
const inputGroupStyles: string = 'flex gap-1 items-center bg-white-900 rounded-lg px-2 w-max';

const SearchField = ({
  label,
  placeholder,
  required = false,
  onChange
}: SearchFieldProps): JSX.Element => {


  return (
    <div className={containerStyles}>
      {
        label &&
        <span className={labelStyles}>
          {label}
          {required && <span className={requiredTagStyles}>*</span>}
        </span>
      }
      <span className={inputGroupStyles} title={placeholder}>
        <input
          type='text'
          className={inputStyles}
          placeholder={placeholder}
          required={required}
          onChange={(event) => onChange && onChange(event.target.value)}
        />
        <SearchIcon
          size={24}
          color='#000'
        />
      </span>
    </div >
  )
}

export default SearchField;