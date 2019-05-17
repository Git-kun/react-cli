
export function ErrorHandler(...param) {
  console.warn(...param)
}

export class HandlerError {
  static log(...param) {
    console.log(...param)
  }

  static alert(msg, type: 'success' | 'fail' | 'info' | 'loading' | 'offline' = 'info', params: { duration?: number, onClose?: () => void, mask?: boolean } = {}) {

  }


}