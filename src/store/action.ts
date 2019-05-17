/**
 * @author: hukun
 * @Date: 2019-05-16
 * @Time: 16:26
 * @function
 */
import { AccountDetailInfo } from "../services/account";

export function action_updateLogin(isLogin: boolean) {
  return {
    type: '更新用户登录信息',
    reducer: { isLogin }
  }
}

export function action_updateAccount(userInfo: AccountDetailInfo) {
  return {
    type: '更新用户信息',
    reducer: { userInfo }
  }
}