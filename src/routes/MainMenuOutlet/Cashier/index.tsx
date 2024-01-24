import { useEffect, useState } from "react";
import BreadCrumbs from "../../../components/BreadCrumbs";
import Dropdown from "../../../components/Dropdown";
import Checkbox from "../../../components/Switch";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import { UserCircle2 } from "lucide-react";
import { getClient, getProducts, getSelfEmployee, getWallet, sell } from "../../../services/cashier";
import { Product } from "../../../entities/Product";
import { Client } from "../../../entities/Client";
import { Wallet } from "../../../entities/Wallet";
import Toast from "../../../components/Toast";
import { ToastMessage } from "../../../components/Toast/ToastProps";
import { HandleGetClientProps, HandleSellProps } from "./CashierrProps";
import Item from "../../../components/Dropdown/Item";

const containerStyles = 'w-full h-full flex flex-col p-12 gap-8';
const titleStyles = 'text-4xl font-bold';
const contentStyles = 'flex gap-40';
const firstColumnStyles = 'flex flex-col gap-4';
const addClientStyles = 'flex gap-4 items-end';
const secondColumnStyles = 'flex flex-col gap-2';

/**
 * Handles the retrieval of a client based on their document.
 * 
 * @param {HandleGetClientProps} props - The function props.
 * @param {string} props.clientDocument - The document of the client to retrieve.
 * @param {Function} props.setClient - The function to set the retrieved client.
 * @param {Function} props.setIsLoading - The function to set the loading state.
 * @param {Function} props.setReturnMessage - The function to set the return message.
 * @returns {Promise<void>} - A promise that resolves when the client retrieval is complete.
 */
const handleGetClient = async ({
  clientDocument,
  setClient,
  setIsLoading,
  setReturnMessage,
}: HandleGetClientProps) => {
  setIsLoading(true);
  try {
    const client = await getClient({
      clientDocument,
      setReturnMessage,
    });
    if (client) {
      setClient(client);
    }
  } finally {
    setIsLoading(false);
  }
};

/**
 * Handles the sell operation.
 * 
 * @param {HandleSellProps} props - The function props.
 * @param {Client} props.client - The client object.
 * @param {Product} props.product - The product object.
 * @param {boolean} props.isPayingFromWallet - Indicates whether the payment is made from the wallet.
 * @param {Function} props.setReturnMessage - The function to set the return message.
 * @param {Function} props.setIsLoading - The function to set the loading state.
 * @param {Function} props.setClient - The function to set the client object.
 */
const handleSell = async ({
  client,
  product,
  isPayingFromWallet,
  setReturnMessage,
  setIsLoading,
  setClient,
}: HandleSellProps) => {
  setIsLoading(true);
  try {
    const employee = await getSelfEmployee({
      setReturnMessage,
    })
    const orderReponse = await sell({
      client_id: client.id!,
      employee_id: employee.id!,
      product_id: product.id!,
      price: product.price!,
      quantity: 1,
      isPayingFromWallet,
      setReturnMessage,
    })
    if (orderReponse && isPayingFromWallet) {
      handleGetClient({
        clientDocument: client.registration!,
        setClient,
        setReturnMessage,
        setIsLoading,
      })

    }
  } finally {
    setIsLoading(false);
  }
}


/**
 * @description React component for Cashier.
 */
const Cashier = () => {
  const [isFastCashier, setIsFastCashier] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPayingFromWallet, setIsPayingFromWallet] = useState(false);
  const [client, setClient] = useState<Client>({
    active: false,
    registration: '',
    name: '',
    id: undefined,
  });
  const [wallet, setWallet] = useState<Wallet>({});
  const [clientDocument, setClientDocument] = useState('');
  const [products, setProducts] = useState<Product[]>([{}]);
  const [product, setProduct] = useState<Product>({});
  const [returnMessage, setReturnMessage] = useState<ToastMessage>({
    message: '', variation: 'standard'
  });

  /** Get all products when page is loaded. */
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const loadedProducts = await getProducts({
        setReturnMessage,
      });
      setProducts(loadedProducts);
      setProduct(loadedProducts[0]);
    };

    fetchProducts();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    /** Perform a sell when client change and "fast cashier" is on. */
    if (client.id && isFastCashier) {
      handleSell({
        client,
        product,
        setIsLoading,
        setReturnMessage,
        isPayingFromWallet,
        setClient,
      });
    }
  }, [client.id])

  useEffect(() => {
    /** Get new wallet when client changes. */
    const fetchWallet = async () => {
      if (client.id) {
        const wallet = await getWallet({
          clientId: client.id,
          setReturnMessage,
        });
        setWallet(wallet);
      }
    }

    fetchWallet();
  }, [client])

  /** Get client info when client document change and "fast cashier" is on.   */
  useEffect(() => {
    if (isFastCashier && clientDocument.trim()) {
      handleGetClient({
        setClient,
        clientDocument,
        setReturnMessage,
        setIsLoading
      })
    }
  }, [clientDocument]);

  return (
    <div className={containerStyles}>
      <h1 className={titleStyles}>Caixa</h1>
      <BreadCrumbs />

      {/* Content area */}
      <section className={contentStyles}>
        <div className={firstColumnStyles}>
          <Dropdown
            label="Produto"
            value={product.name || products[0].name || ''}
            required
          >
            {products.map(product => (
              <Item
                label={`${product.name!} | R$${product.price!}`}
                value={product}
                key={product.name!}
                handleSelect={setProduct}
              />
            ))}
          </Dropdown>
          <span className={addClientStyles}>
            <TextField
              label="Freguês"
              placeholder="Documento"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setClientDocument(event.target.value);
              }}
              required
            />
            {/* Button to search client */}
            <Button
              label="+"
              variation="green"
              disabledStatus={isFastCashier || isLoading}
              loading={isLoading}
              onClick={() => {
                handleGetClient({
                  setClient,
                  clientDocument,
                  setReturnMessage,
                  setIsLoading,
                })
              }}
            />
          </span>
          <Checkbox
            label="Caixa rápido"
            checked={isFastCashier}
            onChange={setIsFastCashier}
          />
          <Checkbox
            label="Pagar com a carteirinha"
            checked={isPayingFromWallet}
            onChange={setIsPayingFromWallet}
          />
        </div>
        {/* Client info */}
        <div className={secondColumnStyles}>
          {client.name && (
            <>
              <UserCircle2 size={80} />
              <span className="text-2xl">{client.name}</span>
              <span className="text-2xl">{client.course}</span>
              <span className="text-2xl">R$ {wallet.balance}</span>
            </>
          )}
        </div>
      </section >
      <Button
        label="Realizar venda"
        disabledStatus={isFastCashier || isLoading || !(client.name && product.name)}
        loading={isLoading}
        /** TODO: Change quantity to be dinamic. */
        onClick={() => handleSell({
          client,
          product,
          setReturnMessage,
          setIsLoading,
          isPayingFromWallet,
          setClient,
        })}
        fullWidth={false}
      />
      {/* Show toast message on the screen */}
      {
        returnMessage.message && <Toast
          toastMessage={returnMessage}
          messageSetter={setReturnMessage}
        />
      }
    </div >
  );
};

export default Cashier;
