import Icons from "./img/icons.svg";

export const Icon = ({ id, className }) => {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`${Icons}#${id}`} />
    </svg>
  );
};
