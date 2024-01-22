import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { refreshTokens } from "../token";
import { fetchDataProps, responses, tryFetchDataProps } from "./FetchDataProps";

export const fetchData = async ({
    body = {},
    method,
    token,
    url,
}: fetchDataProps) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const axiosConfig: AxiosRequestConfig = {
        method: method,
        url: url,
        headers: headers,
    };

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        axiosConfig.data = body;
    }

    const response: AxiosResponse = await axios(axiosConfig);
    return response;
};

export const tryFetchData = async ({
    setReturnMessage,
    request,
    okayMessage,
}: tryFetchDataProps): Promise<any> => {
    let responseData = undefined;

    try {
        const response = await fetchData(request);
        responseData = await response.data;
        setReturnMessage({
            message: okayMessage,
            variation: responses[response.status].variation,
        });
        /** TODO: Type it. */
    } catch (error: any) {
        if (error.response) {
            /** TODO: Change it to a retry function. */
            try {
                if (error.response.status === 401) {
                    await refreshTokens();
                    const response = await fetchData(request);
                    responseData = await response.data;
                } else if (error.response.status === 403) {
                    setReturnMessage({
                        message: error.response.data.message,
                        variation: 'red',
                    });
                }
            } catch (error: any) {
                if (error.response) {
                    if (error.response.status === 401) {
                        console.log('Need to sign in again');
                    }
                    setReturnMessage({
                        message: error.response.data.message,
                        variation: 'red',
                    });
                } else {
                    setReturnMessage({
                        message: 'Unknown error',
                        variation: 'red',
                    });
                }
            }
        } else {
            setReturnMessage({
                message: 'Unknown error',
                variation: 'red',
            });
        }
    } finally {
        return responseData;
    }
}