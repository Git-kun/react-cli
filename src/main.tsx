import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

console.log('当前环境',process.env.NODE_ENV);

ReactDOM.render(<App/>, document.getElementById('app'));