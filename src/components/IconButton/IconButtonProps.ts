export type IconVariations = 'delete' | 'edit' | 'goToLeft' | 'goToRight';

export interface IconButtonProps {
    icon: IconVariations;
    onClick: () => void;
}