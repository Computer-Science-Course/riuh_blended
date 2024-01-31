export interface CRUDListItemProps {
    title: string;
    description: string;
    onClickEdit: (value: any) => any;
    onClickDelete: (value: any) => any;
}