import { ToastMessage } from "../../components/Toast/ToastProps";

export interface LoginProps {
    username: string;
    password: string;
    setLoading: (loading: boolean) => void;
    setReturnMessage: (toastTessage: ToastMessage) => void;
    login?: () => void;
};

export interface JwtPayload {
    access_token: string;
    refresh_token: string;
};