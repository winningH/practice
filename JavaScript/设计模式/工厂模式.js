/**
 * 提供创建对象的接口，把成员对象的创建工作转交给一个外部对象，好处在于消除对象之间的耦合
 *
 * 将new操作简单封装，遇到new的时候就应该考虑是否用工厂模式；
 */

class Product {
  constructor(name) {
    this.name = name
  }
  init() {
    console.log('init')
  }
  fun() {
    console.log('fun')
  }
}

class Factory {
  create(name) {
    return new Product(name)
  }
}

let factory = new Factory()
let p = factory.create('p1')
p.init()
p.fun()
