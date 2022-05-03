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

      // 依赖收集
      track(target, key)

      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value) {
      console.log('set', key, value)
      const ret = Reflect.set(target, key, value)
      trigger(target, key)
      return ret
    },
    deleteProperty(target, key) {
      console.log('del', key)
      trigger(target, key)
      return Reflect.deleteProperty(target, key)
    }
  })

  // 做缓存处理
  toProxy.set(obj, observed)
  toRaw.set(observed, obj)

  return observed
}

// 临时保存响应函数
const effectStack = []

function effect(fn) {
  const rxEffect = function () {
    try {
      // 入栈
      effectStack.push(rxEffect)
      // 执行fn
      return fn()
    } catch (error) {
    } finally {
      // 出栈
      effectStack.pop()
    }
  }

  // 立即调用一下
  rxEffect()

  return rxEffect
}

// {target: {key: [cb1, cb2, ...]}}
const targetMap = new WeakMap()
// 收集依赖
function track(target, key) {
  // 获取响应函数
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    // 获取target 对应的依赖表
    let depsMap = targetMap.get(target)

    if (!depsMap) {
      // 首次不存在，则创建
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }

    // 获取key对应的响应函数
    let deps = depsMap.get(key)
    if (!deps) {
      deps = new Set()
      depsMap.set(key, deps)
    }

    // 获取所有回调函数并执行
    if (!deps.has(effect)) {
      deps.add(effect)
    }
  }
}

// 触发执行
function trigger(target, key) {
  const depsMap = targetMap.get(target)

  if (depsMap) {
    // 获取集合
    const deps = depsMap.get(key)

    if (deps) {
      deps.forEach(effect => effect())
    }
  }
}

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

effect(() => {
  console.log('effect1', state.foo)
})

effect(() => {
  console.log('effect2', state.foo)
})

state.foo = 'foooooo'
// 避免重复代理
// reactive(state)
console.log(reactive(state) === state) // true

// state.foo
// state.foo = 'foo1'
// state.bar = 'bar'
// delete state.bar

state.a.b = 10
