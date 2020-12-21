import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

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

const Email = ({ id, onSubmit, value }) => {
  const [email, setEmail] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!email) {
      setEmail(value);
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      form.setFieldsValue({
        email: value.email
      });
    }
  }, [value]);

  const onFinish = values => {
    onSubmit({ ...email, ...values });
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} {...layout} onFinish={onFinish}>
        <Form.Item name="email" label="E-mail">
          <Input prefix={<MailOutlined />} />
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

export default Email;
