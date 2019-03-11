import * as React from "react";
import * as ReactDOM from "react-dom";


console.log( '当前环境: ' + process.env.NODE_ENV )

const $root = document.getElementById( 'root' );

async function start() {
  // ReactDOM.render( <Loading/>, $root )
  // TODO 一些初始化
  // ReactDOM.unmountComponentAtNode( $root )
  ReactDOM.render( <div></div>, $root )
}

start()