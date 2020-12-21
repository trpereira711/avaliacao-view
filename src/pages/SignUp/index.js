import React from "react";
import { Container } from "./styles";

import Sign from "../../components/Sign";

const SignUp = () => {
  return (
    <Container>
      <Sign
        labelUser="Informe um nome para o usuário"
        labelPass="Informe sua senha"
        labelButton="Cadastrar"
        labelLink="Fazer login"
        onChange={form => alert("Opsss ainda não diponível")}
      />
    </Container>
  );
};

export default SignUp;
