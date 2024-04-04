import { Loader2 } from 'lucide-react'

import { ButtonProps, ButtonStyles } from './ButtonProps';

const styles: ButtonStyles = {
  standard: {
    standard: 'flex justify-center items-center font-sans text-base font-semibold text-white-800 bg-purple-900 px-4 py-2 rounded-lg border-purple-900 w-max',
    hover: 'hover:cursor-pointer hover:border-white-0',
    active: 'active:bg-white-0',
    disabled: 'disabled:bg-black-100 disabled:text-purple-900 disabled:cursor-auto',
  },
  alert: {
    standard: 'flex justify-center items-center font-sans text-base font-semibold text-white-800 bg-yellow-700 px-4 py-2 rounded-lg border-purple-900 w-max',
    hover: 'hover:cursor-pointer hover:border-white-0',
    active: 'active:bg-yellow-900',
    disabled: 'disabled:bg-black-100 disabled:text-purple-900 disabled:cursor-auto',
  },
  green: {
    standard: 'flex justify-center items-center font-sans text-base font-semibold text-white-800 bg-green-700 px-4 py-2 rounded-lg border-purple-900 w-max',
    hover: 'hover:cursor-pointer hover:border-white-0',
    active: 'active:bg-green-500',
    disabled: 'disabled:bg-black-100 disabled:text-purple-900 disabled:cursor-auto',
  },
  red: {
    standard: 'flex justify-center items-center font-sans text-base font-semibold text-white-800 bg-red-to-white-100 px-4 py-2 rounded-lg border-purple-900 w-max',
    hover: 'hover:cursor-pointer hover:border-white-0',
    active: 'active:bg-red-to-white-300',
    disabled: 'disabled:bg-black-100 disabled:text-purple-900 disabled:cursor-auto',
  },
}

const Button = ({
  disabledStatus,
  loading,
  label = '',
  variation = 'standard',
  onClick,
  fullWidth,
}: ButtonProps): JSX.Element => {

  const { standard, hover, active, disabled } = styles[variation];

  return (
    <button
      type='button'
      className={`${standard} ${hover} ${active} ${disabled} ${fullWidth && '!w-full'}`}
      disabled={disabledStatus}
      onClick={onClick}
    >
      {loading ? <Loader2 className='animate-spin' /> : label}
    </button>
  )
}

export default Button;