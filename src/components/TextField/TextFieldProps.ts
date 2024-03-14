/** Text Field Props */
export interface TextFieldProps {
    /** Text field label */
    label?: string,
    /** Text field placeholder */
    placeholder?: string,
    /** Set up if value is required */
    required: boolean,
    /** Store field value */
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void,
    /** Text field width */
    fullWidth?: boolean,
    /** Text field type */
    type?: 'text' | 'number',
    /** Text field value */
    value?: string | number,
}