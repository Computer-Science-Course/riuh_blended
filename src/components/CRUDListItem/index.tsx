import IconButton from "../IconButton";
import { CRUDListItemProps } from "./CRUDListItem";

const containerStyles = 'flex gap-2';
const textStyles = 'flex flex-col';
const titleStyles = 'text-1xl max-w-sm break-all';
const descriptionStyles = 'text-base text-white-300';

const CRUDListItem = ({
  description,
  title,
}: CRUDListItemProps) => {
  return (
    <span className={containerStyles}>
      <IconButton onClick={console.log} icon="delete" />
      <IconButton onClick={console.log} icon="edit" />
      <span className={textStyles}>
        <h2 className={titleStyles}>{title}</h2>
        <span className={descriptionStyles}>{description}</span>
      </span>
    </span>
  )
}

export default CRUDListItem;
