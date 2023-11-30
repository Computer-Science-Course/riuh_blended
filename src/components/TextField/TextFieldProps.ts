/** Text Field Props */
export interface TextFieldProps {
    /** Text field label */
    label?: string,
    /** Text field placeholder */
    placeholder?: string,
    /** Set up if value is required */
    required: boolean,
    /** Store field value */
    storeFieldValue?: (value: string) => void,
}