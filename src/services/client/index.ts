import { Client } from "../../entities/Client";
import { tryFetchData } from "../common";
import { fetchDataProps } from "../common/FetchDataProps";
import { deleteClientProps, getClientsProps } from "./ClientServiceProps";

/** Gets clients from back-end */
export const getClients = async ({
    setReturnMessage,
}: getClientsProps): Promise<Client[]> => {

    const request: fetchDataProps = {
        url: `/client`,
        method: 'GET',
        body: {},
    };
    return await tryFetchData({
        setReturnMessage,
        request,
    });
};

export const deleteClient = async ({
    setReturnMessage,
    client_id,
    access_token,
}: deleteClientProps): Promise<Client[]> => {

    const request: fetchDataProps = {
        url: `/client/${client_id}`,
        method: 'DELETE',
        body: {},
        token: access_token,
    };
    return await tryFetchData({
        setReturnMessage,
        request,
    });
};