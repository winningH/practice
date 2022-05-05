// weakMap 及时释放我们的内存 JS的垃圾回收机制
/**
 * 弱映射中的键只能是Object或继承自Object的类型，使用非对象设置键会抛出TypeError。值的类型没有限制
 */

const key1 = { id: 1 },
  key2 = { id: {} },
  key3 = { id: 3 }
// 使用嵌套数组初始化若映射
const wm1 = new WeakMap([
  [key1, 'val1'],
  [key2, 'val2'],
  [key3, 'val3']
])
console.log(wm1.get(key1)) // val1
console.log(wm1.set(key2.id, '222')) //WeakMap { <items unknown> }
console.log(wm1.get(key2.id)) // 222

let obj = {
  name: 'zhangsan'
}
let wm = new WeakMap()
wm.set(obj, 1024)
console.log(wm) // WeakMap { <items unknown> }
console.log(wm.has(obj))
console.log(wm.get(obj))

// 使用弱映射
// 1.私有变量
// 2.DOM节点元数据
