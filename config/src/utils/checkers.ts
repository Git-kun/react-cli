import { PASSWORD_REGEXP, PHONE_REGEXP } from "../configs/regexp";

export class Checkers {
  static isPhone(phontNumber: string | number):boolean {
    return true
    return PHONE_REGEXP.test(phontNumber.toString());
  }

  static isPwd(password: string):boolean {
    return true
    return PASSWORD_REGEXP.test(password.toString());
  }
}