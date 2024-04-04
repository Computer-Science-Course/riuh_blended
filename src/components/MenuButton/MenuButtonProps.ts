export type MenuButtonVariation = 'cashier' | 'client' | 'employee' | 'product' | 'report';

export interface MenuButtonProps {
    currentSelected?: boolean;
    onClick: () => void;
    variation?: MenuButtonVariation;
}