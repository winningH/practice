/**
 * add()
 * has()
 * delete()
 * clear()
 * .size
 */

const s = new Set()

const functionVal = function () {},
  symbolVal = Symbol(),
  objectVal = new Object()

s.add(functionVal).add(symbolVal).add(objectVal)

console.log(s.has(functionVal))
console.log(s.has(symbolVal))
console.log(s.has(objectVal))

console.log(s.has(function () {})) // false

// 去除字符串里面的重复字符
let str = [...new Set('ababbc')].join('')
console.log(str)

let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])

// 并集
let union = new Set([...a, ...b])
console.log(union)
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)))
console.log(intersect)
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)))
console.log(difference)
// Set {1}

// WeakSet 集合中的值只能是Object
// 没有size属性 和 clear()方法
