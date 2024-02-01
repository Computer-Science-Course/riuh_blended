import BreadCrumbs from "../../../components/BreadCrumbs";
import SearchField from "../../../components/SearchField";
import CRUDListItem from "../../../components/CRUDListItem";
import Button from "../../../components/Button";
import Toast from "../../../components/Toast";
import { useContext, useEffect, useState } from "react";
import { ToastMessage } from "../../../components/Toast/ToastProps";
import { scrollBarStyles } from "../../../common/constants";
import { Client as ClientEntity } from "../../../entities/Client";
import { deleteClient, getClients } from "../../../services/client";
import ConfirmModal from "../../../components/ConfirmModal";
import { logInService } from "../../../services/login";
import { JwtPayload } from "../../../services/login/LoginProps";
import { AuthContext } from "../../../context/AuthContext";

const containerStyles = 'w-full h-full flex flex-col p-12 gap-8';
const titleStyles = 'text-4xl font-bold';
const contentStyles = 'flex gap-40 text';
const itemsStyles = 'flex flex-col max-h-96 overflow-y-auto gap-4 p-2 pr-12';
const firstColumnStyles = 'flex flex-col gap-4';

const Client = () => {
  const [clientId, setClientId] = useState<number | undefined>(undefined)
  const [clients, setClients] = useState<ClientEntity[]>([]);
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchField, setSearchField] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [returnMessage, setReturnMessage] = useState<ToastMessage>({
    message: '', variation: 'standard'
  });

  /** Handler to get and set clients. */
  const handleGetClients = async () => {
    setIsLoading(true);
    try {
      const clients = await getClients({
        setReturnMessage,
      });
      setClients(clients);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteClient = async (clientId: number | undefined) => {
    setIsLoading(true);
    try {
      /** TODO: Change username for a dinamic one. */
      const response = await logInService({
        username: currentUser?.username!,
        password,
        setLoading: setIsLoading,
        setReturnMessage
      });
      const { access_token }: JwtPayload = await response.data;
      if (access_token) {
        deleteClient({
          client_id: clientId,
          setReturnMessage,
          access_token,
        });
        setReturnMessage({ message: `Cliente deletado com sucesso!`, variation: 'green' })
        setClients(prev => prev.filter(client => client.id !== clientId))
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetClients();
  }, []);

  return (
    <div className={containerStyles}>
      <h1 className={titleStyles}>Cliente</h1>
      <BreadCrumbs />

      {/* Content area */}
      <section className={contentStyles}>
        <div className={firstColumnStyles}>
          <SearchField
            label="Procure por um freguês"
            placeholder="Digite um nome ou documento"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchField(event.target.value);
            }}
            required={false}
            disabled={clients.length === 0}
          />
          <div className={`${itemsStyles} ${scrollBarStyles}`}>
            {clients.map(({ id, name, registration }) => {
              const hasSearchByName = name?.toLowerCase().includes(searchField.toLocaleLowerCase());
              const hasSearchByRegistration = registration?.toLowerCase().includes(searchField.toLocaleLowerCase());
              const hasSearch = hasSearchByName || hasSearchByRegistration;
              const isNotSearching = searchField.length == 0;
              /** TODO: Highlight found search. */
              if (hasSearch || isNotSearching) {
                return (
                  <CRUDListItem
                    title={name!}
                    description={registration!}
                    onClickDelete={() => {
                      setClientId(id)
                      setShowConfirmModal(true)
                    }}
                    onClickEdit={() => console.log('edit')}
                  />
                )
              }
            })}
          </div>
        </div>
      </section >
      <Button
        label="Criar novo freguês"
        disabledStatus={isLoading}
        loading={isLoading}
        onClick={() => console.log('Criar novo freguês')}
        fullWidth={false}
      />
      {/* Show toast message on the screen */}
      {
        returnMessage.message && <Toast
          toastMessage={returnMessage}
          messageSetter={setReturnMessage}
        />
      }
      {
        showConfirmModal && <ConfirmModal
          isLoading={false}
          onConfirm={() => {
            handleDeleteClient(clientId)
            setShowConfirmModal(false)
          }}
          message="Você tem certeza que deseja deletar esse aluno?"
          onTypePassword={setPassword}
          onCancel={() => setShowConfirmModal(false)}
        />
      }
    </div >
  );
};

export default Client;
