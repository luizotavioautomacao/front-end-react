import React, { useContext } from "react";
import Styles from "./input-styles.scss";
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const inputGetStatus = (): string => {
  return '[x]'
}

const Input: React.FC<Props> = (props: Props) => {

  const { state, setState } = useContext(Context) // contexto criado em Login
  const error = state[`${props.name}Error`]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value // altera o estado com o valor atualizado do email
    })
  }

  const getStatus = (): string => {
    return error? '[x]': '[v]'
  }

  const getTitle = (): string => {
    return error
  }
  
  return (
    <div className={Styles.inputWrap}>
      {<label>data-testid={props.name}</label>}
      <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange} />
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  );
};

export default Input;
