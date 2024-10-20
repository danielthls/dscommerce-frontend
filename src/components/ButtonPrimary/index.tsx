import "./styles.css";

type Props = {
  caption: string;
  onClick: Function;
}

export default function ButtonPrimary({ caption, onClick }: Props) {
  return <div onClick={() => onClick()} className="dsc-btn dsc-btn-blue">{caption}</div>;
}
