import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Cliente from "./pages/Cliente";
import Formulario from "./pages/Cliente/Formulario";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <PrivateRoute path="/app" component={Cliente} />
      <PrivateRoute path="/app/cadastro" component={Formulario} />
      <Route path="*" component={() => <h1> PAGE NOT FOUND :( </h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
