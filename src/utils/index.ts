import { history } from "./history";
import { message } from "../components/message";

function getObjectType(data) {
  return Object.prototype.toString.call(data).split(' ')[1].replace(']', '');
}

export default {
  isNumber(data) {
    return getObjectType(data) === 'Number' && !isNaN(data)
  },
  isArray(data) {
    return getObjectType(data) === 'Array'
  },
  isFunction(data) {
    return getObjectType(data) === 'Function'
  },
  isObject(data) {
    return getObjectType(data) === 'Object'
  },
  isFormData(data) {
    return getObjectType(data) === 'FormData'
  },
  isObjectEmpty(data) {
    return !(this.isObject(data) && Object.keys(data).length > 0);
  },
  JumpTo(routerName, param?) {
    let path = routerName;
    if (typeof routerName === 'object' && this.isObject(routerName)) {
      path = routerName.path;
    }

    if (param) {
      if (param.query) {
        path += '?' + this.serialization(param.query)
      } else {
        path = Object.assign({ pathname: path }, param)
      }
    }
    history.push(path)
  },


  replaceTo(routerName, param?) {
    let path = routerName;
    if (typeof routerName === 'object' && this.isObject(routerName)) {
      path = routerName.path;
    }

    if (param) {
      if (param.query) {
        path += '?' + this.serialization(param.query)
      } else {
        path = Object.assign({ pathname: path }, param)
      }
    }

    history.replace(path)
  },
  formatIdNumber(number) {
    number += '';
    try {
      const len = number.length;
      const befor = number.substring(0, 5);
      const after = number.substring(len - 4);
      const arr = new Array(len - 5 - 4).fill('*');
      return befor + arr.join('') + after;
    } catch (e) {
      return number
    }

  },
  back(page_number?) {
    if (page_number) {
      history.go(page_number)
    } else {
      history.go(-1);
    }
  },

  dataURLtoFile(dataurl, filename) { //将base64转换为文件
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename + '.' + mime.split('/')[1], { type: mime });
  },
  zero(n) {
    return n < 10 ? '0' + n : n + ''
  },
  toDateString(time) {
    if (time) {
      const date = new Date()
      let y = date.getFullYear();
      let m = this.zero((date.getMonth() + 1));
      let d = this.zero(date.getDate());
      let h = this.zero(date.getHours());
      let mins = this.zero(date.getMinutes());
      let ms = this.zero(date.getMilliseconds());
      return y + '-' + m + '-' + d + ' ' + h + ':' + mins + ':' + ms
    }
    return '无'

  },
  serialization(param: { [key: string]: string }) {
    if (!this.isObject(param)) {
      return ''
    }
    let array = []
    for (let [key, value] of Object.entries(param)) {
      array.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
    return array.join('&');
  },
  getParams(string = window.location.search): { [key: string]: string } {
    if (!string) {
      string = window.location.href
    }
    let str = string
    if (string.includes('?')) {
      str = string.split('?')[1]
    }
    let arr = str.split('&');
    let obj = {}
    for (let item of arr) {
      let p = item.split('=');
      if (p[1]) {
        obj[p[0]] = p[1]
      }
    }
    return obj
  },
  sleep(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(0)
      }, time)
    })
  }
}




