import Hyperlink from "../Hyperlink";

const getCrumbsNames = () => (
  location.pathname.split('/').filter((crumb) => crumb !== '')
);

const formatCrumb = (crumbIndex: number): JSX.Element => {
  const crumb = getCrumbsNames()[crumbIndex];
  const crumbPath = getCrumbsNames().slice(0, crumbIndex + 1).join('/');
  return <Hyperlink key={crumbPath} text={crumb} url={`/${crumbPath}`} />
};

const getCrumbs = () => {
  const crumbs = getCrumbsNames();
  return crumbs.map((_, crumbIndex) => formatCrumb(crumbIndex));
}

const BreadCrumbs = () => {
  const crumbs = getCrumbs();

  return (
    <span>{crumbs.map((crumb, index) => (
      <>
        {crumb}
        {index < crumbs.length - 1 && <span> / </span >}
      </>
    ))}</span>
  );
};


export default BreadCrumbs;