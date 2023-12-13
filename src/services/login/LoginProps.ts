export interface LoginProps {
    username: string;
    password: string;
    setLoading: (loading: boolean) => void;
    setReturnMessage: (message: string) => void;
}

export interface Responses {
    [key: number]: string;
}