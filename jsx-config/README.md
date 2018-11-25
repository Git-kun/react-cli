由于 babel 升级 babel 7 有了很多改变

stage-0, stage-1 等都以弃用,
插件,模块都移到@babel 命名空间里面

配置时babel 支持 装饰器时一直报错 需要 decoratorsBeforeExport 这个 option 属性 ,且必须是 布尔

*原因*:

装饰器,现在是有两个语法上的讨论,还没决定,需要先看看社区的想法

1
```js
@add()
export class Text {}
```
2
```js
export @add() class Text{}
```

*解决*
.babelrc 文件里面 使用了"@babel/plugin-proposal-decorators" 插件