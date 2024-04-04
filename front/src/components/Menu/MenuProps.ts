export type MenuState = 'cashier' | 'client' | 'employee' | 'product' | 'report';


export interface MenuProps {
    cashierAction: () => void;
    clientAction: () => void;
    employeeAction: () => void;
    productAction: () => void;
    reportAction: () => void;
    currentSelected: MenuState;
}