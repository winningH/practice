// 检测数据是不是除了symbol外的原始数据
function isStatic(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    value === null
  )
}

// 检测数据是不是原始数据
function isPrimitive(value) {
  return isStatic(value) || typeof value === 'symbol'
}

// 获取数据类型
function getRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

// 判断是不是Object类型的数据
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

//运行环境是浏览器
let inBrowser = typeof window !== 'undefined'
//运行环境是微信
let inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
let weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
//浏览器 UA 判断
let UA = inBrowser && window.navigator.userAgent.toLowerCase()
let isIE = UA && /msie|trident/.test(UA)
let isIE9 = UA && UA.indexOf('msie 9.0') > 0
let isEdge = UA && UA.indexOf('edge/') > 0
let isAndroid = (UA && UA.indexOf('android') > 0) || weexPlatform === 'android'
let isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios'
let isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

// 柯里化函数
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2])
      }
    }
  }
}

function unCurry(fn) {
  return function (tar, ...arg) {
    return fn.apply(tar, arg)
  }
}

function _new(fn, ...args) {
  let obj = {}
  obj.__proto__ = fn.prototype

  let result = fn.apply(obj, args)

  return result instanceof Object ? result : obj
}

function debounce(fn, delay) {
  let time = null
  return function () {
    console.log(argustments)
    time && clearTimeout(time)
    time = setTimeout(() => {
      fn.apply(this, argustments)
    }, delay)
  }
}

// 节流函数
function throttle(fn, delay) {
  let oldTime = Date.now()
  let time = null

  return function () {
    let curTime = Date.now()
    if (curTime - oldTime >= delay) {
      time && clearTimeout(time)
      time = setTimeout(() => {
        fn.apply(this, argustments)
        oldTime = Date.now()
      }, delay)
    }
  }
}

function throttle1(fn, delay) {
  let timer = null
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = full
      }, delay)
    }
  }
}

// 正则切分千分位 （10000 => 10,000）
// ?=n 量词匹配任何其后紧接指定字符串 n 的字符串。
let num = '123456789.12345'
num.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')

Function.prototype.myCall = function (ctx) {
  let ctx = ctx || window
  // 设置fn为调用myCall的方法
  ctx.fn = this
  // 获取剩余参数
  let [_this, ...args] = arguments
  let result = ctx.fn(...args)
  delete ctx.fn
  return result
}

Function.prototype.myApply = function () {
  let ctx = arguments[0] || window
  ctx.fn = this
  if (!arguments[1]) {
    let result = ctx.fn()
    delete ctx.fn
    return result
  }
  let result = ctx.fn(...arguments[1])
  delete ctx.fn
  return result
}

Function.prototype.myBind = function (ctx) {
  ctx = ctx || window
  let self = this
  let args = [...arguments].splice(1)
  let fn = function () {}
  let _fn = function () {
    return self.apply(this instanceof _fn ? this : ctx, args)
  }
  fn.prototype = this.prototype
  _fn.prototype = new fn()
  return _fn
}
