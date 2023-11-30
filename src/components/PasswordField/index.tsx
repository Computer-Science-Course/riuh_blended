import { useState } from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { PasswordFieldProps } from './PasswordFieldProps';

const containerStyles: string = 'flex flex-col text-white-900 gap-1';
const labelStyles: string = 'flex gap-1';
const requiredTagStyles: string = 'text-purple-900';
const inputStyles: string = 'font-mono px-4 py-2 placeholder:text-white-0 text-black-500 max-w-xs focus:outline-none';
const inputGroupStyles: string = 'flex gap-1 items-center bg-white-900 rounded-lg px-2 w-max';

const PasswordField = ({
  label,
  placeholder,
  required = false,
  storeFieldValue,
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
          onChange={(event) => storeFieldValue && storeFieldValue(event.target.value)}
        />
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
    </div >
  )
}

export default PasswordField;