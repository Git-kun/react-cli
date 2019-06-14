/**
 * @author: hukun
 * @Date: 2019-05-16
 * @Time: 16:22
 * @function
 */

import { createStore } from "../lib/redux";

interface props {
  isLogin: false,
}

const store = createStore<props>({
  initState: {
    isLogin: false,
  }
});

export const GlobalProvider = store.Provider;
export const globalStore = store.store;
