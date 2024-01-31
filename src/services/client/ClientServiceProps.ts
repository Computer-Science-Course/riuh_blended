import { ToastMessage } from "../../components/Toast/ToastProps";

/** Get clients props. */
export interface getClientsProps {
    /** Get clients props. */
    setReturnMessage: React.Dispatch<React.SetStateAction<ToastMessage>>;
};

/** Delete client props. */
export interface deleteClientProps {
    /** Get clients props. */
    setReturnMessage: React.Dispatch<React.SetStateAction<ToastMessage>>;
    /** Client to be deleted. */
    client_id: number | undefined;
};