import { useState } from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { PasswordFieldProps } from './PasswordFieldProps';

const containerStyles: string = 'flex flex-col text-white-900 gap-1 w-full';
const labelStyles: string = 'flex gap-1 box-border';
const requiredTagStyles: string = 'text-purple-900';
const inputStyles: string = 'font-mono px-4 py-2 bg-white-700 rounded-l-lg placeholder:text-white-0 text-black-500 focus:outline-none w-full h-full';
const inputGroupStyles: string = 'flex items-center bg-white-700 rounded-lg w-full h-10';
const iconBoxStyles: string = 'flex h-full aspect-square items-center justify-center box-border rounded-r-lg';

const PasswordField = ({
  label,
  placeholder,
  required = false,
  onChange,
}: PasswordFieldProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={containerStyles}>
      {
        label &&
        <span className={labelStyles}>
          {label}
          {required && <span className={requiredTagStyles}>*</span>}
        </span>
      }
      <span className={inputGroupStyles}>
        <input
          type={showPassword ? 'text' : 'password'}
          className={inputStyles}
          placeholder={placeholder}
          required={required}
          onChange={(event) => onChange && onChange(event.target.value)}
        />
        <span className={iconBoxStyles}>
          {
            showPassword ?
              <EyeIcon
                size={24}
                color='#000'
                cursor='pointer'
                onClick={() => setShowPassword(!showPassword)}
              />
              :
              <EyeOffIcon
                size={24}
                color='#000'
                cursor='pointer'
                onClick={() => setShowPassword(!showPassword)}
              />
          }
        </span>
      </span>
    </div >
  )
}

export default PasswordField;