import { ItemProps } from "./ItemProps";

const dropdownItemStyles: string = 'px-4 py-2 text-black-500 hover:bg-white-300 hover:text-white-900 hover:cursor-pointer';

const Item = ({
  label,
  value,
  handleSelect,
}: ItemProps) => {
  return (
    <li className={dropdownItemStyles} onClick={() => handleSelect(value)}>
      {label}
    </li>
  )
}

export default Item;