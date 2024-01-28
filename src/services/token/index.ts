import { API_URL } from "../../common/constants";
import { fetchData } from "../common";

export interface refreshTokensProps {
    accessToken: string;
    refreshToken: string;
}

export const refreshTokens = async (): Promise<refreshTokensProps | undefined> => {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await fetchData({
        url: `${API_URL}/refresh`,
        method: 'POST',
        body: {},
        token: refreshToken || '',
    });
    if (response.status === 200) {
        return await response.data;
        // localStorage.setItem('access_token', responseData.access_token);
        // localStorage.setItem('refresh_token', responseData.refresh_token);
    }
}