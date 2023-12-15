import { API_URL } from "../../common/constants";
import { LoginProps, JwtPayload, Responses } from "./LoginProps";

const responses: Responses = {
    200: 'Login efetuado com sucesso',
    401: 'Usuário ou senha inválidos',
    404: 'Usuário ou senha inválidos',
    500: 'Erro interno do servidor',
};

export const logInService = async ({
    password,
    username,
    setLoading,
    setReturnMessage,
    login,
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
            login();
            const responseData: JwtPayload = await response.json();
            localStorage.setItem('access_token', responseData.access_token);
            localStorage.setItem('refresh_token', responseData.refresh_token);
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
