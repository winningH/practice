// 引用传入Vue构造函数
let Vue

// VueRouter 类
class VueRouter {
  constructor(options) {
    // 保存选项备用
    this.$options = options

    // 处理routes
    this.routeMap = {}
    // this.$options.routes.forEach(route => route.path)

    // 创建current保存当前url
    // 为了让使用current的组件重新渲染
    // 应该是响应式的
    Vue.util.defineReactive(this, 'current', '/')

    // 监听hashchange事件
    window.addEventListener('hashchange', this.onHashChang.bind(this))
  }

  onHashChang() {
    // 修改当前url, hash的格式 #/xxx
    this.current = window.location.hash.slice(1)
  }
}

// 实现静态install方法
// 参数1：Vue构造函数 Vue.use()
VueRouter.install = function (_Vue) {
  Vue = _Vue

  // 1.挂载VueRouter实例
  // 为了能够拿到Vue根实例中的router实例
  // 可以利用全局混入
  Vue.mixix({
    beforeCreate() {
      // 上下文已经是组件实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })


  // 2.注册两个组件 router-view rorter-link
  Vue.component('router-view', {
    render(h) {
      const {routeMap, current} = this.$router
      const component = routeMap[current] ? routeMap[current].component : null
      return h(component)
    }
  })

  Vue.component('router-link', {
    props: {
      to: {
        type: 'String',
        default: ''
      }
    },
    render(h) {
      // 参数1 tag类型
      // 参数2 传入各种属性和事件
      return h('a', {attrs: {href: '#' + this.to}}, this.$slots.default)

      // 也可以用jsx
      // return <a href={'#' + this.to}>{this.$slots.default}</a>
    }
  })
}

export default VueRouter