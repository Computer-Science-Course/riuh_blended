import { ToastMessage } from "../../components/Toast/ToastProps";

export interface getProductsProps {
    setReturnMessage: React.Dispatch<React.SetStateAction<ToastMessage>>;
};

export interface getClientProps {
    setReturnMessage: React.Dispatch<React.SetStateAction<ToastMessage>>;
    clientDocument: string;
};

export interface getWalletProps {
    setReturnMessage: React.Dispatch<React.SetStateAction<ToastMessage>>;
    clientId: number;
};

export interface sellProps {
    client_id: number,
    employee_id: number,
    price: number,
    product_id: number,
    quantity: number,
    isPayingFromWallet: boolean,
    setReturnMessage: React.Dispatch<React.SetStateAction<ToastMessage>>;
};

export interface getSelfEmployeeProps {
    setReturnMessage: React.Dispatch<React.SetStateAction<ToastMessage>>;
};