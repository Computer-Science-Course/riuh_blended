/** Password Field Props */
export interface PasswordFieldProps {
    /** Password field label */
    label?: string,
    /** Password field placeholder */
    placeholder?: string,
    /** Set up if value is required */
    required: boolean,
    /** Store field value */
    onChange?: (value: string) => void,
}