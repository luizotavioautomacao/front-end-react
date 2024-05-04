import React, { useState, useEffect } from "react";
import Styles from "./login-styles.scss";
import { Header, Footer, Input, FormStatus } from "@/presentation/components";
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from "@/presentation/protocols/validation";

type Props = {
  validation?: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {

  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    errorMessage: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation?.validate('email', state.email),
      passwordError: validation?.validate('password', state.password)
    })
  }, [state.email,state.password])

  // useEffect(() => {
  //   validation?.validate('password', state.password)
  // }, [state.password])

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button data-testid="submit" className={Styles.submit} type="submit" disabled={!!state.emailError || !!state.passwordError}>
            Entrar
            {/* <br></br>
            email:{state.emailError}<br></br>
            pass:{state.passwordError} */}
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
