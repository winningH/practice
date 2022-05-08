/**
 * 适配器模式的作⽤是解决两个软件实体间的接⼝不兼容的问题。
 * 优点：可以让任何两个没有关联的类一起运行，提供了类的服用
 * 缺点：额外对象的创建，非直接调用，存在一定的开销
 */

var googleMap = {
  show() {
    console.log('开始渲染谷歌地图')
  }
}

var baiduMap = {
  display() {
    console.log('开始渲染百度地图')
  }
}

var baiduMapAdapter = {
  show: function () {
    return baiduMap.display()
  }
}

function renderMap(map) {
  return map.show()
}

renderMap(googleMap)
renderMap(baiduMapAdapter)

/* ----------------------------------------- */

class Adapter {
  getName() {
    return '这是lighting充电头'
  }
}

class Target {
  constructor() {
    this.adapter = new Adapter()
  }
  getName() {
    return this.adapter.getName() + ' type-c充电器'
  }
}

let target = new Target()
console.log(target.getName())
