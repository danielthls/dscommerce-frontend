import "./styles.css";

type Props = {
  caption: string;
}

export default function ButtonInverse({ caption }: Props) {
  return <div className="dsc-btn dsc-btn-white">{caption}</div>;
}
