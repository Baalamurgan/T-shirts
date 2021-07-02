import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { signout } from "./auth/helper";
import Home from "./core/Home";
import signin from "./user/Signin";
import signup from "./user/Signup";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={signup} />
        <Route exact path="/signin" component={signin} />
        <Route exact path="/signout" component={signout} />
      </Switch>
    </BrowserRouter>
  );
}
