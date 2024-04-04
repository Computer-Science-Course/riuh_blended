import { ReactElement } from "react";
import { Product } from "../../entities/Product";

export interface DropdownProps {
    children: ReactElement[] | ReactElement;
    value: string;
    label?: string;
    required?: boolean;
}