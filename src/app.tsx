/**
 * @author: hukun
 * @Date: 2019-05-15
 * @Time: 14:39
 * @function
 */
import * as React from "react";
import { Route, Switch, Router } from 'react-router-dom'
import { history } from "./utils/history";
import { ROUTER_NAME } from "./router";

class App extends React.Component {
  render() {
    return (
      <div className='pages'>
        <Router history={history}>
          <Switch>
            {
              Object.values(ROUTER_NAME).map((item, index) => {
                return (
                  <Route key={index}
                    path={item.path}
                    name={item.name}
                    component={item.component}
                  />
                )
              })
            }
            <Route key='nomather' component={ROUTER_NAME.LOGIN.component} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App