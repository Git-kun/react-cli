## 路由跳转
```typescript ts
  // 获取路由参数
  getParams(search: string):Map<string, string> 
  // 返回 
  back( page_number?: number ) 
  // 前进
  forward() 
  // 前往某个页面
  go( pageNumber: number ) 
  // 刷新
  refresh() 
  // 跳转页面
  jumpTo( routerName: string, params?: any ) 
```