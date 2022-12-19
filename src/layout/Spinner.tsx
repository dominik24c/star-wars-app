import { FC, PropsWithChildren } from "react";
import style from "./Spinner.module.css";

const Spinner: FC<PropsWithChildren> = (props) => {
    return (
        <div className={style.LdsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
}

export default Spinner;