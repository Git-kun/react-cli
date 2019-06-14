import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Entrance from './app';
import { AppContainer } from "react-hot-loader"
import { GlobalProvider } from './store/store'

const $root = document.getElementById( 'root' );

// @ts-ignore
function renderWithHotReload ( App: any ): void {
  ReactDOM.render(
    <AppContainer>
      <GlobalProvider>
        <App/>
      </GlobalProvider>
    </AppContainer>,
    $root
  );
}

// 初始化
renderWithHotReload( Entrance );


// 热更新
if (module.hot) {
  module.hot.accept("./app.ts", () => {
    const Router = require("./app.ts").default;
    renderWithHotReload(Router);
  });
}
