const path = require('path')
module.exports = {
  historyApiFallback: true,   // 不跳转
  https: false,
  disableHostCheck: true,
  hot: true,
  inline: true,           // 刷新页面
  progress: true,
  overlay: true,
  port: 8081,
  // host: '0.0.0.0',
  open: true,
  proxy: {
    '/mufans/*': {
      target: 'http://10.0.1.206/',
      secure: false
    },
    '/mobile/*': {
      target: "http://120.78.122.191/",
      // target: "http://47.107.235.32/",
      // target: "http://10.0.1.20:8092/",
      secure: false
    },
  }
}