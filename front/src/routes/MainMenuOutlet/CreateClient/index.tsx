import BreadCrumbs from "../../../components/BreadCrumbs";
import Button from "../../../components/Button";
import Toast from "../../../components/Toast";
import { useEffect, useState } from "react";
import { ToastMessage } from "../../../components/Toast/ToastProps";
import ConfirmModal from "../../../components/ConfirmModal";
import TextField from "../../../components/TextField";

const containerStyles = 'w-full h-full flex flex-col p-12 gap-8';
const titleStyles = 'text-4xl font-bold';
const contentStyles = 'flex gap-40 text';
const addClientStyles = 'flex gap-4 items-end';
const fieldsStyle = 'flex flex-col gap-4';
const formRowStyle = 'flex gap-4';

const CreateClient = () => {
  const [fieldBalance, setFieldBalance] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [returnMessage, setReturnMessage] = useState<ToastMessage>({
    message: '', variation: 'standard'
  });

  /** Force two decimals */
  useEffect(() => {
    if (fieldBalance) {
      setFieldBalance(Number(fieldBalance.toFixed(2)));
    }
  }, [fieldBalance]);

  return (
    <div className={containerStyles}>
      <h1 className={titleStyles}>Freguês</h1>
      <BreadCrumbs />

      {/* Content area */}
      <section className={contentStyles}>
        <span className={fieldsStyle}>
          <span className={formRowStyle}>
            <TextField
              required
              fullWidth
              label='Nome'
              placeholder='Digite o nome do freguês'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
            />
            <TextField
              required
              fullWidth
              label='Matricula'
              placeholder='Insira a matrícula'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
            />
          </span>
          <span className={formRowStyle}>
            <TextField
              required
              fullWidth
              label='Documento'
              placeholder='Digite o documento do freguês'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
            />
            <span className={addClientStyles}>
              <TextField
                value={Number(fieldBalance)}
                type='number'
                required
                fullWidth
                label='Recarga'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFieldBalance(Number(event.target.value))}
              />
              <Button
                label='-'
                disabledStatus={isLoading}
                loading={isLoading}
                onClick={() => {
                  if (fieldBalance - 1 > 0) {
                    setFieldBalance(fieldBalance - 1)
                  }
                }}
                fullWidth={false}
                variation='red'
              />
              <Button
                label='+'
                disabledStatus={isLoading}
                loading={isLoading}
                onClick={() => {
                  setFieldBalance(fieldBalance + 1)
                }}
                fullWidth={false}
                variation='green'
              />
            </span>
          </span>
          <p>Saldo atual R$0,00</p>
          <p>Saldo após a recarga R${(0 + fieldBalance).toFixed(2)}</p>
        </span>
      </section >
      <Button
        label='Criar novo freguês'
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
