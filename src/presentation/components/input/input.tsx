import React from "react";
import Styles from "./input-styles.scss";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.inputWrap}>
      <input {...props} />
      <span className={Styles.status}>[x]</span>
    </div>
  );
};

export default Spinner;
