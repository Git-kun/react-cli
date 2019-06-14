import * as React from "react";
import { Route, Switch, Router } from 'react-router-dom'
import { history } from "./utils/history";
import { LoadableComponent } from "./components/loadable";

const notFound = LoadableComponent( () => import("./pages/404") );

function App () {
  return (
    <Router history={ history }>
      <Switch>
        <Route key='404' component={ notFound }/>
      </Switch>
    </Router>
  )
}

export default App
