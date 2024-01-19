import { ToastMessage } from "../../components/Toast/ToastProps";

export interface getProductsProps {
    setReturnMessage: (toatsMessage: ToastMessage) => void;
};

export interface getClientProps {
    setReturnMessage: (toatsMessage: ToastMessage) => void;
    clientDocument: string;
};

export interface getWalletProps {
    setReturnMessage: (toatsMessage: ToastMessage) => void;
    clientId: number;
};

export interface sellProps {
    client_id: number,
    employee_id: number,
    price: number,
    product_id: number,
    quantity: number,
    isPayingFromWallet: boolean,
    setReturnMessage: (toatsMessage: ToastMessage) => void;
};

export interface getSelfEmployeeProps {
    setReturnMessage: (toatsMessage: ToastMessage) => void;
};