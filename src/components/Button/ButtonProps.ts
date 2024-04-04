/** Button states */
interface ButtonStates {
    standard: string;
    hover: string;
    active: string;
    disabled: string;
}

/** Struct foe button styles using Tailwind CSS */
export interface ButtonStyles {
    standard: ButtonStates;
    green: ButtonStates;
    alert: ButtonStates;
    red: ButtonStates;
}

export type ButtonVariation = keyof ButtonStyles;

/** Button Props */
export interface ButtonProps {
    /** Value to be displayed on button */
    label?: string,
    /** Disabled status value */
    disabledStatus: boolean,
    /** Loading status value */
    loading: boolean,
    /** Button variations: standard | hover | active | disabled */
    variation?: ButtonVariation,
    /** Event on button is clicked */
    onClick?: () => void,
    /** Button size */
    fullWidth?: boolean,
}