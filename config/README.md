添加 `--profile --json > stats.json` 输出 stats.json 文件

两个 webpack 配置

1. 使用 dll
2. 不使用 dll


配置要求
1. 静态全局 css 文件(仍会被打包,为了添加后缀之内,), 需要放到 public/style 内, 然后在 style.css 内引入
2. 第三方依赖在 ./src/venders.ts 内引入,
3. polyfill  在 ./src/polyfill 内引入

结果
1. stats.json  5.1m  js + css  524k
2. stats.json  8.7m  js + css  548k

都能正常使用

https://webpack.github.io/analyse/

和

https://alexkuz.github.io/webpack-chart/

分析的 stats.json 数据显示完全一致;


使用 dll 会生成
  bundle-config.json ,
  manifest.json,
  以及 ./public/dll 目录下的文件
  还需要在 index.html 里面添加 ejs 模板