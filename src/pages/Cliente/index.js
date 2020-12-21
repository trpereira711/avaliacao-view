import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { buscar } from "../../redux/slice/clientes";
import { logout } from "../../services/auth";
import { Container, InnerHeader, Text } from "./styles";
import { Layout } from "antd";

import Formulario from "./Formulario";
import ClienteTable from "./ClienteTable";

const Cliente = props => {
  const dispatch = useDispatch();
  const { Header, Footer, Content } = Layout;
  const [cliente, setCliente] = useState();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    handleClientes();
  }, []);

  const handleClientes = async () => {
    const res = await dispatch(buscar(null));
    const { status, data } = res.payload;
    if (status === 200) {
      setClientes(data);
    } else if (status === 403) {
      logout();
      props.history.push("/");
    }
  };

  return (
    <Layout className="layout">
      <Header>
        <InnerHeader>
          <Text>Cadastro de Clientes</Text>
        </InnerHeader>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Container>
          <Formulario onRefresh={() => handleClientes()} value={cliente} />
          <ClienteTable
            clientes={clientes}
            onRefresh={() => handleClientes()}
            onChange={cliente => setCliente(cliente)}
          />
        </Container>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Avaliação Cooperforte ©2020 Criado por Thiago Roberto Pereira
      </Footer>
    </Layout>
  );
};

export default Cliente;
