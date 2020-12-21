import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { autenticar } from "../../redux/slice/auth";
import { Container } from "./styles";
import { login } from "../../services/auth";

import Sign from "../../components/Sign";

const SignIn = props => {
  const dispatch = useDispatch();

  const handleSubmit = async form => {
    const res = await dispatch(autenticar(form));
    const { status, data } = res.payload;
    if (status === 200) {
      login(data.token);
      props.history.push("/app");
    } else if (status !== 200) {
      alert("Opss... usuário não encontrado!!");
    } else {
      alert("Opss.. tivemos um problema.");
    }
  };

  return (
    <Container>
      <Sign
        link="/signup"
        labelUser="Usuário"
        labelPass="Senha"
        labelButton="Entrar"
        labelLink="Criar conta"
        onChange={form => handleSubmit(form)}
      />
    </Container>
  );
};

export default SignIn;
