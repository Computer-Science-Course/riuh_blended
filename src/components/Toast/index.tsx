import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastProps } from "./ToastProps";

const baseStyle = 'w-96 h-max flex flex-col font-sans text-base font-semibold text-white-800 rounded-md border-purple-900 absolute top-4 right-4 overflow-hidden';
const standardStyles = 'bg-purple-700';
const alertStyles = 'bg-yellow-900';
const greenStyles = 'bg-green-700';
const redStyles = 'bg-red-to-white-100';
const headerStyle = 'flex w-full justify-between p-4 break-all';
const progressBarStyle = 'h-1 w-0 bg-white-800 opacity-50';

const stylesByType = {
  standard: standardStyles,
  alert: alertStyles,
  green: greenStyles,
  red: redStyles,
};

const Toast = ({
  toastMessage,
  duration = 3,
  messageSetter,
}: ToastProps): JSX.Element => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;
    setTimeout(() => {
      setIsActive(false);
      if (messageSetter) messageSetter({ message: '', variation: 'standard' });
    }, duration * 1000);
  }, [isActive]);

  const toastStyles = stylesByType[toastMessage.variation];

  return (
    <>
      {isActive && <div className={`${baseStyle} ${toastStyles}`}>
        <div className={headerStyle}>
          <span>{toastMessage.message}</span>
          <span className="cursor-pointer">
            <X size={16} onClick={() => setIsActive(false)} />
          </span>
        </div>
        <div className={`${progressBarStyle} animate-[smaller_${duration}s_linear]`}></div>
      </div>}
    </>
  )
}

export default Toast;