import "./styles.css";

type Props = {
  caption: string;
}

export default function ButtonPrimary({ caption }: Props) {
  return <div className="dsc-btn dsc-btn-blue">{caption}</div>;
}
