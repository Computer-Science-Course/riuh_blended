import { ToastMessage } from "../../components/Toast/ToastProps";

type method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface fetchDataProps {
    url: string;
    method: method;
    body: Record<string, string | number>;
    token: string;
}

export interface tryFetchDataProps {
    setReturnMessage: (toatsMessage: ToastMessage) => void;
    request: fetchDataProps;
    okayMessage?: string;
}

export interface Responses {
    [key: number]: ToastMessage;
};

export const responses: Responses = {
    200: {
        message: 'Operação realizada com sucesso.',
        variation: 'green',
    },
    401: {
        message: 'Credenciais inválidas.',
        variation: 'red',
    },
    404: {
        message: 'Dados não encontrados.',
        variation: 'red',
    },
    500: {
        message: 'Erro interno.',
        variation: 'red',
    },
};