# Hixtrip FE Online

## 准备

- fork 此仓库
- 根据如下要求实现相关代码
- 完成要求
  - 提交`pull request`
  - 提供页面截图

## 需求

### 描述

1. 目前已经有`src/api/user.ts` 以及 `src/api/org.ts` 两个 API
2. 需要实现如下效果界面：

![](./docs/preview.jpg)

> 功能要求：
- 不限 ```React``` 或者 ```Vue```
- 需要拆分 `OrgTree` 以及 `UserTable` 两个组件
  - 两个组件自己维护相关的数据。
  - 体现两个组件的互相通信。
- 组织架构根据点上级节点进行查询子级节点实现异步加载。
- 用户 ```Table ``` 数据跟据点击 ```组织架构树形节点``` 以及 ```输入搜索关键字``` 查询。
  - 需要考虑防抖节流等功能点
- 风格不限
  - 示例图仅仅是效果展示，不需要完全符合。
  - 可以使用 ```UI Framework```, 如 ```ant-design```, ```element-ui```等
  - 如果不用```UI Framework```, 可以直接用原生的```<ul> <li>```, ```<table>``` 实现，不用实现相关的CSS样式, 可以加分。

### 实现

![](D:\workspace\fe-online\docs\页面截图.png)

## 其他简答题

### 如何将如下的`JSON`正确解析成 `Object`
```json
{
  "userId": 111323290434354540545
}
```
```JavaScript
// 解析方式
userId = JSON.stringify()
```



### 前端需要*稳定*每隔`1s`向服务端请求`API`, 请问如何实现？

```javascript
// 使用定时器
setInterval(() => {
  // 发起请求
}, 1000)
```



### 什么情况下，你会为你的项目引入状态管理库，比如`Redux`, `Pinia`, 可以简述一下起到了什么作用么？

1. 在项目中如果有多个页面需要进行共享状态(数据)时,就会引入状态管理库

2. 状态管理库的作用是统一存储数据

   1. 每个页面都能将自己页面中的数据存至状态库中,令其他页面(父子,兄弟,祖孙...)等页面也能访问到,实现跨页面通讯

   2. 对于需要传递的公共数据,可以做到各个页面只需访问状态管理库,使数据的的流向更加清晰明确

      

### 为什么`ESM`与`CJS`不能兼容？

因为`ESM`与`CJS`是两种标准,并且是对各自标准的实现

- `CommonJS`

```JavaScript
// out.js
// 1. 在 CJS 中 module.exports 一般导出的是一个对象
const obj = {
  name: "default"
}
module.export = obj

// main.js
// 2. 而 require 引入的则是导出对象的地址值
const obj = require("out.js")
// 3. 如果对 obj.name 修改, out.js 中的值也会被更改
obj.name = 'test'
```

- `ESModule`

```JavaScript
// out.js
// 1. ESModule 最终向外暴露的是模块实例,而需要导出的 obj 对象则是这模块实例中的一个属性
export const obj = {
  name: 'default'
}

// mian.js
// 2. 因此在引入时需要使用类似解构的形式去获取out.js 向外暴露的对象
import { obj } from "out.js"
// 3. 并且 ESModule 是不允许去修改暴露出的对象
obj.name = "test" // 此行为会被浏览器禁止
```





