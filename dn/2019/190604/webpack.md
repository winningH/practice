## 单页应用vue react

## 模块化
  - 命名空间 `jquery (function(){})(window)`

```
 var obj = {}
 obj.type = obj.type || {}
 obj.type.method = function(){}
 obj.type.add = function() {}
 obj.type.sub = function() {}

 obj.addin = obj.addin || {}
 obj.addin.remove = function(){}
 obj.addin.append = function(){}
```

  - amd 和 cmd 规范 模块化
  requireJS 异步加载
  SeaJs 同步加载

  - commonJs 规范： node模块化机制，一个文件就是一个模块
      module.exports 导出     require导入

  - ES module (ES6的模块化)
  
    导出：export | export default
    导入：import ... form 'xx'

  - css 模块化
    - OOCSS (面向对象css)

    - AMCSS (属性模块) 避免使用过的的class

      vue scoped AMCSS(属性模块)


## webpack 4.32.2
> 需要再本地文件内下载webpack， 初始化package.json文件
>下载webpack和webpack-cli 3.x版本不需要下载webpack-c'li
> 4.x 需要下载

webpack 4.x 以下的使用 webpack app.js bundle.js
4.x 以上没用了，因为4.x增加了一个多入口命令打包`webpack app.js app1.js -o bundle.js`

如果不加入 --mode "development" 参数，则默认是生产环境，会自动压缩代码

  - 入口
    命令行中写入口，配置文件中写
  - 出口
  - module  js ts sass styles less 图片
  - plugins