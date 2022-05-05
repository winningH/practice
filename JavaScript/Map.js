/**
 * get()
 * set()
 * has()
 * delete()
 * clear()
 * size
 */
const m1 = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3']
])

m1.get('key1') // val1
m1.size // 3
m1.has('key2') // true
m1.delete('key3')
m1.size // 2
m1.set('key4', 'val4').set('key5', 'val5')

const m = new Map()

const objKey = {},
  objVal = {},
  arrKey = [],
  arrVal = []

m.set(objKey, objVal)
m.set(arrKey, arrVal)

objKey.foo = 'foo'
objVal.bar = 'bar'
arrKey.push('foo')
arrVal.push('bar')

console.log(m.get(objKey)) // {bar: 'bar}
console.log(m.get(arrKey)) // ['bar']

// 与Object类型的一个主要差异是，Map实例会维护键值对的插入顺序，因此可以根据插入顺序进行迭代操作
console.log(m1.entries === m[Symbol.iterator]) // true
console.log(m1)

m1.forEach((val, key) => console.log(key, val))
console.log([...m1]) // [['key1', 'val1], [], [], []]

for (let key of m1.keys()) {
  console.log(key)
}

for (let value of m1.values()) {
  console.log(value)
}

// 键和值在迭代器遍历时可以修改，但映射内部的引用则无法修改
const m2 = new Map([['key1', 'val1']])
for (let key of m2.keys()) {
  key = 'newKey'
  console.log(key) // newKey
  console.log(m2.get('key1')) // val1

  m2.set(key, 'val111')
  console.log('key1', m2.get('key1')) // val1
  console.log(m2.get('newKey')) // val111
}
