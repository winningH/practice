/**
 * @Author: hwayn
 * @Date 2018-11-13
 */
(function (root) {
  var push = Array.prototype.push

  var nativeKeys = Object.keys
  var _ = function (obj) {
    console.log(this) // Window
    if (!(this instanceof _)) {
      return new _(obj)
    }
    this.wrap = obj;
  }

  // commonJs 规范
  typeof module != 'undefined' && module.exports ? module.exports = _ : root._ = _ ;

  // AMD 规范 requirejs 客户端模块加载器如何实现
  if (typeof define === "function" && define.amd) {
    define("underscore", [], function () {
      return {
        _ : _
      }
    })
  }

  /**
   * 数组去重
   * target     目标源
   * callback
   */
  _.uniq = function (target, callback) {
    var result = [];  // 去重之后的结果
    for (var i=0; i<target.length; i++) {
      var computed = callback ? callback(target[i]) : target[i]
      if (result.indexOf(computed) === -1) {
        result.push(computed)
      }
    }

    return result
  }

  _.functions = function (obj) {
    var result = []
    var key;
    for (key in obj) {
      result.push(key)
    }
    return result
  }

  // 遍历 数组 对象
  _.each = function (target, callback) {
    var i = 0, key;
    if (_.isArray(target)) {
      var length = target.length
      for (; i < length; i++) {
        callback.call(target, target[i], i)       // 值     下标
      }
    } else {
      for(key in target) {
        callback.call(target, key, target[key])   // 属性   值
      }
    }
  }

  // 开启链接式的调用
  _.chain = function () {
    var instance = _()
  }

  // 类型检测
  _.isArray = function (array) {
    return toString.call(array) === "[object Array]"
  }

  _.each(["Function", "String", "Object", "Number"], function (name) {
    _["is" + name] = function (obj) {
      return toString.call(obj) === "[object" + name +"]"
    }
  })

  /*
      obj   目标源对象
      iteratee  迭代器
      context   绑定的上下文对象
   */

  _.map = function (obj, iteratee, context) {
    // 生成迭代器  函数
    var iteratee = cb(iteratee, context)
    var keys = !_.isArray(obj) && _.keys(obj)   // 获取此对象所有属性的值，存储在一个数组
    var length = (keys || obj).lenght
    var result = Array(length)
    for (var index= 0;  index<length; index++) {
      // 属性的值  属性+下标
      var currentKey = keys ? keys[index] : index
      result[index] = iteratee(obj[currentKey], index, obj)
    }
    return result
  }

  _.keys = function (obj) {
    if(!_.isObject(obj)) {
      return []
    }
    if (nativeKeys) {
      return nativeKeys(obj)
    }
    // 遍历
    var keys = []
    for (var key in obj) {
      keys.push(key)
    }
    // IE9 不支持for in
  }

  var cb = function (iteratee, context) {
    if (iteratee == null) {
      return _.identity()
    }
  }

  _.identity = function (value) {
    return value
  }

  // mixin  遍历  数组
  _.mixin = function ( obj ) {
    _.each(_.functions( obj ), function ( name ) {
      var func = obj[name]
      // 数组去重
      _.prototype[name] = function () {
        var args = [this.wrap]  // [目标源， 回调函数]
        push.apply(args, arguments) // 数组合并
        return func.apply(this, args) // 处理好数据最终的结果
      }
    });
  }

  _.mixin(_)

})(this)