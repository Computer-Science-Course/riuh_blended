import Button from '../Button';
import PasswordField from '../PasswordField';
import { ConfirmModalProps } from './ConfirmModalProps';

const dialogContainerStyles = 'absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 backdrop-blur z-50';
const dialogBoxStyles = 'flex flex-col items-center gap-8 bg-white-800 rounded-lg w-max h-max px-6 py-4';
const dialogBoxTextStyles = 'max-w-sm';
const buttonsStyles = 'flex w-full justify-between mt-4';


const ConfirmModal = ({
  message,
  isLoading,
  onConfirm,
  onCancel,
  onTypePassword,
}: ConfirmModalProps): JSX.Element => {

  return (
    <dialog className={dialogContainerStyles}>
      <div className={dialogBoxStyles}>

        <p className={dialogBoxTextStyles}>{message}</p>

        {onTypePassword && <PasswordField
          required
          placeholder='Insira sua senha'
          storeFieldValue={onTypePassword}
        />}

        <div className={buttonsStyles}>
          <Button
            label='Cancelar'
            variation='red'
            loading={false}
            disabledStatus={isLoading}
            onClick={onCancel}
            key='calcel'
          />
          <Button
            label='Prosseguir'
            variation='green'
            loading={isLoading}
            disabledStatus={isLoading}
            onClick={onConfirm}
            key='confirm'
          />
        </div>

      </div>
    </dialog>
  )
}

export default ConfirmModal;