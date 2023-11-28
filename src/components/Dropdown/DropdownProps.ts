export interface DropdownProps {
    options: string[];
    onChange: (value: string) => void;
    label?: string;
    required?: boolean;
}