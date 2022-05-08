/**
 * 单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问的。
 * 实现的方法为先判断实例存在与否。如果存在直接返回，如果不存在就创建了再返回
 * 这样就确保了一个类只有一个实例
 */

// 适用场景：弹窗，无论点击多少次，弹窗只应该被创建一次

function getSingle(fn) {
  let result
  return function () {
    result || (result = fn.apply(this, arguments))
  }
}

let createModal = function () {
  let modal = document.createElement('div')
  modal.innerHTML = 'modal'
  modal.style.display = 'none'
  document.body.appendChild(modal)
  return modal
}

let createSingleModal = getSingle(createModal)

document.getElementById('openModal').onclick = function () {
  let modal = createSingleModal()
  modal.style.display = 'block'
}

/* ---------------  自执行函数创建单例模式  ---------------------- */
const SingleObject = (function () {
  let instance = null
  return function (name) {
    if (!instance) {
      instance = this
      this.name = name
    }
    return instance
  }
})()

SingleObject.prototype.getName = function () {
  return this.name
}

const s1 = new SingleObject('张三')
const s2 = new SingleObject('李四')
console.log(s1.getName()) // 张三
console.log(s2.getName()) // 李四
console.log(s1 === s2) // true
