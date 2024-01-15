import { API_URL } from "../../common/constants";
import { fetchData } from "../common";

export const refreshTokens = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await fetchData({
        url: `${API_URL}/refresh`,
        method: 'POST',
        body: {},
        token: refreshToken || '',
    });
    if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('access_token', responseData.access_token);
        localStorage.setItem('refresh_token', responseData.refresh_token);
    }
}