import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import "antd/dist/antd.css";
import { DDDs } from "../../../../utils";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const Telefone = ({ onSubmit, value }) => {
  const [telefone, setTelefone] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!telefone) {
      setTelefone(value);
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        tipo: value.tipo,
        ddd: value.ddd,
        numero: value.numero
      });
    }
  }, [value]);

  const onFinish = values => {
    onSubmit({ ...telefone, ...values });
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} {...layout} onFinish={onFinish}>
        <Form.Item name="tipo" label="Tipo Telefone">
          <Select>
            <Select.Option value="RESIDENCIAL">Residencial</Select.Option>
            <Select.Option value="COMERCIAL">Comercial</Select.Option>
            <Select.Option value="CELULAR">Celular</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="ddd" label="DDD">
          <Select>
            {DDDs.map(d => (
              <Select.Option value={d}>{d}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="numero" label="Número">
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Inserir
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Telefone;
