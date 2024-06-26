import { fetchData } from "../common";
import { responses } from "../common/FetchDataProps";
import { LoginProps, JwtPayload } from "./LoginProps";

export const fetchTokens = async (username: string, password: string) => {
    const loginUrl = `/login`;
    return await fetchData({
        url: loginUrl,
        method: 'POST',
        body: { username, password },
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

    let response = undefined;
    try {
        response = await fetchTokens(username, password);

        if (response.status === 200) {
            if (login) login();
            const responseData: JwtPayload = await response.data;
            localStorage.setItem('access_token', responseData.access_token);
            localStorage.setItem('refresh_token', responseData.refresh_token);
            setReturnMessage({
                message: response.statusText,
                variation: responses[response.status].variation,
            });
        }
    } catch (error: any) {
        if (error.response) {
            setReturnMessage({
                message: responses[error.response.status].message,
                variation: responses[error.response.status].variation,
            });
        } else {
            setReturnMessage({
                message: 'Unknown error',
                variation: 'red',
            });
        }
    } finally {
        setLoading(false);
        return response;
    }

};
