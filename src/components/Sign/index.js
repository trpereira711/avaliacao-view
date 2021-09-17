import React, { useEffect } from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { validationSchema } from "./validator";
import { Container, Form } from "./styles";
import Logo from "../../assets/cooper.png";

const Sign = ({ labelLink, labelUser, labelPass, labelButton, ...rest }) => {
  const { link, onChange } = rest;

  const { handleSubmit, setFieldValue, values, errors } = useFormik({
    initialValues: {
      nome: "",
      senha: ""
    },

    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: () => {
      onChange(values);
    }
  });

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <img src={Logo} alt="Cooperforte" />
        <input
          type="text"
          placeholder={labelUser}
          onChange={e => setFieldValue("nome", e.target.value)}
        />
        {errors.nome && <p>{errors.nome}</p>}
        <input
          type="password"
          placeholder={labelPass}
          onChange={e => setFieldValue("senha", e.target.value)}
        />
        {errors.senha && <p>{errors.senha}</p>}
        <button type="submit">{labelButton}</button>
        <hr />
        <Link to={link}>{labelLink}</Link>
      </Form>
    </Container>
  );
};

export default Sign;

Sign.defaultProps = {
  labelLink: "informe label link",
  labelUser: "informe label do usuário",
  labelPass: "informe label do password",
  labelButton: "informe label do botão",
  link: "/"
};

Sign.propTypes = {
  labelLink: PropTypes.string,
  labelUser: PropTypes.string,
  labelPass: PropTypes.string,
  labelButton: PropTypes.string,
  link: PropTypes.string
};
