import { Check } from 'lucide-react';

import { CheckboxProps } from './CheckboxProps';

const containerStyles = 'flex gap-3 items-center text-white-900 cursor-pointer w-max';
const standartStyle = 'flex justify-center items-center w-4 h-4 rounded bg-white-200';
const checkedStyle = '!bg-purple-900 text-white-200';

const Checkbox = ({
  label,
  onChange,
  checked = false,
}: CheckboxProps) => {
  return (
    <div
      className={containerStyles}
      onClick={() => { onChange && onChange(!checked) }}
    >
      <button
        className={`${standartStyle} ${checked && checkedStyle}`}
      >
        {checked && <Check />}
      </button >
      {label}
    </div>
  );
};


export default Checkbox;