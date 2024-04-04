export type toastType = 'standard' | 'green' | 'red' | 'alert';

export interface ToastMessage {
    message: string;
    variation: toastType;
}

export interface ToastProps {
    toastMessage: ToastMessage;
    duration?: number;
    messageSetter?: (toastMessage: ToastMessage) => void;
}

