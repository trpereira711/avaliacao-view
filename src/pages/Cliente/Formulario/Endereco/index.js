import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { UFs } from "../../../../utils";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const Endereco = ({ handleChange, value }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        cep: value?.endereco?.cep,
        logradouro: value?.endereco?.logradouro,
        bairro: value?.endereco?.bairro,
        uf: value?.endereco?.uf,
        cidade: value?.endereco?.cidade,
        complemento: value?.endereco?.complemento
      });
    }
  }, [value]);

  return (
    <div>
      <Form form={form} {...layout}>
        <Form.Item name="cep" label="CEP">
          <Input onChange={handleChange} />
        </Form.Item>

        <Form.Item name="logradouro" label="Logradouro">
          <Input onChange={handleChange} />
        </Form.Item>

        <Form.Item name="bairro" label="Bairro">
          <Input onChange={handleChange} />
        </Form.Item>

        <Form.Item name="uf" label="UF">
          <Select
            onChange={value =>
              handleChange({ target: { id: "uf", value: value } })
            }
          >
            {UFs.map(uf => (
              <Select.Option value={uf}>{uf}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="cidade" label="Cidade">
          <Input onChange={handleChange} />
        </Form.Item>

        <Form.Item name="complemento" label="Complemento">
          <Input onChange={handleChange} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Endereco;
