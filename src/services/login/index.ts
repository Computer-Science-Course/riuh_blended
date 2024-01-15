import { API_URL } from "../../common/constants";
import { fetchData } from "../common";
import { responses } from "../common/FetchDataProps";
import { LoginProps, JwtPayload } from "./LoginProps";

const fetchToken = async (username: string, password: string) => {
    const loginUrl = `${API_URL}/login`;
    const token = localStorage.getItem('access_token');
    return await fetchData({
        url: loginUrl,
        method: 'POST',
        body: { username, password },
        token: token || '',
    });
}

export const logInService = async ({
    password,
    username,
    setLoading,
    setReturnMessage,
    login,
}: LoginProps): Promise<any> => {
    setLoading(true);

    try {
        const response = await fetchToken(username, password);
        console.log('response');

        if (responses[response.status]) {
            setReturnMessage({
                message: responses[response.status].message,
                variation: responses[response.status].variation,
            });
        } else {
            setReturnMessage({
                message: 'Unknown error',
                variation: 'red',
            });
        }

        if (response.ok) {
            login();
            const responseData: JwtPayload = await response.json();
            localStorage.setItem('access_token', responseData.access_token);
            localStorage.setItem('refresh_token', responseData.refresh_token);
        }
    } catch (error) {
        setReturnMessage({
            message: 'Unknown error',
            variation: 'red',
        });
    } finally {
        setLoading(false);
    }
};
