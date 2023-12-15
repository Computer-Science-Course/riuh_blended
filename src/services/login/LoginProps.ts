export interface LoginProps {
    username: string;
    password: string;
    setLoading: (loading: boolean) => void;
    setReturnMessage: (message: string) => void;
    login: () => void;
};

export interface Responses {
    [key: number]: string;
};

export interface JwtPayload {
    access_token: string;
    refresh_token: string;
};