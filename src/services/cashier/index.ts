import { API_URL } from "../../common/constants";
import { Client } from "../../entities/Client";
import { Employee } from "../../entities/Employee";
import { Product } from "../../entities/Product";
import { Wallet } from "../../entities/Wallet";
import { tryFetchData } from "../common";
import { fetchDataProps } from "../common/FetchDataProps";
import {
    getClientProps,
    getProductsProps,
    getSelfEmployeeProps,
    getWalletProps,
    sellProps,
} from "./CashierServiceProps";

export const getProducts = async ({
    setReturnMessage,
}: getProductsProps): Promise<Product[]> => {

    const token = localStorage.getItem('access_token');
    const request: fetchDataProps = {
        url: `${API_URL}/product`,
        method: 'GET',
        body: {},
        token: token || '',
    }
    return await tryFetchData({
        setReturnMessage,
        request,
    });
};


export const getClient = async ({
    clientDocument,
    setReturnMessage,
}: getClientProps): Promise<Client> => {

    const token = localStorage.getItem('access_token');
    const request: fetchDataProps = {
        url: `${API_URL}/client/${clientDocument}`,
        method: 'GET',
        body: {},
        token: token || '',
    };
    return await tryFetchData({
        setReturnMessage,
        request,
    });
};

export const getWallet = async ({
    clientId,
    setReturnMessage,
}: getWalletProps): Promise<Wallet> => {

    const token = localStorage.getItem('access_token');
    const request: fetchDataProps = {
        url: `${API_URL}/wallet/client/${clientId}`,
        method: 'GET',
        body: {},
        token: token || '',
    };
    return await tryFetchData({
        setReturnMessage,
        request,
    });
};

export const sell = async ({
    client_id,
    employee_id,
    price,
    product_id,
    quantity,
    isPayingFromWallet,
    setReturnMessage,
}: sellProps) => {

    const token = localStorage.getItem('access_token');
    const body = {
        client_id,
        employee_id,
        isPayingFromWallet,
        price,
        product_id,
        quantity,
    }
    const request: fetchDataProps = {
        url: `${API_URL}/order`,
        method: 'POST',
        body: body,
        token: token || '',
    };
    return await tryFetchData({
        okayMessage: 'Venda efetuada com sucesso!',
        setReturnMessage,
        request,
    });
}

export const getSelfEmployee = async ({
    setReturnMessage,
}: getSelfEmployeeProps): Promise<Employee> => {

    const token = localStorage.getItem('access_token');
    const request: fetchDataProps = {
        url: `${API_URL}/employee/self`,
        method: 'GET',
        body: {},
        token: token || '',
    };
    return await tryFetchData({
        setReturnMessage,
        request,
    });
};