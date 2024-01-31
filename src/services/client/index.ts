import { Client } from "../../entities/Client";
import { tryFetchData } from "../common";
import { fetchDataProps } from "../common/FetchDataProps";
import { getClientsProps } from "./ClientServiceProps";

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