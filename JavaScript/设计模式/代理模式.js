/**
 *  代理模式: 为一个对象提供一个代用品或占位符
 *  常用的虚拟代理：某一个花销很大的操作，
 *    可以通过虚拟代理的方式延迟到这种需要它的时候才去创建
 *    如：使用虚拟代理实现图片懒加载
 *  html事件代理
 *  代理模式主要有三种：虚拟代理、缓存代理、保护代理
 */

/* --------------------  虚拟代理 ----------------------- */
// 创建一个本体对象
var myImage = (function () {
  // 创建标签
  var imgNode = document.createElement('img')
  // 添加到页面
  document.body.appendChild(imgNode)
  return {
    // 设置图片的src
    setSrc: function (src) {
      // 更改src
      imgNode.src = src
    }
  }
})()

// 创建代理对象
var proxyImage = (function () {
  // 创建一个新的img标签
  var img = new Image()
  // img 加载完成事件
  img.onload = function () {
    // 调用 myImage 替换src方法
    myImage.setSrc(this.src)
  }
  return {
    // 代理设置地址
    setSrc: function (src) {
      // 预加载 loading
      myImage.setSrc('./loading.gif')
      // 赋值正常图片地址
      img.src = src
    }
  }
})()

proxyImage.setSrc('http://xxx.jpg')

/* ------------------  保护代理 ------------------ */
function add() {
  let arg = [].slice.call(arguments)
  return arg.reduce((a, b) => a + b)
}

// 代理
var proxyAdd = (function () {
  var cache = []

  return function () {
    var arg = [].slice.call(arguments).join(',')

    // 如果有，则直接从缓存返回
    if (cache[arg]) {
      return cache[arg]
    } else {
      var ret = add.apply(this, arguments)
      return ret
    }
  }
})()
