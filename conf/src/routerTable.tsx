import * as React from "react";
import { Switch, Route } from 'react-router-dom'
import { MessagePage } from "./pages";
import { HomePage } from "./pages";
import { Login } from "./pages";
import { NoMatch } from "./pages";

export function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path={'/msg'} component={MessagePage} />
      <Route path={'/login'} component={Login} />
      <Route component={HomePage} />
    </Switch>
  )
}