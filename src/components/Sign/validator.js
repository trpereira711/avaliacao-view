import { yup } from "../../validators";

export const validationSchema = yup.object({
  nome: yup.string().required(),
  senha: yup.string().required()
});
