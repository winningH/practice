const isObject = val => val !== null && typeof val === 'object'

// 缓存
const toProxy = new WeakMap() // {obj: observed}
const toRaw = new WeakMap() // {observed: obj}

function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }

  // 检测缓存
  if (toProxy.has(obj)) {
    // 代理过了，直接返回缓存结果
    return toProxy.get(obj)
  }

  if (toRaw.has(obj)) {
    // obj 已经是代理对象，直接返回
    return obj
  }

  // 代理
  const observed = new Proxy(obj, {
    get(target, key, receiver) {
      console.log('get', key)
      const res = Reflect.get(target, key)
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value) {
      console.log('set', key, value)
      return Reflect.set(target, key, value)
    },
    deleteProperty(target, key) {
      console.log('del', key)
      return Reflect, this.deleteProperty(target, key)
    }
  })

  // 做缓存处理
  toProxy.set(obj, observed)
  toRaw.set(observed, obj)

  return observed
}

// 依赖收集
/**
 * 实现三个函数
 * effect: 将回调函数保存起来备用，立即执行一次回调函数触发它里面一些响应数据的getter
 * track: getter中调用track，把前面存储的回调函数和当前target，key直接建立映射关系
 * trigger: setter中调用trigger，把target,key 对应的响应函数都执行一遍
 */

const state = reactive({
  foo: 'foo',
  a: {
    b: 1,
    c: [1, 2, 3]
  }
})

// 避免重复代理
// reactive(state)
console.log(reactive(state) === state) // true

// state.foo
// state.foo = 'foo1'
// state.bar = 'bar'
// delete state.bar

state.a.b = 10
