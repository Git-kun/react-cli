## mufans 微信h5 足球售票平台

## typescript+react+webpack 模板

### 技术栈
* webpack,
* babel

    es6,7,8,9,10,等新特性
* typescript

    类型
* [typed-css-modules-loader](https://www.npmjs.com/package/typed-css-modules) 

    用于自动生成css module 的 .d.ts
    
    可使用`tcm src -w` 已监听模式启用 

* react


### 开发 

需要全局安装 `cross-env`

1. npm run dev

### 打包
1. npm run build

### 生成 doc
1. npm run docs


```text-angular
  {
    test: /\.ts$/,
    loader: '@ngtools/webpack'
  },
  {
    test: /\.html$/,
    loader: 'raw-loader'
  },
```
