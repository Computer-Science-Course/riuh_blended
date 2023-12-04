/** ConfirmModal Props */
export interface ConfirmModalProps {
    /** Message of the modal */
    message?: string,
    /** Is confing loading */
    isLoading: boolean,
    /** Event on confirm button is clicked */
    onConfirm?: () => void,
    /** Event on cancel button is clicked */
    onCancel?: () => void,
    /** Event for password is typed */
    onTypePassword?: (password: string) => void,
}