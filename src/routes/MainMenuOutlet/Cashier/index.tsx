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

const containerStyles = 'w-full h-full flex flex-col p-12 gap-8';
const titleStyles = 'text-4xl font-bold';
const contentStyles = 'flex gap-40';
const firstColumnStyles = 'flex flex-col gap-4';
const addClientStyles = 'flex gap-4 items-end';
const secondColumnStyles = 'flex flex-col gap-2';

const handleGetClient = async (
  setClient: (client: Client) => void,
  setWallet: (wallet: Wallet) => void,
  clientDocument: string,
  setReturnMessage: (toastMessage: ToastMessage) => void,
  setIsLoading: (isLoading: boolean) => void,
) => {
  setIsLoading(true);
  try {
    const client = await getClient({
      clientDocument,
      setReturnMessage,
    });
    setClient(client);
    const clientId = client.id;
    if (!clientId) return;
    const wallet = await getWallet({
      clientId,
      setReturnMessage,
    });
    setWallet(wallet);
  } finally {
    setIsLoading(false);
  }
};

export interface handleSellProps {
  client: Client;
  product: Product;
  setReturnMessage: (toastMessage: ToastMessage) => void;
  setIsLoading: (loading: boolean) => void;
}

const handleSell = async ({
  client,
  product,
  setReturnMessage,
  setIsLoading,
}: handleSellProps) => {
  setIsLoading(true);
  const employee = await getSelfEmployee({
    setReturnMessage,
  })
  await sell({
    client_id: client.id!,
    employee_id: employee.id!,
    product_id: product.id!,
    price: product.price!,
    quantity: 1,
    setReturnMessage,
  })
  setIsLoading(false);
}

const Cashier = () => {
  const [isFastCashier, setIsFastCashier] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isPayingWithWallet, setIsPayingWithWallet] = useState(false);
  const [client, setClient] = useState<Client>({
    active: false,
    registration: '',
    name: '',
    id: undefined,
  });
  const [wallet, setWallet] = useState<Wallet>({});
  const [clientDocument, setClientDocument] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({});
  const [returnMessage, setReturnMessage] = useState<ToastMessage>({
    message: '', variation: 'standard'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const loadedProducts = await getProducts({
        setReturnMessage,
      });
      setProducts(loadedProducts);
    };

    fetchProducts();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleFastCashier = async () => {
      if (isFastCashier && clientDocument.trim()) {
        try {
          // Call handleGetClient and wait for it to complete
          const clientData = await handleGetClient(
            setClient,
            setWallet,
            clientDocument,
            setReturnMessage,
            setIsLoading,
          );

          // Now that handleGetClient has completed, use its result in handleSell
          await handleSell({
            client: clientData,
            product,
            setIsLoading,
            setReturnMessage,
          });
        } catch (error) {
          // Handle errors here if necessary
          console.error("Error in handleFastCashier:", error);
        }
      }
    };

    handleFastCashier();
  }, [clientDocument, isFastCashier, product]);

  return (
    <div className={containerStyles}>
      <h1 className={titleStyles}>Caixa</h1>
      <BreadCrumbs />
      <section className={contentStyles}>
        <div className={firstColumnStyles}>
          <Dropdown
            label="Produto"
            required
            onChange={setProduct}
            options={products?.map(product => product)}
          />
          <span className={addClientStyles}>
            <TextField
              label="Freguês"
              placeholder="Documento"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setClientDocument(event.target.value);
              }}
              required
            />
            <Button
              label="+"
              variation="green"
              disabledStatus={isFastCashier || isLoading}
              loading={isLoading}
              onClick={() => {
                handleGetClient(
                  setClient,
                  setWallet,
                  clientDocument,
                  setReturnMessage,
                  setIsLoading,
                )
              }}
            />
          </span>
          <Checkbox
            label="Caixa rápido"
            checked={isFastCashier}
            onChange={setIsFastCashier}
          />
          {/* Currently unavaiable */}
          {/* <Checkbox
            label="Pagar com a carteirinha"
            checked={isPayingWithWallet}
            onChange={setIsPayingWithWallet}
          /> */}
        </div>
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
      </section>
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
        })}
        fullWidth={false}
      />
      {returnMessage.message && <Toast
        toastMessage={returnMessage}
        messageSetter={setReturnMessage}
      />}
    </div>
  );
};

export default Cashier;
