/**
 * @author: hukun
 * @Date: 2019-05-16
 * @Time: 16:22
 * @function
 */

import { createStore } from "../lib/redux";
import { AccountDetailInfo } from "../services/account";

interface props {
  userInfo: AccountDetailInfo,
  isLogin: false,
}

const store = createStore<props>({
  initState: {
    userInfo: null,
    isLogin: false,
  }
});

export const GlobalProvider = store.Provider;
export const globalStore = store.store;
