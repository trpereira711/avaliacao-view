import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const DadosPessoais = ({ handleChange, value }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        nome: value.nome,
        cpf: value.cpf
      });
    }
  }, [value]);

  return (
    <div>
      <Form form={form} {...layout}>
        <Form.Item name="nome" label="Nome">
          <Input onChange={handleChange} />
        </Form.Item>

        <Form.Item name="cpf" label="CPF">
          <Input onChange={handleChange} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default DadosPessoais;
