import { TextFieldProps } from './TextFieldProps';

const containerStyles: string = 'flex flex-col text-white-900 gap-1';
const labelStyles: string = 'flex gap-1 w-max';
const requiredTagStyles: string = 'text-purple-900';
const inputStyles: string = 'font-mono rounded-lg px-4 py-2 placeholder:text-white-0 text-black-500 max-w-xs';

const TextField = ({
  label,
  placeholder,
  required = false,
  onChange,
  fullWidth = false,
}: TextFieldProps): JSX.Element => {

  return (
    <div className={`${containerStyles}  ${fullWidth && '!w-full'}`}>
      {
        label &&
        <span className={labelStyles}>
          {label}
          {required && <span className={requiredTagStyles}>*</span>}
        </span>
      }
      <input
        type='text'
        className={`${inputStyles}`}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onClick={(event) => (event.target as HTMLInputElement).select()}
      />
    </div >
  )
}

export default TextField;