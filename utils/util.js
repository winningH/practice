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
