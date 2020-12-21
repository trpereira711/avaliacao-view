import React from "react";
import { useDispatch } from "react-redux";
import { excluir } from "../../../redux/slice/clientes";
import { Table, Tag, Space, Button } from "antd";
import { Container } from "./styles";
import "antd/dist/antd.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function ClienteTable({ clientes, onRefresh, onChange }) {
  const dispatch = useDispatch();

  const handleExcluir = async cliente => {
    const { id } = cliente;
    const res = await dispatch(excluir(id));
    const { status } = res.payload;
    if (status === 200) {
      onRefresh();
    }
  };

  return (
    <Container>
      <Table dataSource={clientes}>
        <Table.Column title="Nome" dataIndex="nome" key="nome" />
        <Table.Column title="CPF" dataIndex="cpf" key="cpf" />
        <Table.Column
          title="Telefones"
          dataIndex="telefones"
          key="telefones"
          render={telefones => (
            <>
              {telefones?.map(telefone => (
                <>
                  <Tag color="blue" key={telefone}>
                    {telefone.tipo}
                  </Tag>
                  <Tag color="blue" key={telefone}>
                    {`${telefone.ddd}${telefone.numero}`}
                  </Tag>
                </>
              ))}
            </>
          )}
        />
        <Table.Column
          title="Emails"
          dataIndex="emails"
          key="emails"
          render={emails => (
            <>
              {emails?.map(e => (
                <>
                  <Tag color="blue" key={e}>
                    {e.email}
                  </Tag>
                </>
              ))}
            </>
          )}
        />
        <Table.Column
          title="Ação"
          key="acao"
          render={(text, cliente) => (
            <Space size="middle">
              <Button>
                <EditOutlined onClick={() => onChange(cliente)} />
              </Button>
              <Button onClick={() => handleExcluir(cliente)}>
                <DeleteOutlined />
              </Button>
            </Space>
          )}
        />
      </Table>
    </Container>
  );
}

export default ClienteTable;
