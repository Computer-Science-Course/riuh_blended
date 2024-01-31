import { AxiosRequestConfig, AxiosResponse } from "axios";
import { fetchDataProps, responses, tryFetchDataProps } from "./FetchDataProps";
import useAxiosPrivate from "../../hooks/usePrivateAuth";

export const fetchData = async ({
    body = {},
    method,
    url,
}: fetchDataProps) => {
    const token = localStorage.getItem('access_token');
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

    const response: AxiosResponse = await useAxiosPrivate().request(axiosConfig);
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
        if (okayMessage) {
            setReturnMessage({
                message: okayMessage,
                variation: responses[response.status].variation,
            });
        }
        /** TODO: Type it. */
    } catch (error: any) {
        setReturnMessage({
            message: 'Unknown error',
            variation: 'red',
        });
    } finally {
        return responseData;
    }
}