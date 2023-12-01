import { CalendarProps } from './CalendarProps';

const dropdownContainer: string = 'relative w-max';
const labelStyles: string = 'flex gap-1 text-white-900';
const requiredTagStyles: string = 'text-purple-900';
const inputStyles: string = 'flex py-1 px-2 rounded-md font-mono font-semibold w-48';

const Calendar = ({
  storeFieldValue,
  label,
  required = false,
}: CalendarProps) => {

  return (
    <div className={dropdownContainer}>
      {
        label &&
        <span className={labelStyles}>
          {label}
          {required && <span className={requiredTagStyles}>*</span>}
        </span>
      }
      <input
        type='date'
        onChange={(event) => storeFieldValue && storeFieldValue(event.target.value)}
        className={`${inputStyles}`}
      />
    </div>
  );
};


export default Calendar;