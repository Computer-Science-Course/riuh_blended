import { API_URL } from "../../common/constants";
import { fetchData } from "../common";

export interface refreshTokensProps {
    accessToken: string;
}

export const refreshTokens = async (): Promise<refreshTokensProps | undefined> => {
    const response = await fetchData({
        url: `${API_URL}/refresh`,
        method: 'POST',
        body: {},
        tokenType: 'refresh_token',
    });
    if (response.status === 200) {
        const responseData = await response.data;
        const tokens: refreshTokensProps = {
            accessToken: responseData.access_token,
        }
        localStorage.setItem('access_token', tokens.accessToken);
        return tokens;
    }
}