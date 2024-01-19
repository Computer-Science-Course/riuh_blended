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

    const requestOptions: RequestInit = {
        method: method,
        headers: headers,
    };

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);
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

        if (response.ok) {
            responseData = await response.json();
            if (okayMessage) {
                setReturnMessage({
                    message: okayMessage,
                    variation: responses[response.status].variation,
                });
            }
        } else if (response.status === 401) {
            await refreshTokens();
            const response = await fetchData(request);
            if (response.ok) {
                responseData = await response.json();
            } else {
                setReturnMessage({
                    message: responses[response.status].message,
                    variation: responses[response.status].variation,
                });
                // To do: logout from here
            }
        } else if (response.status === 403) {
            console.log(response);
            setReturnMessage({
                message: 'batata',
                variation: responses[response.status].variation,
            });
        } else {
            setReturnMessage({
                message: responses[response.status].variation,
                variation: responses[response.status].variation,
            });
        }
    } catch (error) {
        setReturnMessage({
            message: 'Unknown error',
            variation: 'red',
        });
    } finally {
        return responseData;
    }
}