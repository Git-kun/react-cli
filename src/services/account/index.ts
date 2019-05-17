/**
 * @author: hukun
 * @Date: 2019-05-16
 * @Time: 14:21
 * @function
 */
import { Net } from "./net";

export interface AccountDetailInfo {

}

export class Service_Account {
  static getAccountDetail(): Promise<AccountDetailInfo> {
    return Net('/home/detail').then(res => res.data);
  }
}