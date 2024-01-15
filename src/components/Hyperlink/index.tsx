import { HyperlinkProps } from './HyperlinkProps';

const standart = 'text-purple-900 underline';
const hover = 'hover:text-white-0';
const visited = 'visited:text-green-0';

const Hyperlink = ({
  text,
  url,
  openInNewTab = true,
}: HyperlinkProps): JSX.Element => {

  return (
    <a
      href={url}
      key={url}
      className={`${standart} ${hover} ${visited}`}
      {...(openInNewTab && { target: '_blank' })}
    >
      {text}
    </a>
  )
}

export default Hyperlink;