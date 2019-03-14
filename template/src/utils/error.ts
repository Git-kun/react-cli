// import { message } from 'antd'


export class ErrorHandler {
  static errorMessage(msg) {
    // message.error(msg)
  }

  static log(...param) {
    console.warn('error___message', ...param)
  }
}