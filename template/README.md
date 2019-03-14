### css module  需要使用  .module.css 后缀

## 目录结构  src

pureComponents  纯的组件, 不包含特定内容, 可随意使用 的组件  **应该维护一个 .md 描述文件**

components      和业务有关的组件   **应该维护一个 .md 描述文件**

assets     资源, 图标, 字体, 静态数据(纯粹的静态资源应该由服务器提供)等

global     全局的状态,多语言,字典等, 数据, 任何组件都可拿到的  **单例**

emnu      枚举

router     页面 路由

pages      页面 展开到二级菜单   父子级的页面 应该 嵌套在目录中

layout     首页布局, header sider, footer 等

service    api  ,  api 在这封装成方法, 统一维护  **应该维护一个 .md 描述文件**

utils      工具函数, **新增时 应该同时在 index.md  说明 描述好**

styles     全局 css, 放到 styles.css 统一引入打包

configs    全局的一些配置, 如正则表达式等

decorative  装饰器



程序 入口

main.tsx      页面入口

polyfills.ts   一些兼容处理的 脚本, 统一在这里引入, 

vendors.ts    一些 第三方依赖,全局依赖, 如: react, react-mobx 等

styles.ts    全局样式, 第三方样式, 不需 css-module 打包的样式, 在此文件引入


