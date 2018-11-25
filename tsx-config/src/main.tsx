import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter , Router} from 'react-router-dom'

import 'weui';
import 'react-weui/build/packages/react-weui.css';


import { Routes } from "./routerTable";
import { Navigation } from "./navigation";
import history from "./history";

ReactDOM.render(
    (
        <Router history={history}>
            <>
                <Routes />
                <Navigation></Navigation>
            </>
        </Router>
    ),
    document.getElementById('root')
);