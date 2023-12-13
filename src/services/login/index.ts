import { API_URL } from "../../common/constants";
import { LoginProps, Responses } from "./LoginProps";

const responses: Responses = {
    200: 'Login efetuado com sucesso',
    401: 'Usuário ou senha inválidos',
    404: 'Usuário ou senha inválidos',
    500: 'Erro interno do servidor',
};

export const logIn = async ({
    password,
    username,
    setLoading,
    setReturnMessage,
}: LoginProps): Promise<any> => {
    const loginUrl = `${API_URL}/login`;
    setLoading(true);

    try {
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (responses[response.status]) {
            setReturnMessage(responses[response.status]);
        } else {
            setReturnMessage('Unknown error');
        }

        if (response.ok) {
            const responseData = await response.json();
        }
    } catch (error) {
        if (error instanceof Error) {
            setReturnMessage('Unknown error');
        } else {
            setReturnMessage('Unknown error');
        }
    } finally {
        setLoading(false);
    }
};
