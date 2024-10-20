import "./styles.css";

type Props = {
  caption: string;
  onClick: Function;
}

export default function ButtonInverse({ caption, onClick }: Props) {
  return <div onClick={() => onClick()} className="dsc-btn dsc-btn-white">{caption}</div>;
}
