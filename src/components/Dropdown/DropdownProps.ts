import { Product } from "../../entities/Product";

export interface DropdownProps {
    options: Product[];
    onChange: (option: Product) => void;
    label?: string;
    required?: boolean;
}