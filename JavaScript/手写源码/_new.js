function _new(func, ...args) {
  // 第一步，创建一个新对象
  let obj = {}
  // 第二步骤 空对象的_proto_指向了构造函数的prototype成员对象
  obj.__proto__ = func.prototype
  // let obj = Object.create(func.prototype)

  // 第三步，使用apply调用构造器函数，属性和方法将添加到this 引用的对象中
  let result = func.apply(obj, args)

  // if (result && (type (result) === 'object' || type (result) === 'function')) {
  //   return result
  // }

  // return obj

  return result instanceof Object ? result : obj
}