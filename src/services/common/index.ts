import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { refreshTokens } from "../token";
import { fetchDataProps, responses, tryFetchDataProps } from "./FetchDataProps";
import { ToastMessage } from "../../components/Toast/ToastProps";

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

interface retryFetchDataProps {
    error: any;
    request: fetchDataProps;
    setReturnMessage: React.Dispatch<React.SetStateAction<ToastMessage>>;
}

const retryFetchData = async ({
    error,
    request,
    setReturnMessage,
}: retryFetchDataProps) => {
    let responseData = undefined;

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
                // Make logout
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
    } finally {
        return responseData;
    }
}

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
        const statusCode = error.response.status;
        if (statusCode) {
            if (error.response.status == 401) {
                retryFetchData({
                    error,
                    request,
                    setReturnMessage,
                })
            } else if (Object.keys(responses).includes(`${statusCode}`)) {
                setReturnMessage({
                    message: responses[error.response.status].message,
                    variation: responses[error.response.status].variation,
                });
            } else {
                setReturnMessage({
                    message: error.response.data.message,
                    variation: 'red',
                });
            }
        }
         else {
            setReturnMessage({
                message: 'Unknown error',
                variation: 'red',
            });
        }
    } finally {
        return responseData;
    }
}