import BreadCrumbs from "../../../components/BreadCrumbs";
import Button from "../../../components/Button";
import Toast from "../../../components/Toast";
import { useContext, useEffect, useState } from "react";
import { ToastMessage } from "../../../components/Toast/ToastProps";
import { Client as ClientEntity } from "../../../entities/Client";
import { deleteClient, getClients } from "../../../services/client";
import ConfirmModal from "../../../components/ConfirmModal";
import { logInService } from "../../../services/login";
import { JwtPayload } from "../../../services/login/LoginProps";
import { AuthContext } from "../../../context/AuthContext";

const containerStyles = 'w-full h-full flex flex-col p-12 gap-8';
const titleStyles = 'text-4xl font-bold';
const contentStyles = 'flex gap-40 text';

const CreateClient = () => {
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

  return (
    <div className={containerStyles}>
      <h1 className={titleStyles}>Freguês</h1>
      <BreadCrumbs />

      {/* Content area */}
      <section className={contentStyles}>
      </section >
      <Button
        label="Salvar novo freguês"
        disabledStatus={isLoading}
        loading={isLoading}
        onClick={() => console.log('Salvar novo freguês')}
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
            // handleDeleteClient(clientId)
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

export default CreateClient;
