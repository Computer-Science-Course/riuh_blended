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

    const request: fetchDataProps = {
        url: '/product',
        method: 'GET',
        body: {},
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

    const request: fetchDataProps = {
        url: `/client/${clientDocument}`,
        method: 'GET',
        body: {},
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

    const request: fetchDataProps = {
        url: `/wallet/client/${clientId}`,
        method: 'GET',
        body: {},
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

    const body = {
        client_id,
        employee_id,
        isPayingFromWallet,
        price,
        product_id,
        quantity,
    }
    const request: fetchDataProps = {
        url: `/order`,
        method: 'POST',
        body: body,
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

    const request: fetchDataProps = {
        url: '/employee/self',
        method: 'GET',
        body: {},
    };
    return await tryFetchData({
        setReturnMessage,
        request,
    });
};