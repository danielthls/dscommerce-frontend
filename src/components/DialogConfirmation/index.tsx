import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary";

type Props = {
    id: number;
    message: string;
    onDialogAnswer: Function;
}

export default function DialogConfirmation({ id, message, onDialogAnswer }: Props) {

    return (
        <div className="dsc-dialog-background" onClick={() => onDialogAnswer(false)}>
            <div className="dsc-dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dsc-dialog-btn-container">
                    <ButtonPrimary caption={"Sim"} onClick={() => onDialogAnswer(true, id)} />
                    <ButtonInverse caption={"Não"} onClick={() => onDialogAnswer(false, id)} />
                </div>
            </div>
        </div>
    )
}