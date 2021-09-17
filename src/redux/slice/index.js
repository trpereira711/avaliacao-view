import { combineReducers } from "redux";

import AuthReducer from "./auth";
import ClienteReducer from "./clientes";
import PublicReducer from "./public";
import EmailReducer from "./emails";
import TelefoneReducer from "./telefones";

export default combineReducers({
  auth: AuthReducer,
  cliente: ClienteReducer,
  publicAPI: PublicReducer,
  email: EmailReducer,
  telefone: TelefoneReducer
});
