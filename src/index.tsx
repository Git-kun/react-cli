import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import './styles'         // 引入的 css
import './polyfill'       // polyfill and other
import {GlobalProvider} from './store/store'
const $root = document.getElementById( 'root' );

/**
 * 入口程序
 */
(async function main () {
  ReactDOM.render( <GlobalProvider><App/></GlobalProvider>, $root );
})();


