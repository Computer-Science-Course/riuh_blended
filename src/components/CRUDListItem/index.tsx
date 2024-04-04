import IconButton from "../IconButton";
import { CRUDListItemProps } from "./CRUDListItem";

const containerStyles = 'flex gap-4';
const textStyles = 'flex flex-col';
const titleStyles = 'text-1xl max-w-sm break-all';
const descriptionStyles = 'text-base text-white-300';

const CRUDListItem = ({
  description,
  title,
  onClickDelete,
  onClickEdit
}: CRUDListItemProps) => {
  return (
    <span className={containerStyles}>
      <IconButton onClick={onClickDelete} icon="delete" />
      <IconButton onClick={onClickEdit} icon="edit" />
      <span className={textStyles}>
        <h2 className={titleStyles}>{title}</h2>
        <span className={descriptionStyles}>{description}</span>
      </span>
    </span>
  )
}

export default CRUDListItem;
