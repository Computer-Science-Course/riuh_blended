/** Text Field Props */
export interface TextFieldProps {
    /** Text field label */
    label?: string,
    /** Text field placeholder */
    placeholder?: string,
    /** Set up if value is required */
    required: boolean,
    /** Store field value */
    onChange?: (value: any) => void,
    /** Text field width */
    fullWidth?: boolean,
}