// weakMap 及时释放我们的内存 JS的垃圾回收机制
let obj = {
  name: 'zhangsan'
}
let wm = new WeakMap()
wm.set(obj, 1024)
console.log(wm)
console.log(wm.has(obj))

let btn = document.querySelector('#btn')
wm.set(btn, {
  count: 0
})
btn.addEventListener('click', () => {
  let v = wm.get(btn)
  v.count++
  console.log(wm.get(btn).count)
})

var Person = function () {
  var privateDate = new WeakMap()

  function Person(name) {
    console.log(name)
    privateDate.set(this, {
      name: name
    })
  }
  Person.prototype.getName = function () {
    return privateDate.get(this).name
  }
  return Person
}
Person('huang')

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var newArray = array.slice(1, 3)
console.log(array, newArray)
