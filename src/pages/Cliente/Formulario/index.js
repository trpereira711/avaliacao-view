import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Collapse, Button, Alert } from "antd";
import { Table, Row, Col, Space, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Container } from "./styles";

import { cadastrar, atualizar } from "../../../redux/slice/clientes";
import { excluirEmail } from "../../../redux/slice/emails";
import { excluirTelefone } from "../../../redux/slice/telefones";
import { buscarPorCep } from "../../../redux/slice/public";

import DadosPessoais from "./DadosPessoais";
import Endereco from "./Endereco";
import Telefone from "./Telefone";
import Email from "./Email";

const Formulario = ({ onRefresh, value }) => {
  const dispatch = useDispatch();
  const [cliente, setCliente] = useState({ telefones: [], emails: [] });
  const [telefoneSelected, setTelefoneSelected] = useState();
  const [emailSelected, setEmailSelected] = useState();

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState();

  useEffect(() => {
    if (value) {
      setCliente({ ...value });
    }
  }, [value]);

  useEffect(() => {
    const fetchData = async () => {
      if (cliente.endereco?.cep) {
        const { cep } = cliente.endereco;
        if (cep && cep.length === 8) {
          const res = await dispatch(buscarPorCep(cep));
          const { status, data } = res.payload;
          if (status === 200) {
            setCliente({
              ...cliente,
              endereco: {
                ...cliente.endereco,
                bairro: data.bairro,
                logradouro: data.logradouro,
                uf: data.uf,
                cidade: data.localidade
              }
            });
          }
        }
      }
    };

    fetchData();
  }, [cliente.endereco?.cep]);

  useEffect(() => {
    if (errors) {
      setTimeout(() => {
        setErrors();
      }, 4000);
    }
  }, [errors]);

  /** SAVE */
  const handleSubmit = async () => {
    if (cliente.id) {
      handleUpdate();
    } else {
      const res = await dispatch(cadastrar(cliente));
      const { status, data } = res.payload;
      if (status === 201) {
        setSuccess(true);
        setCliente({ telefones: [], emails: [] });
        onRefresh();
      } else if (status === 401) {
        setErrors(["Não Autorizado"]);
      } else {
        setErrors(data);
      }
    }
  };

  /** UPDATE */
  const handleUpdate = async () => {
    const res = await dispatch(atualizar(cliente));
    const { status, data } = res.payload;
    if (status === 200) {
      setSuccess(true);
      setCliente({ telefones: [], emails: [] });
      onRefresh();
    } else if (status === 401) {
      setErrors(["Não Autorizado"]);
    }
  };

  /** REMOVE TEL */
  const handleRemoveTelefone = async telefone => {
    const res = await dispatch(excluirTelefone(telefone.id));
    const { status } = res.payload;
    if (status === 200) {
      setCliente({
        ...cliente,
        telefones: [
          ...cliente.telefones.filter(t => t.numero !== telefone.numero)
        ]
      });
      onRefresh();
    }
  };

  /** REMOVE EMAIL */
  const handleRemoveEmail = async email => {
    const res = await dispatch(excluirEmail(email.id));
    const { status } = res.payload;
    if (status === 200) {
      setCliente({
        ...cliente,
        emails: [...cliente.emails.filter(e => e.email !== email.email)]
      });
      onRefresh();
    }
  };

  return (
    <Container>
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel header="Dados Pessoais" key="1">
          <DadosPessoais
            value={cliente}
            handleChange={e =>
              setCliente({ ...cliente, [e.target.id]: e.target.value })
            }
          />
        </Collapse.Panel>
        <Collapse.Panel header="Endereço" key="2">
          <Endereco
            value={cliente}
            handleChange={e => {
              setCliente({
                ...cliente,
                endereco: {
                  ...cliente?.endereco,
                  [e.target.id]: e.target.value
                }
              });
            }}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Contatos" key="3">
          <Row>
            <Col span={12}>
              <Telefone
                value={telefoneSelected}
                onSubmit={value => {
                  setCliente({
                    ...cliente,
                    telefones: [...cliente.telefones, value]
                  });
                }}
              />
            </Col>

            <Col span={12}>
              <Email
                value={emailSelected}
                onSubmit={value =>
                  setCliente({
                    ...cliente,
                    emails: [...cliente.emails, value]
                  })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Table dataSource={cliente?.telefones}>
                <Table.Column title="Tipo" dataIndex="tipo" key="tipo" />
                <Table.Column title="DDD" dataIndex="ddd" key="ddd" />
                <Table.Column title="Número" dataIndex="numero" key="numero" />
                <Table.Column
                  title="Ação"
                  key="acao"
                  render={(text, telefone) => (
                    <Space size="middle">
                      <Button
                        type="text"
                        onClick={() => {
                          setTelefoneSelected(telefone);
                          setCliente({
                            ...cliente,
                            telefones: [
                              ...cliente.telefones.filter(
                                t => t.numero !== telefone.numero
                              )
                            ]
                          });
                        }}
                      >
                        <EditOutlined />
                      </Button>
                      <Popconfirm
                        title="Deseja realmente excluir o telefone"
                        onConfirm={() => handleRemoveTelefone(telefone)}
                      >
                        <DeleteOutlined />
                      </Popconfirm>
                    </Space>
                  )}
                />
              </Table>
            </Col>
            <Col span={12}>
              <Table dataSource={cliente?.emails}>
                <Table.Column title="Email" dataIndex="email" key="email" />
                <Table.Column
                  title="Ação"
                  key="acao"
                  render={(text, email) => (
                    <Space size="middle">
                      <Button
                        onClick={() => {
                          setEmailSelected(email);
                          setCliente({
                            ...cliente,
                            emails: [
                              ...cliente.emails.filter(
                                e => e.email !== email.email
                              )
                            ]
                          });
                        }}
                      >
                        <EditOutlined />
                      </Button>
                      <Popconfirm
                        title="Deseja realmente excluir o email"
                        onConfirm={() => handleRemoveEmail(email)}
                      >
                        <DeleteOutlined />
                      </Popconfirm>
                    </Space>
                  )}
                />
              </Table>
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>
      <Button
        type="primary"
        style={{ marginTop: 20, marginBottom: 20 }}
        onClick={handleSubmit}
      >
        {cliente?.id ? "Atualizar" : "Cadastrar"}
      </Button>
      {success && (
        <Alert
          message="Sucesso"
          type="success"
          showIcon
          closable
          onClose={() => setSuccess(false)}
        />
      )}
      {errors && (
        <Alert
          message="Erros"
          description={`${errors.map(e => JSON.stringify(e))}`}
          type="error"
          showIcon
          closable
          onClose={() => setErrors()}
        />
      )}
    </Container>
  );
};

export default Formulario;
