import BreadCrumbs from "../../../components/BreadCrumbs";
import SearchField from "../../../components/SearchField";
import CRUDListItem from "../../../components/CRUDListItem";
import Button from "../../../components/Button";
import Toast from "../../../components/Toast";
import { useState } from "react";
import { ToastMessage } from "../../../components/Toast/ToastProps";
import { scrollBarStyles } from "../../../common/constants";

const containerStyles = 'w-full h-full flex flex-col p-12 gap-8';
const titleStyles = 'text-4xl font-bold';
const contentStyles = 'flex gap-40 text';
const itemsStyles = 'flex flex-col max-h-96 overflow-y-auto gap-4 p-2 pr-12';
const firstColumnStyles = 'flex flex-col gap-4';

const clientBase = {
  name: 'Mateus Santos Mendonça',
  document: '1929040019',
}

const clientsBase = [
  clientBase, clientBase, clientBase, clientBase, clientBase,
  clientBase, clientBase, clientBase, clientBase, clientBase,
  clientBase, clientBase, clientBase, clientBase, clientBase,
  clientBase, clientBase, clientBase, clientBase, clientBase,
  clientBase, clientBase, clientBase, clientBase, clientBase,
]

const Client = () => {
  const [returnMessage, setReturnMessage] = useState<ToastMessage>({
    message: '', variation: 'standard'
  });

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
            required={false}
          />
          <div className={`${itemsStyles} ${scrollBarStyles}`}>
            {clientsBase.map(({ name, document }) => (
              <CRUDListItem
                title={name}
                description={document}
              />
            ))}
          </div>
        </div>
      </section >
      <Button
        label="Criar novo freguês"
        disabledStatus={false}
        loading={false}
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
    </div >
  );
};

export default Client;
